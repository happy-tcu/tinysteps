import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Target, Flame, Calendar, Clock } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";

interface ProgressDashboardProps {
  onBack: () => void;
}

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const { appData, getTodaysStats, getWeeklyProgress } = useAppData();
  const todaysStats = getTodaysStats();
  const weeklyProgress = getWeeklyProgress();
  
  const recentTasks = appData.completedTasks.slice(0, 6).map(task => ({
    task: task.name,
    completed: true,
    duration: task.duration,
    date: new Date(task.completedAt).toLocaleDateString() === new Date().toLocaleDateString() 
      ? `Today, ${new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : new Date(task.completedAt).toLocaleDateString(),
  }));

  const maxSessions = Math.max(...weeklyProgress.map(d => d.completed), 1);

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 shadow-soft bg-gradient-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">{todaysStats.sessionsToday}</p>
                <p className="text-sm opacity-90">Sessions Today</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-gradient-success text-secondary-foreground">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">{todaysStats.minutesToday}</p>
                <p className="text-sm opacity-90">Minutes Focused</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-gradient-to-r from-accent to-warning text-accent-foreground">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">{appData.userStats.currentStreak}</p>
                <p className="text-sm opacity-90">Day Streak</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-card border-2 border-primary/20">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{appData.userStats.totalTasks}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="p-6 shadow-soft bg-gradient-soft border-primary/20">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {appData.userStats.currentStreak > 0 ? "🎉 You're doing amazing!" : "🌟 Ready to start your journey?"}
            </h3>
            <p className="text-muted-foreground">
              {appData.userStats.currentStreak > 0 
                ? `You've maintained a ${appData.userStats.currentStreak}-day streak and completed ${todaysStats.sessionsToday} focus sessions today. Every tiny step counts toward your bigger goals!`
                : "Start your first focus session today and begin building a streak that will transform your productivity!"
              }
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Weekly Progress Chart */}
          <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">This Week's Progress</h3>
            </div>
            
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-8 text-sm text-muted-foreground font-medium">
                    {day.day}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${(day.completed / maxSessions) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm text-foreground font-semibold">
                    {day.completed}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Tasks */}
          <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent Tasks</h3>
            </div>
            
            <div className="space-y-4">
              {recentTasks.length > 0 ? recentTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg border bg-secondary-soft border-secondary/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {task.task}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.date} • {task.duration} min
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                      ✓
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed tasks yet.</p>
                  <p className="text-sm text-muted-foreground">Start your first focus session!</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appData.userStats.achievements.includes('first-streak') && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent-soft">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">Fire Starter</p>
                  <p className="text-xs text-muted-foreground">3-day streak achieved</p>
                </div>
              </div>
            )}
            
            {appData.userStats.achievements.includes('task-master') && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-soft">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">Task Master</p>
                  <p className="text-xs text-muted-foreground">10 tasks completed</p>
                </div>
              </div>
            )}
            
            {appData.userStats.achievements.includes('time-champion') && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary-soft">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">Time Champion</p>
                  <p className="text-xs text-muted-foreground">3+ hours focused</p>
                </div>
              </div>
            )}
            
            {appData.userStats.achievements.length === 0 && (
              <div className="col-span-full text-center py-6">
                <p className="text-muted-foreground">Complete tasks to unlock achievements!</p>
                <p className="text-sm text-muted-foreground">🏆 Your first badge is waiting</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};