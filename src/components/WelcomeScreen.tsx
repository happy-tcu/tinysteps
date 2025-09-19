import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Trophy, Clock, Settings } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAppData } from "@/hooks/useAppData";

interface WelcomeScreenProps {
  onStartFocus: () => void;
  onViewProgress: () => void;
  onOpenSettings: () => void;
}

export const WelcomeScreen = ({ onStartFocus, onViewProgress, onOpenSettings }: WelcomeScreenProps) => {
  const { appData, getTodaysStats } = useAppData();
  const todaysStats = getTodaysStats();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-soft opacity-30"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary-soft rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-soft rounded-full blur-3xl opacity-50"></div>
      
      {/* Settings Button */}
      <div className="absolute top-6 right-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSettings}
          className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card shadow-soft"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12 space-y-6">
          <img 
            src={heroImage} 
            alt="TinySteps - Small steps, big progress" 
            className="w-full h-48 object-cover rounded-2xl shadow-soft mb-8"
          />
          
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            TinySteps
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Small steps, big progress
          </p>
          
          <p className="text-lg text-foreground/80 max-w-lg mx-auto">
            Break down overwhelming tasks into tiny, manageable steps. 
            Stay focused with gentle timers and celebrate every victory.
          </p>
          
          {/* Quick Stats */}
          {appData.userStats.totalTasks > 0 && (
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-primary">{todaysStats.sessionsToday}</p>
                <p className="text-muted-foreground">Today's Sessions</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-secondary">{appData.userStats.currentStreak}</p>
                <p className="text-muted-foreground">Day Streak</p>
              </div>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="p-4 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-focus transition-smooth">
            <Target className="w-8 h-8 text-primary mb-2 mx-auto" />
            <h3 className="font-semibold text-sm mb-1">Focus Timer</h3>
            <p className="text-xs text-muted-foreground">Gentle Pomodoro sessions</p>
          </Card>
          
          <Card className="p-4 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-focus transition-smooth">
            <Trophy className="w-8 h-8 text-secondary mb-2 mx-auto" />
            <h3 className="font-semibold text-sm mb-1">Progress Tracking</h3>
            <p className="text-xs text-muted-foreground">Celebrate your streaks</p>
          </Card>
          
          <Card className="p-4 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-focus transition-smooth">
            <Clock className="w-8 h-8 text-accent mb-2 mx-auto" />
            <h3 className="font-semibold text-sm mb-1">Break Reminders</h3>
            <p className="text-xs text-muted-foreground">Gentle rest periods</p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <Button 
            onClick={onStartFocus}
            className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-focus transition-smooth group"
          >
            <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Start Your Focus Session
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onViewProgress}
            className="w-full h-12 font-medium border-primary/20 hover:bg-primary-soft hover:border-primary/40 transition-smooth"
          >
            <Trophy className="w-5 h-5 mr-2" />
            View Your Progress
          </Button>
        </div>

        {/* Encouraging message */}
        <p className="mt-8 text-sm text-muted-foreground gentle-pulse">
          ✨ Ready to take your first tiny step today?
        </p>
      </div>
    </div>
  );
};