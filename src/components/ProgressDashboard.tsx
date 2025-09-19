import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Target, Flame, Calendar, Clock } from "lucide-react";

interface ProgressDashboardProps {
  onBack: () => void;
}

// Mock data for demo - in real app this would come from state/storage
const mockData = {
  todaysSessions: 3,
  todaysMinutes: 75,
  currentStreak: 5,
  totalTasks: 28,
  weeklyProgress: [
    { day: 'Mon', completed: 4 },
    { day: 'Tue', completed: 2 },
    { day: 'Wed', completed: 6 },
    { day: 'Thu', completed: 3 },
    { day: 'Fri', completed: 5 },
    { day: 'Sat', completed: 1 },
    { day: 'Sun', completed: 3 },
  ],
  recentTasks: [
    { task: "Read chapter 3", completed: true, duration: 25, date: "Today, 2:30 PM" },
    { task: "Organize email inbox", completed: true, duration: 15, date: "Today, 11:45 AM" },
    { task: "Write meeting notes", completed: true, duration: 20, date: "Yesterday, 4:15 PM" },
    { task: "Review project plan", completed: false, duration: 25, date: "Yesterday, 9:30 AM" },
  ]
};

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const maxSessions = Math.max(...mockData.weeklyProgress.map(d => d.completed));

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
                <p className="text-2xl font-bold">{mockData.todaysSessions}</p>
                <p className="text-sm opacity-90">Sessions Today</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-gradient-success text-secondary-foreground">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">{mockData.todaysMinutes}</p>
                <p className="text-sm opacity-90">Minutes Focused</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-gradient-to-r from-accent to-warning text-accent-foreground">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8" />
              <div>
                <p className="text-2xl font-bold">{mockData.currentStreak}</p>
                <p className="text-sm opacity-90">Day Streak</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-card border-2 border-primary/20">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{mockData.totalTasks}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="p-6 shadow-soft bg-gradient-soft border-primary/20">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🎉 You're doing amazing!
            </h3>
            <p className="text-muted-foreground">
              You've maintained a {mockData.currentStreak}-day streak and completed {mockData.todaysSessions} focus sessions today. 
              Every tiny step counts toward your bigger goals!
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
              {mockData.weeklyProgress.map((day, index) => (
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
              {mockData.recentTasks.map((task, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border transition-smooth ${
                    task.completed 
                      ? "bg-secondary-soft border-secondary/30" 
                      : "bg-muted/30 border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`font-medium ${
                        task.completed ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {task.task}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.date} • {task.duration} min
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      task.completed 
                        ? "bg-secondary text-secondary-foreground" 
                        : "bg-muted"
                    }`}>
                      {task.completed && "✓"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent-soft">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Fire Starter</p>
                <p className="text-xs text-muted-foreground">5-day streak achieved</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-soft">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Time Master</p>
                <p className="text-xs text-muted-foreground">Completed 25 sessions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary-soft">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-sm text-foreground">Focus Hero</p>
                <p className="text-xs text-muted-foreground">3 hours focused today</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};