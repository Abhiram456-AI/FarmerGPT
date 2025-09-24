import { Brain, MessageSquare, BarChart3, Bell, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Solutions = () => {
  const solutions = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your farming data, weather patterns, and crop conditions to provide intelligent recommendations.',
      features: ['Real-time crop monitoring', 'Predictive disease detection', 'Yield optimization'],
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: MessageSquare,
      title: 'Expert Chatbot Advisory',
      description: 'Get instant answers to your farming questions through our intelligent chatbot trained on decades of agricultural expertise.',
      features: ['24/7 availability', 'Multilingual support', 'Context-aware responses'],
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Transform complex agricultural data into actionable insights with beautiful visualizations and clear recommendations.',
      features: ['Custom dashboards', 'Performance tracking', 'Trend analysis'],
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Receive timely notifications about critical farming events, weather changes, and optimal action windows.',
      features: ['Weather alerts', 'Pest warnings', 'Market updates'],
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with other farmers, share experiences, and learn from collective agricultural wisdom.',
      features: ['Farmer forums', 'Success stories', 'Best practices'],
      color: 'from-indigo-500/20 to-violet-500/20'
    },
    {
      icon: Zap,
      title: 'Automation Integration',
      description: 'Seamlessly integrate with farm equipment and IoT sensors for automated monitoring and control.',
      features: ['Equipment connectivity', 'Sensor integration', 'Automated actions'],
      color: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  const workflow = [
    {
      step: '01',
      title: 'Ask Your Question',
      description: 'Type your farming question in natural language - about crops, pests, weather, or subsidies.'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI processes your query against vast agricultural databases and current conditions.'
    },
    {
      step: '03',
      title: 'Get Expert Advice',
      description: 'Receive personalized recommendations with explanations and actionable next steps.'
    },
    {
      step: '04',
      title: 'Take Action',
      description: 'Implement the advice and track results through our monitoring system.'
    }
  ];

  return (
      <div className="page-transition overflow-y-auto scroll-smooth">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AI-Powered Solutions for{' '}
            <span className="text-primary">Modern Farming</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of agriculture with our comprehensive AI advisory system 
            designed to solve every farming challenge.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Agricultural Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our integrated platform provides everything you need for smarter farming decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index}
                className="glass-card p-8 glow-hover group cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-br ${solution.color} group-hover:scale-110 transition-transform`}>
                  <solution.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {solution.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {solution.description}
                </p>
                
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Our AI Advisory Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and intelligent - get expert farming advice in four easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <div key={index} className="glass-card p-6 text-center glow-hover group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12 glow-strong">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              See FarmAI in Action
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Experience the power of AI-driven farming advice. Our chatbot is ready to answer 
              any question about crops, pests, weather, subsidies, and more.
            </p>
            
            <div className="bg-background/50 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <div className="text-sm text-muted-foreground mb-2">Example questions you can ask:</div>
              <div className="space-y-2 text-sm">
                <div className="bg-primary/10 rounded-lg p-3">
                  "What's the best time to plant tomatoes in my region?"
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  "How do I identify and treat late blight on potatoes?"
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  "What government subsidies are available for organic farming?"
                </div>
              </div>
            </div>
            
            <Button 
              asChild
              size="lg"
              className="glow-strong bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4"
            >
              <Link to="/chatbot">Try FarmerGPT Chatbot</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Traditional vs AI-Powered Farming
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-destructive mb-6">Traditional Approach</h3>
              <ul className="space-y-4">
                {[
                  'Manual research and guesswork',
                  'Reactive pest management',
                  'Limited access to expertise',
                  'Time-consuming information gathering',
                  'Generic recommendations'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass-card p-8 glow-hover">
              <h3 className="text-xl font-semibold text-primary mb-6">FarmAI Approach</h3>
              <ul className="space-y-4">
                {[
                  'AI-powered instant insights',
                  'Predictive threat detection',
                  '24/7 expert knowledge access',
                  'Real-time data processing',
                  'Personalized recommendations'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;