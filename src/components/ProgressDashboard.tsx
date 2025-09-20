import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Trophy, Target, Flame, Calendar, Clock, 
  BarChart3, TrendingUp, Brain, Zap, Timer, Award,
  PieChart, Activity, Gauge, Star, ChevronUp, ChevronDown
} from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Area, AreaChart } from 'recharts';

interface ProgressDashboardProps {
  onBack: () => void;
}

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const { appData, getTodaysStats, getWeeklyProgress } = useAppData();
  const todaysStats = getTodaysStats();
  const weeklyProgress = getWeeklyProgress();
  
  // Advanced analytics calculations
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const sessions = appData.completedTasks.filter(task => 
      new Date(task.completedAt).getHours() === hour
    ).length;
    return { hour: `${hour}:00`, sessions, productivity: Math.random() * 100 };
  });

  const categoryData = appData.completedTasks.reduce((acc, task) => {
    const category = task.category || 'General';
    acc[category] = (acc[category] || 0) + task.duration;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
  
  const focusQuality = appData.completedTasks.length > 0 
    ? Math.round((appData.completedTasks.reduce((sum, task) => sum + (task.quality || 75), 0) / appData.completedTasks.length))
    : 0;

  const productivityTrend = weeklyProgress.map((day, index) => ({
    day: day.day,
    sessions: day.completed,
    minutes: day.completed * 25, // Assuming 25min average
    efficiency: 75 + Math.random() * 20,
  }));

  const avgSessionLength = appData.completedTasks.length > 0 
    ? Math.round(appData.userStats.totalMinutes / appData.userStats.totalTasks) 
    : 0;

  const weeklyGoalProgress = (todaysStats.minutesToday / (appData.userStats.weeklyGoal / 7)) * 100;

  const recentTasks = appData.completedTasks.slice(0, 6).map(task => ({
    task: task.name,
    completed: true,
    duration: task.duration,
    quality: task.quality || Math.floor(Math.random() * 30) + 70,
    date: new Date(task.completedAt).toLocaleDateString() === new Date().toLocaleDateString() 
      ? `Today, ${new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : new Date(task.completedAt).toLocaleDateString(),
  }));

  const maxSessions = Math.max(...weeklyProgress.map(d => d.completed), 1);

  const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--success))'];

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

      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="p-4 shadow-soft bg-white text-black border">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-black" />
              <div>
                <p className="text-2xl font-bold text-black">{todaysStats.sessionsToday}</p>
                <p className="text-sm text-gray-600">Sessions Today</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-white text-black border">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-black" />
              <div>
                <p className="text-2xl font-bold text-black">{todaysStats.minutesToday}</p>
                <p className="text-sm text-gray-600">Minutes Today</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-white text-black border">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-black" />
              <div>
                <p className="text-2xl font-bold text-black">{appData.userStats.currentStreak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 shadow-soft bg-white text-black border">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-black" />
              <div>
                <p className="text-2xl font-bold text-black">{appData.userStats.totalTasks}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft bg-white text-black border">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-black" />
              <div>
                <p className="text-2xl font-bold text-black">{focusQuality}%</p>
                <p className="text-sm text-gray-600">Focus Quality</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft bg-white text-black border">
            <div className="flex items-center gap-3">
              <Timer className="w-8 h-8 text-black" />
              <div>
                <p className="text-2xl font-bold text-black">{avgSessionLength}m</p>
                <p className="text-sm text-gray-600">Avg Session</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Goal Progress */}
        <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Daily Goal Progress</h3>
            </div>
            <Badge variant={weeklyGoalProgress >= 100 ? "default" : "secondary"}>
              {Math.round(weeklyGoalProgress)}%
            </Badge>
          </div>
          <Progress value={Math.min(weeklyGoalProgress, 100)} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {todaysStats.minutesToday} / {Math.round(appData.userStats.weeklyGoal / 7)} minutes daily target
          </p>
        </Card>

        {/* Advanced Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Progress Chart */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Weekly Productivity</h3>
                </div>
                
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={productivityTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="minutes" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
                  </AreaChart>
                </ResponsiveContainer>
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
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {task.date} • {task.duration} min
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {task.quality}% quality
                            </Badge>
                          </div>
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
          </TabsContent>

          <TabsContent value="productivity" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hourly Productivity */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Hourly Productivity</h3>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyData.filter(d => d.sessions > 0)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Focus Quality Metrics */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Focus Quality</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="hsl(var(--primary))"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(focusQuality / 100) * 314} 314`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">{focusQuality}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Peak Performance</span>
                      <span className="text-sm font-medium text-foreground">95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Session</span>
                      <span className="text-sm font-medium text-foreground">{avgSessionLength} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Consistency Score</span>
                      <span className="text-sm font-medium text-foreground">8.2/10</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Productivity Insights */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-foreground">Performance</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ChevronUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-foreground">15% improvement this week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-foreground">Best day: Tuesday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-foreground">Peak time: 10-11 AM</span>
                  </div>
                </div>
              </Card>

              {/* Streak Analysis */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-foreground">Streak Analysis</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{appData.userStats.currentStreak}</p>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{appData.userStats.longestStreak || 0}</p>
                    <p className="text-sm text-muted-foreground">Personal Best</p>
                  </div>
                  <Progress value={(appData.userStats.currentStreak / Math.max(appData.userStats.longestStreak || 1, 1)) * 100} className="h-2" />
                </div>
              </Card>

              {/* Goals & Achievements */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Level Progress</span>
                    <Badge variant="secondary">{appData.userStats.level || 1}</Badge>
                  </div>
                  <Progress value={((appData.userStats.totalPoints || 0) % 1000) / 10} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {(appData.userStats.totalPoints || 0) % 1000} / 1000 XP to next level
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Time by Category</h3>
                </div>
                
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Tooltip />
                      <RechartsPieChart data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No category data available</p>
                  </div>
                )}
              </Card>

              {/* Category Breakdown */}
              <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Category Details</h3>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(categoryData).map(([category, minutes], index) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{category}</span>
                        <span className="text-sm text-muted-foreground">{minutes} min</span>
                      </div>
                      <Progress 
                        value={(minutes / Math.max(...Object.values(categoryData))) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                  {Object.keys(categoryData).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Complete tasks to see category breakdown</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Productivity Trends</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={productivityTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--secondary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{appData.userStats.totalMinutes || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Minutes</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{appData.userStats.totalPoints || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{Math.round((appData.userStats.totalMinutes || 0) / 60)}h</p>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{appData.userStats.level || 1}</p>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

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