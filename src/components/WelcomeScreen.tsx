import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Target, Trophy, Clock, Settings, LogOut, BrainCircuit, ArrowRight } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Large abstract shape in white */}
      <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      {/* Clean Header */}
      <header className="border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 relative z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TinySteps" className="h-8 w-8" />
            <span className="text-2xl font-bold text-white">TinySteps</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onOpenSettings} className="gap-2 text-white/80 hover:text-white hover:bg-white/10 border-none">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            
            {isAuthenticated && (
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 border-none">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-10 max-w-2xl">
            {/* Main Heading */}
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Breakthrough Focus
                <br />
                <span className="text-white/80">
                  from Chaos to Clarity
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/70 leading-relaxed">
                TinySteps delivers proven focus techniques and AI-powered task breakdown to help minds that think differently achieve more.
              </p>
            </div>

            {/* Stats Row */}
            {appData.userStats.totalTasks > 0 && (
              <div className="flex gap-8 py-6 border-y border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white">{todaysStats.sessionsToday}</div>
                  <div className="text-sm text-white/60">Sessions Today</div>
                </div>
                {appData.userStats.currentStreak > 0 && (
                  <div>
                    <div className="text-3xl font-bold text-white">{appData.userStats.currentStreak}</div>
                    <div className="text-sm text-white/60">Day Streak</div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onStartFocus} 
                  size="lg" 
                  className="group h-16 px-10 text-lg font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] border-none rounded-lg"
                >
                  Start Focus Session
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                
                <Button 
                  onClick={onViewProgress} 
                  size="lg" 
                  className="h-14 px-8 text-base font-medium bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] rounded-lg"
                >
                  View Progress
                  <Trophy className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Enhanced Feature List */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-white">What you get:</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Break tasks into tiny steps</span>
                    <p className="text-sm text-white/60">Transform overwhelming projects into manageable actions</p>
                  </div>
                </div>
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-medium">Gentle, adaptive timers</span>
                    <p className="text-sm text-white/60">Work at your own pace with flexible focus sessions</p>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BrainCircuit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-medium">AI-powered suggestions</span>
                      <p className="text-sm text-white/60">Smart recommendations tailored to your workflow</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="space-y-6 w-full max-w-md relative z-10">
              
              {/* Before State - Overwhelm */}
              <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <img src={adhdOverwhelm} alt="ADHD Overwhelm" className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Before TinySteps</h3>
                    <p className="text-sm text-white/60">Scattered thoughts, overwhelming tasks, endless distractions</p>
                  </div>
                </div>
              </Card>

              {/* Transformation Arrow */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* After State - Focused */}
              <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                <div className="flex items-center gap-4">
                  <img src={adhdFocused} alt="ADHD Focused" className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">With TinySteps</h3>
                    <p className="text-sm text-white/60">Clear focus, manageable steps, productive flow</p>
                  </div>
                </div>
              </Card>

              {/* Stats Visual */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-center space-y-2">
                  <div className="text-sm text-white/60">Your progress today</div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full transition-all duration-500"></div>
                  </div>
                  <div className="text-xs text-white/60">3 of 4 tasks completed</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};