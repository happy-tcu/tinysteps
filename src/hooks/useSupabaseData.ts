import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type FocusSession = Tables<'focus_sessions'>;
type UserStats = Tables<'user_stats'>;
type Task = Tables<'tasks'>;

export const useSupabaseData = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: sessions = [], isLoading: sessionsLoading } = useQuery({
    queryKey: ['focus_sessions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('focus_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FocusSession[];
    },
    enabled: !!user,
  });

  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['user_stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data && user) {
        const newStats = {
          user_id: user.id,
          total_sessions: 0,
          total_focus_time: 0,
          current_streak: 0,
          longest_streak: 0,
          total_points: 0,
          level: 1,
          weekly_goal: 1500,
          achievements: [],
        };
        
        const { data: inserted, error: insertError } = await supabase
          .from('user_stats')
          .insert(newStats)
          .select()
          .single();
        
        if (insertError) throw insertError;
        return inserted as UserStats;
      }
      
      return data as UserStats;
    },
    enabled: !!user,
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Task[];
    },
    enabled: !!user,
  });

  const addSessionMutation = useMutation({
    mutationFn: async (session: TablesInsert<'focus_sessions'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('focus_sessions')
        .insert({ ...session, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['focus_sessions', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user_stats', user?.id] });
    },
  });

  const updateStatsMutation = useMutation({
    mutationFn: async (updates: Partial<UserStats>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('user_stats')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_stats', user?.id] });
    },
  });

  const addCompletedSession = async (
    taskTitle: string,
    duration: number,
    quality?: number
  ) => {
    if (!user) {
      console.error('Cannot save session: User not authenticated');
      throw new Error('User not authenticated');
    }

    const now = new Date().toISOString();
    const session: TablesInsert<'focus_sessions'> = {
      user_id: user.id,
      task_title: taskTitle,
      planned_duration: duration,
      actual_duration: duration,
      completed: true,
      completed_at: now,
      started_at: now,
      quality_rating: quality,
    };

    await addSessionMutation.mutateAsync(session);

    if (userStats) {
      const today = new Date().toDateString();
      const lastSessionDate = userStats.last_session_date 
        ? new Date(userStats.last_session_date).toDateString() 
        : null;

      let newStreak = userStats.current_streak || 0;
      
      if (!lastSessionDate) {
        newStreak = 1;
      } else if (lastSessionDate === today) {
        newStreak = userStats.current_streak || 0;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastSessionDate === yesterday.toDateString()) {
          newStreak = (userStats.current_streak || 0) + 1;
        } else {
          newStreak = 1;
        }
      }

      const newPoints = (userStats.total_points || 0) + Math.round(duration * 1.5);
      const newTotalTime = (userStats.total_focus_time || 0) + duration;
      const newTotalSessions = (userStats.total_sessions || 0) + 1;
      const longestStreak = Math.max(userStats.longest_streak || 0, newStreak);

      const achievements = [...(userStats.achievements as string[] || [])];
      if (newStreak === 3 && !achievements.includes('first-streak')) {
        achievements.push('first-streak');
      }
      if (newStreak === 7 && !achievements.includes('week-warrior')) {
        achievements.push('week-warrior');
      }
      if (newTotalSessions === 10 && !achievements.includes('task-master')) {
        achievements.push('task-master');
      }
      if (newTotalTime >= 180 && !achievements.includes('time-champion')) {
        achievements.push('time-champion');
      }

      await updateStatsMutation.mutateAsync({
        total_sessions: newTotalSessions,
        total_focus_time: newTotalTime,
        current_streak: newStreak,
        longest_streak: longestStreak,
        total_points: newPoints,
        last_session_date: today,
        achievements: achievements as any,
      });
    }
  };

  const getTodaysStats = () => {
    const today = new Date().toDateString();
    const todaysSessions = sessions.filter(
      session => new Date(session.created_at).toDateString() === today
    );
    
    return {
      sessionsToday: todaysSessions.length,
      minutesToday: todaysSessions.reduce((sum, s) => sum + (s.actual_duration || 0), 0),
    };
  };

  const getWeeklyProgress = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toDateString();
      
      const daySessions = sessions.filter(
        session => new Date(session.created_at).toDateString() === dateString
      );
      
      weekData.push({
        day: weekDays[date.getDay()],
        completed: daySessions.length,
        minutes: daySessions.reduce((sum, s) => sum + (s.actual_duration || 0), 0),
        date: dateString,
      });
    }

    return weekData;
  };

  return {
    sessions,
    userStats,
    tasks,
    isLoading: sessionsLoading || statsLoading || tasksLoading,
    addCompletedSession,
    getTodaysStats,
    getWeeklyProgress,
  };
};
