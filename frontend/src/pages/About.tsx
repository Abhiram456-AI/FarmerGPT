import { Target, Users, Zap, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Precision Agriculture',
      description: 'We believe in data-driven farming decisions that maximize efficiency and minimize waste.'
    },
    {
      icon: Users,
      title: 'Farmer-Centric',
      description: 'Our solutions are designed by farmers, for farmers, understanding real-world challenges.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving AI technology to stay ahead of agricultural challenges.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Promoting sustainable farming practices for a healthier planet and future generations.'
    }
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Making Farming Smarter with{' '}
              <span className="text-primary">AI Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize agriculture by providing farmers with intelligent, 
              AI-powered advisory services that increase productivity, reduce costs, and promote sustainable farming.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 glow-hover max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Agriculture faces unprecedented challenges: climate change, resource scarcity, 
                growing populations, and evolving market demands. Traditional farming methods, 
                while time-tested, often lack the precision needed for modern challenges.
              </p>
              <p>
                FarmAI bridges this gap by combining decades of agricultural expertise with 
                cutting-edge artificial intelligence. We provide farmers with real-time insights, 
                predictive analytics, and personalized recommendations that transform how 
                decisions are made on the farm.
              </p>
              <p>
                Our vision is a world where every farmer, regardless of size or location, 
                has access to the same level of intelligent advisory services that were 
                once available only to large agricultural corporations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our mission to transform agriculture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="glass-card p-6 text-center glow-hover group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12 glow-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built by Agricultural Experts
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our team combines decades of farming experience with world-class AI expertise. 
              We understand agriculture because we've lived it, and we're passionate about 
              using technology to solve real problems that farmers face every day.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="px-4 py-2 bg-primary/10 rounded-full">Agricultural Science</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full">Machine Learning</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full">Climate Research</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full">Sustainable Farming</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full">Data Analytics</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;