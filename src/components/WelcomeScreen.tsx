import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Target, Trophy, Clock, Settings, LogOut, BrainCircuit, Check, Star, Users, Zap, ArrowRight, ChevronRight, X, Heart, Timer, Award, BarChart3, Brain, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import adhdOverwhelm from "@/assets/adhd-overwhelm.png";
import adhdFocused from "@/assets/adhd-focused.png";
import { useAppData } from "@/hooks/useAppData";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
interface WelcomeScreenProps {
  onStartFocus: () => void;
  onViewProgress: () => void;
  onOpenSettings: () => void;
  hasCompletedOnboarding?: boolean;
  onCompleteOnboarding?: () => void;
}
export const WelcomeScreen = ({
  onStartFocus,
  onViewProgress,
  onOpenSettings,
  hasCompletedOnboarding = false,
  onCompleteOnboarding
}: WelcomeScreenProps) => {
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);
  const [currentStep, setCurrentStep] = useState(0);
  const [aiSettings] = useLocalStorage('aiSettings', {
    openaiApiKey: '',
    enableAiSuggestions: true,
    enableAiBreakdown: true,
    enableAiCoaching: true
  });
  const {
    appData,
    getTodaysStats
  } = useAppData();
  const {
    signOut,
    isAuthenticated
  } = useAuth();
  const todaysStats = getTodaysStats();
  const onboardingSteps = [{
    title: "Welcome to TinySteps! 👋",
    description: "Perfect for ADHD minds - break overwhelming tasks into manageable tiny steps.",
    action: "Get Started"
  }, {
    title: "AI-Powered Task Breakdown 🧠",
    description: "Our AI understands ADHD challenges and creates bite-sized steps that actually work.",
    action: "Sounds Great!"
  }, {
    title: "Track Your Progress 📊",
    description: "Build momentum with streak tracking, points, and achievements designed for dopamine hits.",
    action: "Let's Focus!"
  }];
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    onCompleteOnboarding?.();
  };
  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  // Social proof data
  const socialProof = {
    userCount: "2,847",
    tasksCompleted: "47,293",
    averageImprovement: "73%"
  };
  const features = [{
    icon: <Brain className="w-4 h-4" />,
    title: "AI Task Breakdown",
    description: "Smart step-by-step guidance",
    highlight: true
  }, {
    icon: <Sparkles className="w-4 h-4" />,
    title: "AI Suggestions",
    description: "Personalized task recommendations",
    highlight: true
  }, {
    icon: <Timer className="w-4 h-4" />,
    title: "Focus Timer",
    description: "Pomodoro technique optimized",
    highlight: false
  }, {
    icon: <Award className="w-4 h-4" />,
    title: "Progress Tracking",
    description: "Build streaks and earn points",
    highlight: false
  }];
  return <div className="min-h-screen bg-background">
      {/* Onboarding Modal */}
      {showOnboarding && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-md mx-auto animate-scale-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">
                {onboardingSteps[currentStep].title}
              </CardTitle>
              <CardDescription className="text-base">
                {onboardingSteps[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress indicator */}
              <div className="flex gap-2 justify-center">
                {onboardingSteps.map((_, index) => <div key={index} className={cn("w-2 h-2 rounded-full transition-colors", index <= currentStep ? "bg-primary" : "bg-muted")} />)}
              </div>
              
              <div className="flex gap-3">
                {currentStep > 0 && <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)} className="flex-1">
                    Back
                  </Button>}
                <Button onClick={nextStep} className="flex-1">
                  {onboardingSteps[currentStep].action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <button onClick={handleCompleteOnboarding} className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center">
                Skip for now
              </button>
            </CardContent>
          </Card>
        </div>}

      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      {/* Clean Header */}
      <header role="banner" className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={onStartFocus} className="flex items-center gap-3 hover:opacity-80 transition-opacity" aria-label="Go to home - Start focus session">
            <img src={logo} alt="TinySteps - ADHD Focus Assistant" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">shoTinySteps</span>
            <Badge variant="secondary" className="text-xs">AI-Powered</Badge>
            {!aiSettings.openaiApiKey && <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                Setup Required
              </Badge>}
          </button>
          <nav role="navigation" aria-label="Main navigation" className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onOpenSettings} className="gap-2" aria-label="Open settings">
              <Settings className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Settings</span>
            </Button>
            
            {isAuthenticated && <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground hover:text-destructive" aria-label="Sign out of account">
                <LogOut className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only">Sign Out</span>
              </Button>}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-10 flex flex-col justify-center">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Focus made Simple
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Break down overwhelming tasks into tiny, manageable steps. AI-powered productivity for minds that think differently.
              </p>
              
              {/* AI Status Alert */}
              {!aiSettings.openaiApiKey && <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-orange-900 dark:text-orange-100">AI Features Available</h3>
                      <p className="text-sm text-orange-700 dark:text-orange-200 mt-1">
                        Add your OpenAI API key in Settings to unlock AI task breakdown, suggestions, and coaching.
                      </p>
                      <Button variant="outline" size="sm" onClick={onOpenSettings} className="mt-2 border-orange-300 text-orange-700 hover:bg-orange-100">
                        Setup AI Features
                      </Button>
                    </div>
                  </div>
                </div>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onStartFocus} size="lg" className="h-14 px-8 text-lg bg-foreground text-background hover:bg-foreground/90 hover-scale transition-all duration-200" aria-describedby="start-focus-description">
                <BrainCircuit className="w-5 h-5 mr-2" />
                Start Focus Session
              </Button>
              <p id="start-focus-description" className="sr-only">
                Begin a focused work session with task breakdown and timer
              </p>
              
              <Button variant="outline" size="lg" onClick={onViewProgress} className="h-14 px-8 hover-scale transition-all duration-200" aria-describedby="view-progress-description">
                <Trophy className="w-4 h-4 mr-2" />
                View Progress
              </Button>
              <p id="view-progress-description" className="sr-only">
                See your completed tasks, streaks, and achievements
              </p>
            </div>

            {/* Stats Row */}
            {appData.userStats.totalTasks > 0 && <section aria-labelledby="daily-stats" className="flex gap-8 py-6 border-y border-border/50">
                <h2 id="daily-stats" className="sr-only">Daily Statistics</h2>
                <div>
                  <div className="text-3xl font-bold text-foreground">{todaysStats.sessionsToday}</div>
                  <div className="text-sm text-muted-foreground">Sessions Today</div>
                </div>
                {appData.userStats.currentStreak > 0 && <div>
                    <div className="text-3xl font-bold text-warning">{appData.userStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>}
              </section>}

            {/* Feature List */}
            <section aria-labelledby="feature-list" className="space-y-4">
              <h2 id="feature-list" className="text-lg font-semibold text-foreground">What you get:</h2>
              <ul className="grid grid-cols-2 gap-3" role="list">
                {features.map((feature, index) => <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-foreground text-background">
                      {feature.icon}
                    </div>
                    <div>
                      <span className={cn("font-medium", feature.highlight ? "text-foreground" : "text-foreground")}>
                        {feature.title}
                      </span>
                      <span className="text-muted-foreground"> - {feature.description}</span>
                      {feature.highlight && <Badge variant="secondary" className="ml-2 text-xs">AI</Badge>}
                    </div>
                  </li>)}
              </ul>
            </section>
          </div>

          {/* Right Side - Visual */}
          <div className="relative" aria-hidden="true">
            {/* Hero Image Section */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-subtle p-8 h-full min-h-[500px]">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-subtle opacity-60"></div>
              
              {/* Floating Elements */}
              <div className="relative z-10 h-full flex flex-col justify-center space-y-8">
                {/* Before/After Comparison */}
                <div className="grid grid-cols-1 gap-6">
                  <Card className="p-6 bg-background/95 backdrop-blur border border-border/50 hover-scale transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-destructive">Before: Overwhelmed</h3>
                        <p className="text-sm text-muted-foreground">"I need to clean my entire house" feels impossible to start</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 bg-background/95 backdrop-blur border border-primary/20 hover-scale transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-primary">After: Actionable</h3>
                        <p className="text-sm text-muted-foreground">1. Pick up 5 items from coffee table<br />2. Wipe counter for 2 minutes</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-background/80 backdrop-blur border border-border/30 hover-scale transition-all duration-300">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm">AI Breakdown</h4>
                      <p className="text-xs text-muted-foreground">Smart task splitting</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-background/80 backdrop-blur border border-border/30 hover-scale transition-all duration-300">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Timer className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm">Focus Timer</h4>
                      <p className="text-xs text-muted-foreground">Built-in breaks</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-background/80 backdrop-blur border border-border/30 hover-scale transition-all duration-300">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm">Progress Tracking</h4>
                      <p className="text-xs text-muted-foreground">Streak rewards</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-background/80 backdrop-blur border border-border/30 hover-scale transition-all duration-300">
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm">ADHD-Friendly</h4>
                      <p className="text-xs text-muted-foreground">Designed for you</p>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary/20 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-secondary/20 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute top-1/3 -right-3 w-3 h-3 bg-accent/20 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>

        </div>
      </main>

      {/* Social Proof Section */}
      <section className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">Trusted by the ADHD community</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold">{socialProof.userCount}</span>
                <span className="text-muted-foreground">users</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span className="font-semibold">{socialProof.tasksCompleted}</span>
                <span className="text-muted-foreground">tasks completed</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="font-semibold">{socialProof.averageImprovement}</span>
                <span className="text-muted-foreground">improvement in focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};