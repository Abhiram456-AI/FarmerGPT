import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-farming.jpg';

const Home = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations based on real-time data and weather patterns.'
    },
    {
      icon: TrendingUp,
      title: 'Crop Optimization',
      description: 'Maximize your yield with personalized crop management strategies.'
    },
    {
      icon: Shield,
      title: 'Risk Prevention',
      description: 'Early detection of pests, diseases, and environmental threats.'
    }
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern AI-powered farming landscape with smart agriculture technology"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto glow-primary">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Smart Farming with{' '}
              <span className="text-primary animate-pulse-glow">AI Intelligence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your agricultural practices with our advanced AI advisory system. 
              Get real-time insights on crops, weather, pests, and subsidies to maximize your harvest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="glow-hover bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4"
              >
                <Link to="/chatbot" className="flex items-center gap-2">
                  Start Advisory Chat
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="glow-hover border-primary/30 hover:border-primary text-primary hover:bg-primary/10 font-semibold text-lg px-8 py-4"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose FarmAI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of farming with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-8 text-center glow-hover group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12 glow-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using AI to increase their productivity and profitability.
            </p>
            <Button 
              asChild
              size="lg"
              className="glow-strong bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4"
            >
              <Link to="/chatbot" className="flex items-center gap-2">
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;