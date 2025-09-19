import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Trophy, Clock, Settings, LogOut, BrainCircuit } from "lucide-react";
import logo from "@/assets/logo.png";
import procrastinationIllustration from "@/assets/procrastination-illustration.svg";
import { useAppData } from "@/hooks/useAppData";
import { useAuth } from "@/hooks/useAuth";

interface WelcomeScreenProps {
  onStartFocus: () => void;
  onViewProgress: () => void;
  onOpenSettings: () => void;
}

export const WelcomeScreen = ({ onStartFocus, onViewProgress, onOpenSettings }: WelcomeScreenProps) => {
  const { appData, getTodaysStats } = useAppData();
  const { signOut, isAuthenticated } = useAuth();
  const todaysStats = getTodaysStats();
  return (
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TinySteps" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">TinySteps</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="gap-2 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 lg:py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/5 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center min-h-[calc(100vh-200px)] relative z-10">
          
          {/* Left Side - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Main Heading */}
            <div className="space-y-6 animate-fade-in delay-150">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight transform hover:scale-105 transition-transform duration-300">
                Focus made
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent animate-pulse">simple</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Break down overwhelming tasks into tiny, manageable steps. AI-powered productivity for minds that think differently.
              </p>
            </div>

            {/* Stats Row */}
            {appData.userStats.totalTasks > 0 && (
              <div className="flex gap-8 py-6 border-y border-border/50 animate-fade-in delay-300">
                <div className="hover-scale">
                  <div className="text-3xl font-bold text-foreground">{todaysStats.sessionsToday}</div>
                  <div className="text-sm text-muted-foreground">Sessions Today</div>
                </div>
                {appData.userStats.currentStreak > 0 && (
                  <div className="hover-scale">
                    <div className="text-3xl font-bold text-warning">{appData.userStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="space-y-4 animate-fade-in delay-500">
              <Button 
                onClick={onStartFocus}
                size="lg"
                className="h-14 px-8 text-lg bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <BrainCircuit className="w-5 h-5 mr-2" />
                Start Focus Session
              </Button>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={onViewProgress}
                  className="h-12 px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
                
                <div className="w-16 h-16 flex-shrink-0 hover-scale animate-pulse">
                  <img 
                    src={procrastinationIllustration} 
                    alt="Productivity illustration" 
                    className="w-full h-full object-contain filter grayscale contrast-125 brightness-110 hover:brightness-125 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-4 pt-4 animate-fade-in delay-700">
              <h3 className="text-lg font-semibold text-foreground">What you get:</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <Target className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">Break tasks into tiny steps</span>
                </div>
                <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 delay-75">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center animate-pulse delay-200">
                    <Clock className="w-3 h-3 text-secondary" />
                  </div>
                  <span className="text-foreground">Gentle, adaptive timers</span>
                </div>
                {isAuthenticated && (
                  <div className="flex items-center gap-3 hover:translate-x-2 transition-transform duration-300 delay-150">
                    <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center animate-pulse delay-300">
                      <BrainCircuit className="w-3 h-3 text-warning" />
                    </div>
                    <span className="text-foreground">AI-powered suggestions</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in delay-1000">
            <div className="w-full max-w-lg hover:scale-105 transition-transform duration-500">
              <img 
                src={procrastinationIllustration} 
                alt="Focus and productivity illustration" 
                className="w-full h-auto filter grayscale contrast-125 brightness-110 hover:brightness-125 hover:contrast-150 transition-all duration-500"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};