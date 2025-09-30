import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Square, ArrowLeft } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { useToast } from "@/hooks/use-toast";

interface FocusTimerProps {
  task: string;
  duration: number; // in minutes
  onComplete: () => void;
  onBack: () => void;
}

export const FocusTimer = ({ task, duration, onComplete, onBack }: FocusTimerProps) => {
  const { addCompletedSession } = useSupabaseData();
  const { toast } = useToast();
  const { playSuccess, playStart, playProgress } = useSoundEffects();
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progressSoundsPlayed, setProgressSoundsPlayed] = useState({ fifty: false, eighty: false });
  
  const totalTime = duration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 120; // radius of 120
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            // Save completed session to Supabase
            addCompletedSession(task, duration).catch(error => {
              console.error('Error saving session:', error);
              toast({
                variant: "destructive",
                title: "Error saving session",
                description: "Your progress was not saved. Please check your connection.",
              });
            });
            playSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, task, duration, addCompletedSession, playSuccess, toast]);

  // Play progress sounds at milestones
  useEffect(() => {
    if (progress >= 50 && !progressSoundsPlayed.fifty) {
      playProgress();
      setProgressSoundsPlayed(prev => ({ ...prev, fifty: true }));
    }
    if (progress >= 80 && !progressSoundsPlayed.eighty) {
      playProgress();
      setProgressSoundsPlayed(prev => ({ ...prev, eighty: true }));
    }
  }, [progress, progressSoundsPlayed, playProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    playStart();
  };
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setProgressSoundsPlayed({ fifty: false, eighty: false });
  };

  const getEncouragementMessage = () => {
    if (isCompleted) return "🎉 Amazing! You did it!";
    if (progress >= 80) return "🔥 Almost there! You're crushing it!";
    if (progress >= 50) return "💪 Halfway done! Keep going!";
    if (progress >= 20) return "✨ Great start! You're in the zone!";
    return "🌟 You've got this! One step at a time.";
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-secondary-soft to-accent-soft">
        <Card className="p-8 max-w-md w-full text-center shadow-success bg-card/90 backdrop-blur-sm celebrate">
          <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Congratulations!
          </h2>
          
          <p className="text-muted-foreground mb-4">
            You completed: <span className="font-semibold text-foreground">"{task}"</span>
          </p>
          
          <p className="text-sm text-secondary mb-8">
            Time to take a well-deserved break! 🌟
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={onComplete}
              className="w-full h-12 bg-gradient-success hover:shadow-success transition-smooth"
            >
              Take a Break
            </Button>
            
            <Button 
              variant="outline"
              onClick={onBack}
              className="w-full h-10 border-secondary/30 hover:bg-secondary-soft"
            >
              Start Another Task
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Focus Session</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
        {/* Task Display */}
        <Card className="w-full p-6 mb-8 shadow-soft bg-card/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-center text-foreground mb-2">
            Current Task
          </h2>
          <p className="text-center text-muted-foreground">
            {task}
          </p>
        </Card>

        {/* Timer Circle */}
        <div className="relative mb-8">
          <svg width="280" height="280" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="hsl(var(--border))"
              strokeWidth="8"
              fill="none"
              className="opacity-20"
            />
            {/* Progress circle */}
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="progress-ring transition-smooth"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-mono font-bold text-foreground mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted-foreground text-center px-4">
              {Math.round(progress)}% complete
            </div>
          </div>
        </div>

        {/* Encouragement Message */}
        <Card className="w-full p-4 mb-8 bg-primary-soft/30 border-primary/20 text-center">
          <p className="text-sm font-medium text-primary gentle-pulse">
            {getEncouragementMessage()}
          </p>
        </Card>

        {/* Controls */}
        <div className="flex gap-4 w-full">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="flex-1 h-14 text-lg font-semibold bg-gradient-primary hover:shadow-focus transition-smooth"
            >
              <Play className="w-6 h-6 mr-2" />
              {timeLeft === totalTime ? "Start Focus" : "Resume"}
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              variant="outline"
              className="flex-1 h-14 text-lg font-semibold border-warning/40 hover:bg-warning-soft transition-smooth"
            >
              <Pause className="w-6 h-6 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={handleStop}
            variant="outline"
            className="h-14 px-6 border-destructive/40 hover:bg-destructive/10 transition-smooth"
          >
            <Square className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};