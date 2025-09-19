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
    <div className="min-h-screen bg-background">
      {/* Clean Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TinySteps" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">TinySteps</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSettings}
              className="gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="gap-2 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Focus made
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">simple</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Break down overwhelming tasks into tiny, manageable steps. AI-powered productivity for minds that think differently.
              </p>
            </div>

            {/* Stats Row */}
            {appData.userStats.totalTasks > 0 && (
              <div className="flex gap-8 py-6 border-y border-border/50">
                <div>
                  <div className="text-3xl font-bold text-foreground">{todaysStats.sessionsToday}</div>
                  <div className="text-sm text-muted-foreground">Sessions Today</div>
                </div>
                {appData.userStats.currentStreak > 0 && (
                  <div>
                    <div className="text-3xl font-bold text-warning">{appData.userStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="space-y-4">
              <Button 
                onClick={onStartFocus}
                size="lg"
                className="h-14 px-8 text-lg bg-foreground text-background hover:bg-foreground/90"
              >
                <BrainCircuit className="w-5 h-5 mr-2" />
                Start Focus Session
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={onViewProgress}
                className="h-12 px-8 ml-4"
              >
                <Trophy className="w-4 h-4 mr-2" />
                View Progress
              </Button>
            </div>

            {/* Feature List */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-foreground">What you get:</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">Break tasks into tiny steps</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Clock className="w-3 h-3 text-secondary" />
                  </div>
                  <span className="text-foreground">Gentle, adaptive timers</span>
                </div>
                {isAuthenticated && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center">
                      <BrainCircuit className="w-3 h-3 text-warning" />
                    </div>
                    <span className="text-foreground">AI-powered suggestions</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Card */}
              <Card className="w-80 p-8 bg-gradient-to-br from-background to-primary/5 border border-border/50 shadow-xl">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                    <BrainCircuit className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ready to Focus?</h3>
                    <p className="text-muted-foreground text-sm">Turn overwhelming projects into tiny, manageable steps</p>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-primary rounded-full"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">75% of today&apos;s goal complete</div>
                  </div>
                </div>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-secondary/20 rounded-full"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent/20 rounded-full"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};