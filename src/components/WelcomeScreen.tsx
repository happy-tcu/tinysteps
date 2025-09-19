import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Trophy, Clock, Settings, LogOut, BrainCircuit } from "lucide-react";
import logo from "@/assets/logo.png";
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
    <div className="min-h-screen flex flex-col p-6 max-w-4xl mx-auto relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Modern Header with Glassmorphism */}
      <div className="flex justify-between items-center mb-16 backdrop-blur-sm bg-background/80 rounded-2xl p-4 border border-white/10 shadow-lg animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={logo} alt="TinySteps" className="h-10 w-10 hover-scale" />
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            TinySteps
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="w-12 h-12 rounded-xl backdrop-blur-sm bg-background/60 border border-white/10 hover:bg-primary/20 hover:scale-110 transition-all duration-300"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </Button>
          
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="w-12 h-12 rounded-xl backdrop-blur-sm bg-background/60 border border-white/10 hover:bg-destructive/20 hover:scale-110 transition-all duration-300"
            >
              <LogOut className="w-5 h-5 text-destructive" />
            </Button>
          )}
        </div>
      </div>

      {/* Hero Section with Floating Animation */}
      <div className="text-center space-y-8 mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="relative">
          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight animate-scale-in">
            Ready to focus?
          </h2>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        </div>
        <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
          Take one small step. Break it down. Stay focused.
        </p>
      </div>

      {/* Stats Card with Advanced Glassmorphism */}
      {appData.userStats.totalTasks > 0 && (
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Card className="p-8 backdrop-blur-xl bg-gradient-to-br from-background/80 via-background/60 to-primary/5 border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-50"></div>
            <div className="relative flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-scale-in">
                  {todaysStats.sessionsToday}
                </div>
                <div className="text-muted-foreground text-lg">sessions today</div>
              </div>
              {appData.userStats.currentStreak > 0 && (
                <div className="text-right space-y-2">
                  <div className="text-4xl font-bold text-warning animate-pulse">
                    {appData.userStats.currentStreak}
                  </div>
                  <div className="text-sm text-muted-foreground">day streak 🔥</div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Main Action with Floating Animation */}
      <div className="mb-8 animate-fade-in" style={{animationDelay: '0.8s'}}>
        <Card className="p-10 backdrop-blur-xl bg-gradient-to-br from-background/90 to-accent/10 border-0 shadow-2xl hover:shadow-success/30 transition-all duration-500 group relative overflow-hidden">
          {/* Animated border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent p-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-background rounded-2xl h-full w-full"></div>
          </div>
          
          <div className="relative text-center space-y-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500 animate-pulse">
                <BrainCircuit className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 scale-150 blur-xl"></div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Start Your Session
              </h3>
              <p className="text-xl text-muted-foreground">Break down tasks, stay focused, get things done</p>
            </div>
            
            <Button 
              onClick={onStartFocus}
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-foreground to-primary text-background hover:from-primary hover:to-secondary shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <BrainCircuit className="w-6 h-6" />
                Start Focus Session
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Grid with Staggered Animation */}
      <div className="grid md:grid-cols-2 gap-6 animate-fade-in" style={{animationDelay: '1s'}}>
        {/* Progress Button with Hover Effects */}
        <Card 
          className="p-8 backdrop-blur-md bg-gradient-to-br from-background/80 to-secondary/10 border border-white/10 hover:border-secondary/40 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl relative overflow-hidden" 
          onClick={onViewProgress}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2 text-foreground">View Progress</h4>
              <p className="text-muted-foreground">Track your achievements and growth</p>
            </div>
          </div>
        </Card>

        {/* Features Card with Animated Icons */}
        <Card className="p-8 backdrop-blur-md bg-gradient-to-br from-background/80 to-accent/10 border border-white/10 hover:border-accent/40 transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative space-y-6">
            <h4 className="text-xl font-semibold text-accent">What you get:</h4>
            <div className="space-y-4">
              {[
                { icon: Target, text: "Break tasks into tiny steps", color: "text-primary", delay: "0s" },
                { icon: Clock, text: "Gentle focus timers", color: "text-secondary", delay: "0.1s" },
                ...(isAuthenticated ? [{ icon: BrainCircuit, text: "AI-powered suggestions", color: "text-warning", delay: "0.2s" }] : [])
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300" 
                  style={{transitionDelay: item.delay}}
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color.replace('text-', 'bg-')}/20 flex items-center justify-center hover:scale-110 transition-transform duration-200`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};