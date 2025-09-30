import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, Trophy, Target, Flame, Calendar, Clock, 
  BarChart3, Brain, Award, Zap, Activity
} from "lucide-react";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ProgressDashboardProps {
  onBack: () => void;
}

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const { sessions, userStats, isLoading, getTodaysStats, getWeeklyProgress } = useSupabaseData();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-6 bg-gradient-to-br from-background to-muted">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
          <div className="w-16"></div>
        </div>
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="p-4">
                <Skeleton className="h-20 w-full" />
              </Card>
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  const todaysStats = getTodaysStats();
  const weeklyProgress = getWeeklyProgress();
  
  const avgSessionLength = userStats?.total_sessions && userStats.total_sessions > 0
    ? Math.round((userStats.total_focus_time || 0) / userStats.total_sessions) 
    : 0;

  const weeklyGoal = userStats?.weekly_goal || 1500;
  const dailyTarget = Math.round(weeklyGoal / 7);
  const weeklyGoalProgress = (todaysStats.minutesToday / dailyTarget) * 100;

  const recentSessions = sessions.slice(0, 6).map(session => ({
    task: session.task_title,
    completed: session.completed,
    duration: session.actual_duration || session.planned_duration,
    quality: session.quality_rating || null,
    date: new Date(session.created_at).toLocaleDateString() === new Date().toLocaleDateString() 
      ? `Today, ${new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      : new Date(session.created_at).toLocaleDateString(),
  }));

  // Calculate actual focus quality from session ratings
  const sessionsWithQuality = sessions.filter(s => s.quality_rating !== null);
  const focusQuality = sessionsWithQuality.length > 0
    ? Math.round(sessionsWithQuality.reduce((sum, s) => sum + (s.quality_rating || 0), 0) / sessionsWithQuality.length)
    : 0;

  // Hourly distribution - real data only
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const sessionsAtHour = sessions.filter(s => 
      new Date(s.created_at).getHours() === hour
    ).length;
    return { hour: `${hour}:00`, sessions: sessionsAtHour };
  }).filter(d => d.sessions > 0);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="hover:bg-muted/50"
          data-testid="button-back"
          aria-label="Go back to main screen"
        >
          <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
          Back
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Your Progress</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4 shadow-soft bg-card border" data-testid="card-sessions-today">
            <div className="flex items-center gap-2 md:gap-3">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xl md:text-2xl font-bold text-foreground truncate" data-testid="text-sessions-today">
                  {todaysStats.sessionsToday}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Sessions Today</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 shadow-soft bg-card border" data-testid="card-minutes-today">
            <div className="flex items-center gap-2 md:gap-3">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xl md:text-2xl font-bold text-foreground truncate" data-testid="text-minutes-today">
                  {todaysStats.minutesToday}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Minutes Today</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 shadow-soft bg-card border" data-testid="card-streak">
            <div className="flex items-center gap-2 md:gap-3">
              <Flame className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xl md:text-2xl font-bold text-foreground truncate" data-testid="text-streak">
                  {userStats?.current_streak || 0}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Day Streak</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-3 md:p-4 shadow-soft bg-card border" data-testid="card-total-sessions">
            <div className="flex items-center gap-2 md:gap-3">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-xl md:text-2xl font-bold text-foreground truncate" data-testid="text-total-sessions">
                  {userStats?.total_sessions || 0}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">Total Sessions</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Daily Goal Progress */}
        <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm" data-testid="card-daily-goal">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" aria-hidden="true" />
              <h3 className="text-base md:text-lg font-semibold text-foreground">Daily Goal Progress</h3>
            </div>
            <Badge variant={weeklyGoalProgress >= 100 ? "default" : "secondary"}>
              {Math.round(weeklyGoalProgress)}%
            </Badge>
          </div>
          <Progress value={Math.min(weeklyGoalProgress, 100)} className="h-3" aria-label={`Daily progress: ${Math.round(weeklyGoalProgress)}%`} />
          <p className="text-sm text-muted-foreground mt-2">
            {todaysStats.minutesToday} / {dailyTarget} minutes daily target
          </p>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="productivity">Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="achievements" className="hidden md:block">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Weekly Progress Chart */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Weekly Activity</h3>
                </div>
                
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Recent Sessions */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Recent Sessions</h3>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  {recentSessions.length > 0 ? recentSessions.map((session, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg border bg-secondary/5 border-secondary/30"
                      data-testid={`session-recent-${index}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base truncate">
                            {session.task}
                          </p>
                          <div className="flex items-center gap-2 md:gap-4 mt-1 flex-wrap">
                            <p className="text-xs text-muted-foreground">
                              {session.date} • {session.duration} min
                            </p>
                            {session.quality !== null && (
                              <Badge variant="outline" className="text-xs">
                                {session.quality}% quality
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                          ✓
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No sessions yet.</p>
                      <p className="text-sm text-muted-foreground">Start your first focus session!</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productivity" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Hourly Activity */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Activity by Hour</h3>
                </div>
                
                {hourlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center">
                    <p className="text-muted-foreground">No activity data yet</p>
                  </div>
                )}
              </Card>

              {/* Stats Summary */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Brain className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Session Stats</h3>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {focusQuality > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Avg Focus Quality</span>
                        <span className="text-lg font-medium text-foreground">{focusQuality}%</span>
                      </div>
                      <Progress value={focusQuality} className="h-2" />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg Session Length</span>
                      <span className="text-sm font-medium text-foreground">{avgSessionLength} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Focus Time</span>
                      <span className="text-sm font-medium text-foreground">{Math.round((userStats?.total_focus_time || 0) / 60)}h {(userStats?.total_focus_time || 0) % 60}m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Points</span>
                      <span className="text-sm font-medium text-foreground">{userStats?.total_points || 0}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {/* Streak Analysis */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-5 h-5 text-orange-500" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Streak</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{userStats?.current_streak || 0}</p>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg md:text-xl font-semibold text-foreground">{userStats?.longest_streak || 0}</p>
                    <p className="text-sm text-muted-foreground">Personal Best</p>
                  </div>
                  <Progress 
                    value={((userStats?.current_streak || 0) / Math.max(userStats?.longest_streak || 1, 1)) * 100} 
                    className="h-2" 
                  />
                </div>
              </Card>

              {/* Level Progress */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">Level</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Current Level</span>
                    <Badge variant="secondary">{userStats?.level || 1}</Badge>
                  </div>
                  <Progress 
                    value={((userStats?.total_points || 0) % 1000) / 10} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground">
                    {(userStats?.total_points || 0) % 1000} / 1000 XP to next level
                  </p>
                </div>
              </Card>

              {/* Weekly Summary */}
              <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-blue-500" aria-hidden="true" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground">This Week</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sessions</span>
                    <span className="text-sm font-medium text-foreground">
                      {weeklyProgress.reduce((sum, day) => sum + day.completed, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Minutes</span>
                    <span className="text-sm font-medium text-foreground">
                      {weeklyProgress.reduce((sum, day) => sum + day.minutes, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Best Day</span>
                    <span className="text-sm font-medium text-foreground">
                      {weeklyProgress.reduce((best, day) => day.minutes > best.minutes ? day : best, weeklyProgress[0])?.day || 'N/A'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="p-4 md:p-6 shadow-soft bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <Trophy className="w-5 h-5 text-accent" aria-hidden="true" />
                <h3 className="text-base md:text-lg font-semibold text-foreground">Achievements</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(userStats?.achievements as string[] || []).includes('first-streak') && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Fire Starter</p>
                      <p className="text-xs text-muted-foreground">3-day streak achieved</p>
                    </div>
                  </div>
                )}
                
                {(userStats?.achievements as string[] || []).includes('task-master') && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Task Master</p>
                      <p className="text-xs text-muted-foreground">10 tasks completed</p>
                    </div>
                  </div>
                )}
                
                {(userStats?.achievements as string[] || []).includes('week-warrior') && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
                    <span className="text-2xl">⚔️</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Week Warrior</p>
                      <p className="text-xs text-muted-foreground">7-day streak achieved</p>
                    </div>
                  </div>
                )}
                
                {(userStats?.achievements as string[] || []).includes('time-champion') && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Time Champion</p>
                      <p className="text-xs text-muted-foreground">180+ minutes focused</p>
                    </div>
                  </div>
                )}
                
                {(userStats?.achievements as string[] || []).length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">Complete focus sessions to unlock achievements!</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
