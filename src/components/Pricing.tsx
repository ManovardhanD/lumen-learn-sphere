import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$19',
      period: 'month',
      description: 'Perfect for beginners starting their learning journey',
      features: [
        'Access to 100+ courses',
        'Learn at your own pace',
        'Community support',
        'Basic progress tracking',
        'Mobile app access',
        'Certificate of completion',
      ],
      cta: { label: 'Get Started', variant: 'outline' as const },
      icon: Star,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'month',
      description: 'Most popular plan for serious learners',
      features: [
        'Unlimited course access',
        'AI-powered recommendations',
        'Certificates of completion',
        'Priority support',
        '1-on-1 instructor sessions (2/month)',
        'Advanced analytics',
        'Download for offline learning',
        'VR classroom access',
      ],
      cta: { label: 'Start Free Trial', variant: 'cta' as const },
      icon: Zap,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for teams and organizations',
      features: [
        'Custom learning paths',
        'Team progress analytics',
        'Dedicated success manager',
        'Single sign-on (SSO)',
        'Custom branding',
        'API access',
        'Advanced reporting',
        'White-label solution',
      ],
      cta: { label: 'Contact Sales', variant: 'outline' as const },
      icon: Crown,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Flexible{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Plans
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Choose the plan that works best for your learning journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-large scale-105'
                  : 'bg-card border border-border shadow-soft hover:shadow-medium'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-sm font-medium shadow-glow">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 shadow-medium ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-primary to-accent' 
                    : 'bg-muted'
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {plan.description}
                </p>

                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                      plan.popular 
                        ? 'bg-primary text-white' 
                        : 'bg-success/20 text-success'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                variant={plan.cta.variant} 
                className="w-full"
                size="lg"
              >
                {plan.cta.label}
              </Button>

              {/* Free Trial Notice */}
              {plan.popular && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  14-day free trial • Cancel anytime
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 bg-muted/50 rounded-xl">
            <div className="text-2xl">🎓</div>
            <div>
              <div className="font-semibold text-foreground">
                30-Day Money-Back Guarantee
              </div>
              <div className="text-muted-foreground text-sm">
                Not satisfied? Get a full refund within 30 days.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;