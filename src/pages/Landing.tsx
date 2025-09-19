import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, Target, TrendingUp, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">TinySteps</div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center bg-gradient-background">
        <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/20 text-primary bg-primary-soft">
          Designed for ADHD minds
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Focus made
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">simple</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Break overwhelming tasks into tiny steps. Stay focused with AI-powered guidance. 
          Built specifically for minds that work differently.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-focus"
            onClick={() => navigate('/auth')}
          >
            <Play className="mr-2 text-current" />
            Start Focusing Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 border-primary/20 hover:bg-primary-soft text-foreground"
            onClick={() => navigate('/app')}
          >
            Try Demo
            <ArrowRight className="ml-2 text-current" />
          </Button>
        </div>

        {/* Social Proof */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Trusted by people with ADHD worldwide</p>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                ADHD minds deserve better tools
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <p>Traditional productivity apps overwhelm with too many features</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <p>Complex interfaces create decision fatigue</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <p>No consideration for ADHD challenges</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">
                TinySteps is different
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>One clear action at a time</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>AI breaks down overwhelming tasks</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>Clean, distraction-free interface</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>Built by someone with ADHD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple features that work</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need, nothing you don't
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center border-2 hover:border-primary/30 transition-all shadow-soft hover:shadow-focus">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Task Breakdown</h3>
              <p className="text-muted-foreground text-sm">
                Turn overwhelming projects into tiny, manageable steps
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-secondary/30 transition-all shadow-soft hover:shadow-focus">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gentle Timers</h3>
              <p className="text-muted-foreground text-sm">
                Focus sessions that adapt to your energy and attention
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-accent/30 transition-all shadow-soft hover:shadow-focus">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Single Focus</h3>
              <p className="text-muted-foreground text-sm">
                One task, one timer, no distractions or overwhelming choices
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-warning/30 transition-all shadow-soft hover:shadow-focus">
              <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-warning-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Celebrate small wins and build sustainable habits
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-focus text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to take your first tiny step?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of people with ADHD who are getting things done, one small step at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90 shadow-success"
              onClick={() => navigate('/auth')}
            >
              Start Free Today
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate('/app')}
            >
              Try Demo First
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60 mt-6">
            Free forever • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">TinySteps</div>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ for ADHD minds
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;