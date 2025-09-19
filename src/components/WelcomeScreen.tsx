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
    <div className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto">
      {/* Header with Logo */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <img src={logo} alt="TinySteps" className="h-8 w-8" />
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">TinySteps</h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="w-10 h-10 hover:bg-primary-soft"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </Button>
          
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="w-10 h-10 hover:bg-destructive-soft text-destructive hover:text-destructive-foreground"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6 mb-12">
        <h2 className="text-5xl font-bold text-foreground leading-tight">
          Ready to focus?
        </h2>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Take one small step. Break it down. Stay focused.
        </p>
      </div>

      {/* Stats and Action Grid */}
      <div className="grid gap-6 mb-8">
        {/* Progress Card - if user has data */}
        {appData.userStats.totalTasks > 0 && (
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20 shadow-elegant">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
                  {todaysStats.sessionsToday}
                </div>
                <div className="text-muted-foreground">sessions today</div>
              </div>
              {appData.userStats.currentStreak > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-warning mb-1">
                    {appData.userStats.currentStreak}
                  </div>
                  <div className="text-sm text-muted-foreground">day streak 🔥</div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Main Action Card */}
        <Card className="p-8 bg-gradient-to-br from-background to-accent/5 border-0 shadow-focus hover:shadow-success transition-all duration-300">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Start Your Session</h3>
              <p className="text-muted-foreground">Break down tasks, stay focused, get things done</p>
            </div>
            <Button 
              onClick={onStartFocus}
              className="w-full h-14 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-focus hover:shadow-success transition-all"
            >
              Start Focus Session
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Row - Progress and Features */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Button */}
        <Card className="p-6 bg-gradient-soft border-secondary/20 hover:border-secondary/40 transition-all cursor-pointer group" onClick={onViewProgress}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">View Progress</h4>
              <p className="text-sm text-muted-foreground">Track your achievements</p>
            </div>
          </div>
        </Card>

        {/* Features Card */}
        <Card className="p-6 bg-gradient-soft border-accent/20">
          <div className="space-y-4">
            <h4 className="font-semibold text-accent">What you get:</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">Break tasks into tiny steps</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-sm">Gentle focus timers</span>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-4 h-4 text-warning" />
                  <span className="text-sm">AI-powered suggestions</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};