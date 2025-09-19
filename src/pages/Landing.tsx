import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock, Target, TrendingUp, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">TinySteps</div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')} className="bg-foreground text-background hover:bg-foreground/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge variant="outline" className="mb-6 px-4 py-2">
          Designed for ADHD minds
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Focus made
          <br />
          <span className="text-muted-foreground">simple</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Break overwhelming tasks into tiny steps. Stay focused with AI-powered guidance. 
          Built specifically for minds that work differently.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-foreground text-background hover:bg-foreground/90"
            onClick={() => navigate('/auth')}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Focusing Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/app')}
          >
            Try Demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Social Proof */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Trusted by people with ADHD worldwide</p>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-muted/30">
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
            <Card className="p-8 text-center border-2 hover:border-foreground/20 transition-colors">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Task Breakdown</h3>
              <p className="text-muted-foreground text-sm">
                Turn overwhelming projects into tiny, manageable steps
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-foreground/20 transition-colors">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gentle Timers</h3>
              <p className="text-muted-foreground text-sm">
                Focus sessions that adapt to your energy and attention
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-foreground/20 transition-colors">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Single Focus</h3>
              <p className="text-muted-foreground text-sm">
                One task, one timer, no distractions or overwhelming choices
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-foreground/20 transition-colors">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-background" />
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
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to take your first tiny step?
          </h2>
          <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
            Join thousands of people with ADHD who are getting things done, one small step at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90"
              onClick={() => navigate('/auth')}
            >
              Start Free Today
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-background/20 text-background hover:bg-background/10"
              onClick={() => navigate('/app')}
            >
              Try Demo First
            </Button>
          </div>

          <p className="text-sm text-background/60 mt-6">
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