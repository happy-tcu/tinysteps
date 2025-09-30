import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Timer, Sparkles, Zap } from "lucide-react";

interface SimpleTaskCreationProps {
  onBack: () => void;
  onCreateTask: (task: string, duration: number) => void;
}

export const SimpleTaskCreation = ({ onBack, onCreateTask }: SimpleTaskCreationProps) => {
  const [task, setTask] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(25);

  const durations = [
    { value: 10, label: "10", emoji: "⚡" },
    { value: 25, label: "25", emoji: "🎯" },
    { value: 45, label: "45", emoji: "🔥" }
  ];

  const quickStarters = [
    "Read 5 pages",
    "Write for 10 minutes",
    "Organize my desk",
    "Reply to emails"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onCreateTask(task.trim(), selectedDuration);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-background">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="hover:bg-muted/50"
          data-testid="button-back"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Back
        </Button>

        <Card className="shadow-focus border-primary/10">
          <CardContent className="pt-8 pb-8 px-6 md:px-12 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Main Question */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  What's one tiny thing you'll focus on?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Keep it small. You've got this! 💙
                </p>
              </div>

              {/* Task Input */}
              <div className="space-y-4">
                <Input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="e.g., Read one chapter..."
                  className="text-xl py-7 text-center border-2 focus:border-primary"
                  autoFocus
                  data-testid="input-task-name"
                  aria-label="Task name"
                />

                {/* Quick Starters */}
                <div className="flex flex-wrap justify-center gap-2">
                  {quickStarters.map((starter, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setTask(starter)}
                      className="text-sm px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`button-quick-starter-${index}`}
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Timer className="w-4 h-4" aria-hidden="true" />
                  <span>Focus for</span>
                </div>
                
                <div className="flex justify-center gap-3">
                  {durations.map((duration) => (
                    <button
                      key={duration.value}
                      type="button"
                      onClick={() => setSelectedDuration(duration.value)}
                      className={`
                        w-20 h-20 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center gap-1
                        transition-all duration-200 font-semibold
                        ${selectedDuration === duration.value 
                          ? "bg-gradient-primary text-white shadow-focus scale-105" 
                          : "bg-muted hover:bg-muted/80 text-foreground hover:scale-105"
                        }
                      `}
                      data-testid={`button-duration-${duration.value}`}
                      aria-label={`${duration.value} minutes`}
                      aria-pressed={selectedDuration === duration.value}
                    >
                      <span className="text-2xl" role="img" aria-hidden="true">{duration.emoji}</span>
                      <span className="text-xl">{duration.label}</span>
                      <span className="text-xs opacity-80">min</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!task.trim()}
                className="w-full h-14 text-lg font-semibold bg-foreground hover:bg-foreground/90 text-background"
                size="lg"
                data-testid="button-start-focus"
                aria-label="Start focus session"
              >
                <Zap className="w-5 h-5 mr-2" aria-hidden="true" />
                Start Focus Session
              </Button>
            </form>

            {/* Encouragement */}
            <p className="text-center text-sm text-muted-foreground">
              Remember: Done is better than perfect ✨
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
