import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tomato')) {
      return "For tomatoes, the best planting time depends on your location. Generally, plant after the last frost when soil temperature reaches 60°F (15°C). Space plants 18-24 inches apart, provide support structures, and ensure 6-8 hours of sunlight daily. Water consistently but avoid wetting leaves to prevent disease.";
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
      return "Common signs of crop diseases include yellowing leaves, spots, wilting, and stunted growth. For pest management, I recommend integrated pest management (IPM): monitor regularly, use beneficial insects, rotate crops, and apply targeted treatments only when necessary. Would you like specific advice for a particular crop or pest?";
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('organic')) {
      return "Organic fertilizers improve soil health long-term. Compost provides balanced nutrients, bone meal adds phosphorus for root development, and fish emulsion gives quick nitrogen. Apply in early spring and side-dress during growing season. Test your soil first to determine specific nutrient needs.";
    } else if (lowerMessage.includes('subsidy') || lowerMessage.includes('government')) {
      return "Agricultural subsidies vary by location and farm type. Common programs include crop insurance, conservation payments, and beginning farmer grants. Check with your local USDA office or agricultural extension service. I can help you understand eligibility requirements if you provide more details about your farm.";
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
      return "Weather monitoring is crucial for farming success. I recommend tracking temperature, rainfall, humidity, and wind patterns. Use weather apps with agricultural features, consider installing weather stations, and plan activities around forecast windows. Climate change requires adapting varieties and practices.";
    } else {
      return "That's a great farming question! Based on current agricultural best practices, I'd recommend consulting local extension services and conducting soil tests for your specific situation. Could you provide more details about your crop type, location, or specific concerns? This will help me give you more targeted advice.";
    }
  };

  const handleSendMessage = () => {
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

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue.trim()),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
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
                    onKeyPress={handleKeyPress}
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