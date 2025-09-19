import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, Play, SkipForward } from "lucide-react";

interface BreakScreenProps {
  onBreakComplete: () => void;
  onStartNewTask: () => void;
}

export const BreakScreen = ({ onBreakComplete, onStartNewTask }: BreakScreenProps) => {
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [isBreakCompleted, setIsBreakCompleted] = useState(false);

  const totalBreakTime = 5 * 60;
  const progress = ((totalBreakTime - breakTime) / totalBreakTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreakRunning && breakTime > 0) {
      interval = setInterval(() => {
        setBreakTime((prev) => {
          if (prev <= 1) {
            setIsBreakRunning(false);
            setIsBreakCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isBreakRunning, breakTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const breakActivities = [
    { icon: "🧘", title: "Deep Breathing", description: "Take 5 deep breaths" },
    { icon: "🚶", title: "Quick Walk", description: "Step away from your workspace" },
    { icon: "💧", title: "Hydrate", description: "Drink a glass of water" },
    { icon: "🌱", title: "Stretch", description: "Gentle neck and shoulder rolls" },
  ];

  if (isBreakCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-secondary-soft to-primary-soft">
        <Card className="p-8 max-w-md w-full text-center shadow-success bg-card/90 backdrop-blur-sm">
          <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-10 h-10 text-secondary-foreground" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Break Complete!
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Feeling refreshed? Ready for your next productive session!
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={onStartNewTask}
              className="w-full h-12 bg-gradient-primary hover:shadow-focus transition-smooth"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Next Task
            </Button>
            
            <Button 
              variant="outline"
              onClick={onBreakComplete}
              className="w-full h-10"
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-accent-soft to-secondary-soft">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-8 h-8 text-secondary-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Break Time! 🎉
          </h1>
          
          <p className="text-lg text-muted-foreground">
            You've earned this rest. Take care of yourself!
          </p>
        </div>

        {/* Break Timer */}
        <Card className="p-8 mb-8 shadow-soft bg-card/80 backdrop-blur-sm text-center">
          {!isBreakRunning ? (
            <>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Take a 5-minute break?
              </h2>
              
              <div className="space-y-4">
                <Button
                  onClick={() => setIsBreakRunning(true)}
                  className="w-full h-12 bg-gradient-success hover:shadow-success transition-smooth"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Break Timer
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onStartNewTask}
                  className="w-full h-10"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Break & Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-4xl font-mono font-bold text-foreground mb-2">
                {formatTime(breakTime)}
              </div>
              
              <div className="w-full bg-border rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-success h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">
                {Math.round(progress)}% of your break complete
              </p>
              
              <Button
                variant="outline"
                onClick={() => {
                  setIsBreakRunning(false);
                  setIsBreakCompleted(true);
                }}
                className="hover:bg-accent-soft transition-smooth"
              >
                I'm Ready to Continue
              </Button>
            </>
          )}
        </Card>

        {/* Break Activities */}
        <Card className="p-6 shadow-soft bg-card/60 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            Break Activity Ideas
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {breakActivities.map((activity, index) => (
              <div key={index} className="text-center p-3 rounded-lg hover:bg-muted/30 transition-smooth">
                <div className="text-2xl mb-2">{activity.icon}</div>
                <h4 className="font-medium text-sm text-foreground mb-1">
                  {activity.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};