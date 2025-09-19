import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Trophy, Clock, Settings, LogOut, BrainCircuit } from "lucide-react";
import logo from "@/assets/logo.png";
import adhdOverwhelm from "@/assets/adhd-overwhelm.png";
import adhdFocused from "@/assets/adhd-focused.png";
import { useAppData } from "@/hooks/useAppData";
import { useAuth } from "@/hooks/useAuth";
interface WelcomeScreenProps {
  onStartFocus: () => void;
  onViewProgress: () => void;
  onOpenSettings: () => void;
}
export const WelcomeScreen = ({
  onStartFocus,
  onViewProgress,
  onOpenSettings
}: WelcomeScreenProps) => {
  const {
    appData,
    getTodaysStats
  } = useAppData();
  const {
    signOut,
    isAuthenticated
  } = useAuth();
  const todaysStats = getTodaysStats();
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Clean Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TinySteps" className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">TinySteps</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onOpenSettings} className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            
            {isAuthenticated && <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground hover:text-destructive">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>}
          </div>
        </div>
      </header>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                  Your Focus,
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Powered by AI</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground/90">
                  Focus made easy with AI-powered tools for better productivity
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Break down overwhelming tasks into tiny, manageable steps. Designed specifically for minds that think differently, with adaptive timers and intelligent suggestions.
              </p>
            </div>

            {/* Stats Row */}
            {appData.userStats.totalTasks > 0 && <div className="flex gap-8 py-6 border-y border-border/50">
                <div>
                  <div className="text-3xl font-bold text-foreground">{todaysStats.sessionsToday}</div>
                  <div className="text-sm text-muted-foreground">Sessions Today</div>
                </div>
                {appData.userStats.currentStreak > 0 && <div>
                    <div className="text-3xl font-bold text-warning">{appData.userStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>}
              </div>}

            {/* Action Buttons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onStartFocus} 
                  size="lg" 
                  className="group h-16 px-10 text-lg font-semibold bg-gradient-primary text-white hover:shadow-glow transition-all duration-300 hover:scale-[1.02] border-0"
                >
                  <BrainCircuit className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Start Focus Session
                </Button>
                
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={onViewProgress} 
                    className="h-14 px-8 text-base font-medium border-2 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    View Progress
                  </Button>
                  
                  {/* Subtle illustration accent */}
                  <div className="hidden sm:block w-12 h-12 bg-gradient-soft rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Feature List */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-foreground">What you get:</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium">Break tasks into tiny steps</span>
                    <p className="text-sm text-muted-foreground">Transform overwhelming projects into manageable actions</p>
                  </div>
                </div>
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium">Gentle, adaptive timers</span>
                    <p className="text-sm text-muted-foreground">Work at your own pace with flexible focus sessions</p>
                  </div>
                </div>
                {isAuthenticated && <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BrainCircuit className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <span className="text-foreground font-medium">AI-powered suggestions</span>
                      <p className="text-sm text-muted-foreground">Smart recommendations tailored to your workflow</p>
                    </div>
                  </div>}
              </div>
            </div>
          </div>

          {/* Right Side - ADHD Illustrations */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="space-y-6 w-full max-w-md">
              
              {/* Before State - Overwhelm */}
              <Card className="p-6 bg-gradient-to-br from-background to-destructive/5 border border-border/50 shadow-lg">
                <div className="flex items-center gap-4">
                  <img src={adhdOverwhelm} alt="ADHD Overwhelm" className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Before TinySteps</h3>
                    <p className="text-sm text-muted-foreground">Scattered thoughts, overwhelming tasks, endless distractions</p>
                  </div>
                </div>
              </Card>

              {/* Transformation Arrow */}
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* After State - Focused */}
              <Card className="p-6 bg-gradient-to-br from-background to-success/5 border border-border/50 shadow-lg">
                <div className="flex items-center gap-4">
                  <img src={adhdFocused} alt="ADHD Focused" className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">With TinySteps</h3>
                    <p className="text-sm text-muted-foreground">Clear focus, manageable steps, productive flow</p>
                  </div>
                </div>
              </Card>

              {/* Stats Visual */}
              <div className="bg-gradient-soft rounded-xl p-4 border border-border/30">
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">Your progress today</div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-primary rounded-full transition-all duration-500"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">3 of 4 tasks completed</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-secondary/20 rounded-full blur-sm"></div>
              <div className="absolute top-1/3 -right-3 w-3 h-3 bg-accent/20 rounded-full blur-sm"></div>
            </div>
          </div>

        </div>
      </main>
    </div>;
};