import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Trophy, Clock, Settings, LogOut } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
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
      {/* Simple Top Bar */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold">TinySteps</h1>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="w-10 h-10"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </Button>
          
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="w-10 h-10"
            >
              <LogOut className="w-5 h-5 text-foreground" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content - Single Column */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        
        {/* Simple Progress Display */}
        {appData.userStats.totalTasks > 0 && (
          <div className="text-center space-y-2 pb-8 border-b">
            <div className="text-3xl font-bold">{todaysStats.sessionsToday}</div>
            <div className="text-muted-foreground">sessions today</div>
            {appData.userStats.currentStreak > 0 && (
              <div className="text-sm text-muted-foreground">
                {appData.userStats.currentStreak} day streak 🔥
              </div>
            )}
          </div>
        )}

        {/* Main Message */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to focus?</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Take one small step. Break it down. Stay focused.
          </p>
        </div>

        {/* Primary Action - Big, Obvious */}
        <div className="space-y-4">
          <Button 
            onClick={onStartFocus}
            className="w-full h-16 text-xl font-semibold bg-foreground text-background hover:bg-foreground/90"
          >
            Start Focus Session
          </Button>
          
          {/* Secondary Action - Smaller, Less Prominent */}
          <Button 
            variant="outline" 
            onClick={onViewProgress}
            className="w-full h-12 text-base"
          >
            View Progress
          </Button>
        </div>

        {/* Simple Feature List - No Cards */}
        <div className="text-center space-y-3 pt-8 border-t">
          <div className="text-sm text-muted-foreground">What you get:</div>
          <div className="space-y-2 text-sm">
            <div>• Break tasks into tiny steps</div>
            <div>• Gentle focus timers</div>
            <div>• Track your progress</div>
            {isAuthenticated && <div>• AI-powered task suggestions</div>}
          </div>
        </div>

      </div>
    </div>
  );
};