import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Timer, Target, Lightbulb } from "lucide-react";

interface TaskCreationScreenProps {
  onBack: () => void;
  onCreateTask: (task: string, duration: number) => void;
}

export const TaskCreationScreen = ({ onBack, onCreateTask }: TaskCreationScreenProps) => {
  const [task, setTask] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(25);
  
  const durations = [
    { value: 10, label: "10 min", description: "Quick task" },
    { value: 15, label: "15 min", description: "Short focus" },
    { value: 25, label: "25 min", description: "Standard" },
    { value: 45, label: "45 min", description: "Deep work" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onCreateTask(task.trim(), selectedDuration);
    }
  };

  const suggestions = [
    "Read 5 pages of my book",
    "Write one paragraph",
    "Organize my desk",
    "Reply to 3 emails",
    "Review meeting notes"
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Create Your Task</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full">
        <Card className="p-8 shadow-soft bg-card/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Task Input */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <label className="text-lg font-semibold text-foreground">
                  What's your next tiny step?
                </label>
              </div>
              
              <Input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g., Read one chapter of my book"
                className="h-14 text-lg border-2 border-border focus:border-primary transition-smooth"
                autoFocus
              />
              
              <p className="text-sm text-muted-foreground">
                Keep it small and specific. You've got this! 💙
              </p>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Timer className="w-6 h-6 text-primary" />
                <label className="text-lg font-semibold text-foreground">
                  How long will you focus?
                </label>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {durations.map((duration) => (
                  <Button
                    key={duration.value}
                    type="button"
                    variant={selectedDuration === duration.value ? "default" : "outline"}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`h-16 flex flex-col transition-smooth ${
                      selectedDuration === duration.value 
                        ? "bg-gradient-primary shadow-focus" 
                        : "hover:bg-primary-soft hover:border-primary/40"
                    }`}
                  >
                    <span className="font-bold text-base">{duration.label}</span>
                    <span className="text-xs opacity-80">{duration.description}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!task.trim()}
              className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-focus transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Timer className="w-6 h-6 mr-3" />
              Start Focus Session
            </Button>
          </form>
        </Card>

        {/* Task Suggestions */}
        <Card className="mt-6 p-6 shadow-soft bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Need inspiration?</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => setTask(suggestion)}
                className="text-sm hover:bg-accent-soft hover:text-accent-foreground transition-smooth"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};