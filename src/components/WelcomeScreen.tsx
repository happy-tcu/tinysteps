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
    <div className="min-h-screen flex flex-col p-6 max-w-4xl mx-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-16 backdrop-blur-sm bg-background/90 rounded-2xl p-4 border border-border/50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={logo} alt="TinySteps" className="h-10 w-10 transition-transform hover:scale-110" />
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
            className="w-12 h-12 rounded-xl bg-background/80 border border-border/50 hover:bg-primary/10 hover:scale-110 transition-all duration-200"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </Button>
          
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="w-12 h-12 rounded-xl bg-background/80 border border-border/50 hover:bg-destructive/10 hover:scale-110 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 text-destructive" />
            </Button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-8 mb-16">
        <div className="relative">
          <h2 className="text-6xl md:text-7xl font-bold text-foreground leading-tight">
            Ready to focus?
          </h2>
        </div>
        <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Take one small step. Break it down. Stay focused.
        </p>
      </div>

      {/* Stats Card */}
      {appData.userStats.totalTasks > 0 && (
        <div className="mb-8">
          <Card className="p-8 backdrop-blur-xl bg-gradient-to-br from-background/90 to-primary/5 border border-border/50 shadow-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-foreground">
                  {todaysStats.sessionsToday}
                </div>
                <div className="text-muted-foreground text-lg">sessions today</div>
              </div>
              {appData.userStats.currentStreak > 0 && (
                <div className="text-right space-y-2">
                  <div className="text-4xl font-bold text-warning">
                    {appData.userStats.currentStreak}
                  </div>
                  <div className="text-sm text-muted-foreground">day streak 🔥</div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Main Action Card */}
      <div className="mb-8">
        <Card className="p-10 backdrop-blur-xl bg-gradient-to-br from-background/95 to-accent/10 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                Start Your Session
              </h3>
              <p className="text-xl text-muted-foreground">Break down tasks, stay focused, get things done</p>
            </div>
            
            <Button 
              onClick={onStartFocus}
              className="w-full h-16 text-xl font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <BrainCircuit className="w-6 h-6 mr-3" />
              Start Focus Session
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Button */}
        <Card 
          className="p-8 backdrop-blur-md bg-gradient-to-br from-background/90 to-secondary/10 border border-border/50 hover:border-secondary/50 transition-all duration-300 cursor-pointer group hover:scale-105" 
          onClick={onViewProgress}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2 text-foreground">View Progress</h4>
              <p className="text-muted-foreground">Track your achievements and growth</p>
            </div>
          </div>
        </Card>

        {/* Features Card */}
        <Card className="p-8 backdrop-blur-md bg-gradient-to-br from-background/90 to-accent/10 border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-foreground">What you get:</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-200">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">Break tasks into tiny steps</span>
              </div>
              <div className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-200">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-foreground font-medium">Gentle focus timers</span>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-4 hover:translate-x-2 transition-transform duration-200">
                  <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-warning" />
                  </div>
                  <span className="text-foreground font-medium">AI-powered suggestions</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};