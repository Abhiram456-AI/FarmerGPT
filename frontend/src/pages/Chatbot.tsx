import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, Leaf, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { askAI } from '../services/api';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Farming Advisor. I can help you with crop management, pest control, weather planning, subsidies, and more. What farming question can I help you with today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "What's the best time to plant tomatoes?",
    "How do I identify crop diseases?",
    "Tell me about organic fertilizers",
    "What subsidies are available for small farmers?"
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let lang = 'en-US'; // default English

      // Basic detection using Unicode ranges
      if (/[\u0C00-\u0C7F]/.test(text)) lang = 'te-IN'; // Telugu
      else if (/[\u0C80-\u0CFF]/.test(text)) lang = 'kn-IN'; // Kannada
      else if (/[\u0900-\u097F]/.test(text)) lang = 'hi-IN'; // Hindi

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await askAI(userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Sorry, there was an error fetching the response.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="page-transition min-h-screen bg-background/50">
      {/* Header */}
      <div className="glass-nav border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10 glow-primary">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Farming Advisor</h1>
              <p className="text-muted-foreground">Your intelligent agricultural assistant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Interface */}
          <div className="lg:col-span-2 glass-card flex flex-col glow-hover">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} message-slide-in`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary/10' : 'bg-secondary/50'}`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-primary" />
                      ) : (
                        <Bot className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary/50 text-foreground border border-border/50'
                    }`}>
                      <div className="text-sm leading-relaxed prose dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      {message.type === 'bot' && (
                        <Button
                          onClick={() => speakText(message.content)}
                          className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground glow-hover"
                          type="button"
                        >
                          Listen to FarmAI
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start message-slide-in">
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    <div className="p-2 rounded-full bg-secondary/50">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 text-foreground border border-border/50">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border/50">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about farming..."
                    className="pr-12 glass border-primary/30 focus:border-primary glow-hover"
                    disabled={isTyping}
                  />
                  <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/50" />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="glow-hover bg-primary hover:bg-primary/90 text-primary-foreground"
                  type="button"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Features */}
            <div className="glass-card p-6 glow-hover">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Sparkles className="h-5 w-5 text-primary mr-2" />
                AI Capabilities
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Crop management advice</li>
                <li>• Pest & disease identification</li>
                <li>• Weather planning guidance</li>
                <li>• Subsidy & grant information</li>
                <li>• Soil health recommendations</li>
                <li>• Market trend insights</li>
              </ul>
            </div>

            {/* Suggested Questions */}
            <div className="glass-card p-6 glow-hover">
              <h3 className="font-semibold text-foreground mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left p-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all glow-hover"
                    disabled={isTyping}
                    type="button"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;