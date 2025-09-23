import { AlertTriangle, Cloud, Bug, DollarSign, TrendingDown, Clock } from 'lucide-react';

const Problems = () => {
  const challenges = [
    {
      icon: Bug,
      title: 'Pest & Disease Management',
      description: 'Identifying and treating crop diseases and pest infestations often comes too late, resulting in significant yield loss.',
      impact: 'Up to 40% crop loss',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Cloud,
      title: 'Weather Uncertainty',
      description: 'Unpredictable weather patterns and climate change make planning and decision-making increasingly difficult.',
      impact: 'Billions in weather damage annually',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: DollarSign,
      title: 'Complex Subsidies',
      description: 'Navigating government subsidies and agricultural programs is time-consuming and often confusing.',
      impact: 'Millions in unclaimed benefits',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: TrendingDown,
      title: 'Declining Profitability',
      description: 'Rising input costs and volatile market prices squeeze farmer margins, threatening farm sustainability.',
      impact: 'Average 2-3% profit margins',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Farmers spend countless hours researching solutions instead of focusing on actual farming activities.',
      impact: '30% of time on non-farming tasks',
      color: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      icon: AlertTriangle,
      title: 'Knowledge Gaps',
      description: 'Access to expert agricultural knowledge is limited, especially for small and medium-scale farmers.',
      impact: 'Limited expert access',
      color: 'from-indigo-500/20 to-violet-500/20'
    }
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Challenges Facing{' '}
            <span className="text-primary">Modern Farmers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Agriculture today is more complex than ever. Farmers face numerous challenges that 
            traditional methods struggle to address effectively.
          </p>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <div 
                key={index}
                className="glass-card p-8 glow-hover group cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-br ${challenge.color} group-hover:scale-110 transition-transform`}>
                  <challenge.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {challenge.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {challenge.description}
                </p>
                
                <div className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg text-sm font-medium">
                  Impact: {challenge.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 text-center glow-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              The Real Cost of These Challenges
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">821M</div>
                <div className="text-muted-foreground">People face food insecurity globally</div>
              </div>
              
              <div className="glass p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30%</div>
                <div className="text-muted-foreground">Of food produced is lost or wasted</div>
              </div>
              
              <div className="glass p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">70%</div>
                <div className="text-muted-foreground">More food needed by 2050</div>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mt-8 max-w-3xl mx-auto leading-relaxed">
              These challenges aren't just statistics – they represent real farmers struggling to 
              make informed decisions with limited resources and expertise. That's why we built FarmAI.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12 glow-strong">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              There's a Better Way
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              These problems have solutions. With AI-powered insights and expert knowledge at your fingertips, 
              you can make better decisions faster and more confidently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/solutions" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-lg glow-hover transition-all"
              >
                Discover Our Solutions
              </a>
              <a 
                href="/chatbot" 
                className="inline-flex items-center justify-center px-8 py-4 border border-primary/30 hover:border-primary text-primary hover:bg-primary/10 font-semibold text-lg rounded-lg glow-hover transition-all"
              >
                Try FarmAI Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Problems;