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

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        
        {/* Progress Display */}
        {appData.userStats.totalTasks > 0 && (
          <Card className="p-6 text-center bg-gradient-soft border-primary/20 shadow-soft">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              {todaysStats.sessionsToday}
            </div>
            <div className="text-muted-foreground text-lg mb-2">sessions today</div>
            {appData.userStats.currentStreak > 0 && (
              <div className="text-sm text-warning font-medium">
                {appData.userStats.currentStreak} day streak 🔥
              </div>
            )}
          </Card>
        )}

        {/* Welcome Message */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-foreground">Ready to focus?</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Take one small step. Break it down. Stay focused.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={onStartFocus}
            className="w-full h-16 text-xl font-semibold bg-foreground text-background hover:bg-foreground/90 shadow-focus"
          >
            <BrainCircuit className="mr-3 w-6 h-6" />
            Start Focus Session
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onViewProgress}
            className="w-full h-12 text-base border-primary/20 hover:bg-primary-soft text-foreground"
          >
            <Trophy className="mr-2 w-5 h-5" />
            View Progress
          </Button>
        </div>

        {/* Features List */}
        <Card className="p-6 bg-gradient-soft border-0 shadow-soft">
          <div className="text-center space-y-4">
            <div className="text-sm font-medium text-primary">What you get:</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span>Break tasks into tiny steps</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Gentle focus timers</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                <span>Track your progress</span>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-warning" />
                  <span>AI-powered suggestions</span>
                </div>
              )}
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};