import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Brain, Timer, TrendingUp, Sparkles, CheckCircle2, ArrowRight, Play, Pause } from "lucide-react";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { useToast } from "@/hooks/use-toast";

interface OnboardingWizardProps {
  onComplete: () => void;
  onStartQuickFocus: (taskName: string) => void;
}

export const OnboardingWizard = ({ onComplete, onStartQuickFocus }: OnboardingWizardProps) => {
  const [step, setStep] = useState(1);
  const [taskInput, setTaskInput] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [completedSession, setCompletedSession] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const { addCompletedSession } = useSupabaseData();
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerComplete = async () => {
    try {
      await addCompletedSession(taskInput, 5);
      setCompletedSession(true);
      toast({
        title: "Amazing! 🎉",
        description: "You completed your first focus session!",
      });
      setStep(2);
    } catch (error) {
      console.error('Error saving session:', error);
      // Still move to step 2 and mark as completed even if save fails
      setCompletedSession(true);
      setStep(2);
    }
  };

  const handleStep1Continue = () => {
    if (taskInput.trim()) {
      setSessionStarted(true);
      setIsTimerRunning(true);
    }
  };

  const handleSkip = () => {
    // Skip directly to step 2 without saving a session
    // Stop the timer and reset state to prevent handleTimerComplete from firing
    setIsTimerRunning(false);
    setSessionStarted(false);
    setTimeLeft(5 * 60); // Reset time
    setStep(2);
    toast({
      title: "Skipped",
      description: "No worries! Let's continue learning about TinySteps.",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        if (sessionStarted) {
          // Show the focus timer (whether running, paused, or completed)
          const timerProgress = ((5 * 60 - timeLeft) / (5 * 60)) * 100;
          return (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold">{taskInput}</h2>
                <p className="text-muted-foreground">
                  Stay focused on this one thing. You've got this! 💙
                </p>
              </div>

              {/* Circular Progress Timer */}
              <div className="flex justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      className="stroke-muted fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      className="stroke-primary fill-none transition-all duration-1000"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - timerProgress / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold" aria-live="polite" aria-atomic="true">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {Math.round(timerProgress)}% done
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  variant="outline"
                  size="lg"
                  data-testid="button-pause-resume"
                  aria-label={isTimerRunning ? "Pause timer" : "Resume timer"}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" aria-hidden="true" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                      Resume
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  size="lg"
                  data-testid="button-skip"
                  aria-label="Skip onboarding session"
                >
                  Skip to Next
                </Button>
              </div>
            </div>
          );
        }

        // Show task input before timer starts
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Timer className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold">Welcome to TinySteps!</h2>
              <p className="text-muted-foreground">
                Let's start with a quick 5-minute focus session. What would you like to work on?
              </p>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                placeholder="e.g., Respond to emails, Read a chapter, Organize desk..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStep1Continue()}
                className="text-lg py-6"
                data-testid="input-onboarding-task"
                autoFocus
                aria-label="Enter your first task"
              />
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTaskInput("Organize my desk")}
                  data-testid="button-quick-task-1"
                >
                  Organize my desk
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTaskInput("Review emails")}
                  data-testid="button-quick-task-2"
                >
                  Review emails
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTaskInput("Read for 5 minutes")}
                  data-testid="button-quick-task-3"
                >
                  Read for 5 minutes
                </Button>
              </div>
            </div>

            <Button
              onClick={handleStep1Continue}
              disabled={!taskInput.trim()}
              className="w-full bg-gradient-primary text-lg py-6"
              size="lg"
              data-testid="button-start-first-focus"
              aria-label="Start your first 5-minute focus session"
            >
              Start My First 5-Min Focus
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${completedSession ? 'bg-green-500' : 'bg-gradient-primary'}`}>
                {completedSession ? (
                  <CheckCircle2 className="w-8 h-8 text-white" aria-hidden="true" />
                ) : (
                  <Brain className="w-8 h-8 text-white" aria-hidden="true" />
                )}
              </div>
              <h2 className="text-2xl font-bold">
                {completedSession ? "Great job! 🎉" : "No Problem!"}
              </h2>
              <p className="text-muted-foreground">
                {completedSession 
                  ? "You just completed your first focus session! See how easy that was?"
                  : "Whenever you're ready to focus, TinySteps is here to help. Let's explore what makes it special!"}
              </p>
            </div>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-accent-foreground mb-1">Pro Tip: Use AI Task Breakdown</h3>
                    <p className="text-sm text-muted-foreground">
                      For complex tasks, our AI can break them into tiny, manageable steps - perfect for ADHD brains!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setStep(3)}
              className="w-full bg-gradient-primary text-lg py-6"
              size="lg"
              data-testid="button-next-onboarding-step"
              aria-label="Continue to next step"
            >
              {completedSession ? "Show Me How" : "Tell Me More"}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold">Track Your Progress</h2>
              <p className="text-muted-foreground">
                Every focus session you complete builds your streak and improves your stats!
              </p>
            </div>

            <div className="space-y-3">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                    What You'll Get
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                    <span>Real-time progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                    <span>Focus streak celebrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                    <span>Cloud sync across devices</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={onComplete}
              className="w-full bg-gradient-primary text-lg py-6"
              size="lg"
              data-testid="button-complete-onboarding"
              aria-label="Start using TinySteps"
            >
              Start Using TinySteps!
              <Sparkles className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>

            <button
              onClick={onComplete}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-skip-onboarding"
            >
              Skip for now
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-focus">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" aria-label={`Onboarding progress: ${Math.round(progress)}%`} />
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};
