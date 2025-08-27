import React from 'react';
import { Bot, Globe, BarChart3, Users, Smartphone, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Recommendations',
      description: 'Our algorithm analyzes your learning patterns to suggest the perfect courses and materials.',
      color: 'from-primary to-primary-hover',
    },
    {
      icon: Globe,
      title: 'Virtual Reality Classrooms',
      description: 'Immerse yourself in learning with our VR-enabled virtual classrooms.',
      color: 'from-secondary to-secondary-hover',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Progress Analytics',
      description: 'Track your progress with detailed analytics and personalized insights.',
      color: 'from-accent to-warning',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Work on projects with peers in our interactive digital workspace.',
      color: 'from-primary to-accent',
    },
    {
      icon: Smartphone,
      title: 'Mobile Learning',
      description: 'Access your courses anywhere with our dedicated mobile app.',
      color: 'from-secondary to-primary',
    },
    {
      icon: Award,
      title: 'Micro-Credentials',
      description: 'Earn digital badges and certificates recognized by industry leaders.',
      color: 'from-accent to-secondary',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-surface-elevated">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Next-Generation{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We've reimagined online education with cutting-edge technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium">
            <Bot className="w-5 h-5 mr-2" />
            Powered by Advanced AI Technology
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;