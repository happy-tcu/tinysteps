import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Timer, Focus, Sparkles, Rocket, ChevronRight, Shield, CheckCircle2, Skull, Zap as Lightning, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import logo from '@/assets/logo.png';
import intrusiveThoughts from '@/assets/intrusive-thoughts.svg';
import tcuLogo from '@/assets/tcu-logo.png';
import techcorpLogo from '@/assets/techcorp-logo.png';
import adobeLogo from '@/assets/adobe-logo.png';
import medicalCollegeLogo from '@/assets/medical-college-logo.png';
import innolabsLogo from '@/assets/innolabs-logo.png';
import openaiLogo from '@/assets/openai-logo.png';
import abstractBg from '@/assets/abstract-bg.png';
const Landing = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TinySteps" className="h-8 w-8" />
            <span className="text-2xl font-bold text-foreground">TinySteps</span>
          </div>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate('/auth?mode=signin')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth?mode=signup')} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center bg-gradient-background">
        <Badge variant="outline" className="mb-6 px-6 py-2 border-foreground/50 dark:border-foreground/30 text-foreground bg-foreground/5 dark:bg-foreground/10 hover:bg-foreground/10 dark:hover:bg-foreground/20 transition-colors">
          Finally, productivity that works
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Stop drowning in
          <br />
          <span className="text-blue-600 relative">
            endless tasks
            <span className="absolute inset-0 flex flex-col justify-center">
              <span className="h-0.5 bg-red-500 transform -rotate-12"></span>
              <span className="h-0.5 bg-red-500 transform rotate-12"></span>
            </span>
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Turn overwhelming projects into tiny, manageable steps. Stay focused with AI-powered guidance. 
          Built for people who struggle with traditional productivity apps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="text-lg px-8 py-6 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-focus" onClick={() => navigate('/auth')}>
            <BrainCircuit className="mr-2 text-current" />
            Start Focusing Now
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-foreground/50 hover:bg-accent text-foreground" onClick={() => document.getElementById('features')?.scrollIntoView({
          behavior: 'smooth'
        })}>
            Learn More
            <ChevronRight className="ml-2 text-current" />
          </Button>
        </div>

        {/* ADHD Illustration */}
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full">
            <img src={intrusiveThoughts} alt="ADHD brain with intrusive thoughts illustration" className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center space-y-12">
          <p className="text-base text-muted-foreground font-medium">Trusted by productive people worldwide</p>
          
          {/* Logo Slider */}
          <div className="w-full overflow-hidden bg-muted/20 py-8 rounded-lg">
            <div className="flex items-center gap-16 animate-[scroll_40s_linear_infinite] hover:animate-none" style={{
            width: 'calc(200% + 4rem)'
          }}>
              {/* First set of logos */}
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={tcuLogo} alt="TCU" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={techcorpLogo} alt="TechCorp" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={adobeLogo} alt="Adobe" className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={medicalCollegeLogo} alt="Medical College" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={innolabsLogo} alt="InnoLabs" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={openaiLogo} alt="OpenAI" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={tcuLogo} alt="TCU" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={techcorpLogo} alt="TechCorp" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={adobeLogo} alt="Adobe" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={medicalCollegeLogo} alt="Medical College" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={innolabsLogo} alt="InnoLabs" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
              
              <div className="flex items-center justify-center min-w-[120px]">
                <img src={openaiLogo} alt="OpenAI" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Traditional productivity apps fail you
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Lightning className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p>Overwhelming you with endless features and complexity</p>
                </div>
                <div className="flex items-start gap-3">
                  <BrainCircuit className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                  <p>Making simple tasks feel impossible to start</p>
                </div>
                <div className="flex items-start gap-3">
                  <Skull className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p>Ignoring how real brains actually work</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">
                TinySteps is different
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>One clear action at a time</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>AI breaks down any project into bite-sized actions</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>Beautiful, distraction-free interface</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                  <p>Built by someone who gets overwhelmed too</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Features that actually help</h2>
            <p className="text-xl text-muted-foreground">
              Powerful but simple. Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center border-2 hover:border-primary/30 transition-all shadow-soft hover:shadow-focus bg-card">
              <div className="w-12 h-12 bg-primary dark:bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-foreground dark:text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">AI Task Breakdown</h3>
              <p className="text-muted-foreground text-sm">
                Turn overwhelming projects into tiny, manageable steps
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-secondary/30 transition-all shadow-soft hover:shadow-focus bg-card">
              <div className="w-12 h-12 bg-secondary dark:bg-secondary/40 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Timer className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Gentle Timers</h3>
              <p className="text-muted-foreground text-sm">
                Focus sessions that adapt to your energy and attention
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-accent/30 transition-all shadow-soft hover:shadow-focus bg-card">
              <div className="w-12 h-12 bg-accent dark:bg-accent/40 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Focus className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Single Focus</h3>
              <p className="text-muted-foreground text-sm">
                One task, one timer, no distractions or overwhelming choices
              </p>
            </Card>

            <Card className="p-8 text-center border-2 hover:border-warning/30 transition-all shadow-soft hover:shadow-focus bg-card">
              <div className="w-12 h-12 bg-foreground dark:bg-foreground/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-background dark:text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">Progress Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Celebrate small wins and build sustainable habits
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Ready to take your first tiny step?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people with ADHD who are getting things done, one small step at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-success" onClick={() => navigate('/auth')}>
              Start Free Today
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-background text-foreground border-foreground/50 hover:bg-accent" onClick={() => document.getElementById('features')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              View Features
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Free forever • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="TinySteps" className="h-8 w-8" />
                <span className="text-2xl font-bold">TinySteps</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                The productivity app that actually works. Break down any project into tiny, manageable steps and get things done without the overwhelm.
              </p>
            </div>
            
            
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 TinySteps. All rights reserved.</div>
            <div className="text-sm text-muted-foreground">Made with love for productive minds</div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;