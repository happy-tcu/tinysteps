import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface CloudTask {
  id: string;
  title: string;
  description?: string;
  duration: number;
  category?: string;
  priority: string;
  ai_generated: boolean;
  ai_breakdown?: any;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FocusSession {
  id: string;
  task_id?: string;
  task_title: string;
  planned_duration: number;
  actual_duration?: number;
  completed: boolean;
  quality_rating?: number;
  notes?: string;
  ai_feedback?: any;
  started_at: string;
  completed_at?: string;
}

export interface UserStats {
  total_sessions: number;
  total_focus_time: number;
  current_streak: number;
  longest_streak: number;
  total_points: number;
  level: number;
  achievements: any[];
  weekly_goal: number;
  daily_streak_count: number;
  last_session_date?: string;
}

export function useCloudData() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<CloudTask[]>([]);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Load user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserData();
    } else {
      // Clear data when not authenticated
      setTasks([]);
      setSessions([]);
      setUserStats(null);
    }
  }, [isAuthenticated, user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (tasksError) throw tasksError;

      // Load recent sessions
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('focus_sessions')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(50);

      if (sessionsError) throw sessionsError;

      // Load user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }

      setTasks(tasksData || []);
      setSessions(sessionsData || []);
      setUserStats(statsData ? {
        ...statsData,
        achievements: Array.isArray(statsData.achievements) ? statsData.achievements : []
      } : null);
    } catch (error: any) {
      console.error('Error loading user data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<CloudTask, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => [data, ...prev]);
      return data;
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create task. Please try again.",
      });
      return null;
    }
  };

  const createFocusSession = async (sessionData: Omit<FocusSession, 'id' | 'started_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('focus_sessions')
        .insert([{ ...sessionData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setSessions(prev => [data, ...prev]);
      
      // Update user stats
      await updateUserStats({
        total_sessions: (userStats?.total_sessions || 0) + 1,
        total_focus_time: (userStats?.total_focus_time || 0) + (sessionData.actual_duration || sessionData.planned_duration),
        total_points: (userStats?.total_points || 0) + calculatePoints(sessionData.planned_duration),
      });

      return data;
    } catch (error: any) {
      console.error('Error creating focus session:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save focus session. Please try again.",
      });
      return null;
    }
  };

  const updateUserStats = async (updates: Partial<UserStats>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_stats')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setUserStats(data ? {
        ...data,
        achievements: Array.isArray(data.achievements) ? data.achievements : []
      } : null);
    } catch (error: any) {
      console.error('Error updating user stats:', error);
    }
  };

  const calculatePoints = (minutes: number) => {
    return Math.floor(minutes * 2); // 2 points per minute focused
  };

  const getTodaysSessions = () => {
    const today = new Date().toDateString();
    return sessions.filter(session => 
      new Date(session.started_at).toDateString() === today
    );
  };

  const getTodaysStats = () => {
    const todaySessions = getTodaysSessions();
    const sessionsCount = todaySessions.length;
    const minutesFocused = todaySessions.reduce((total, session) => 
      total + (session.actual_duration || session.planned_duration), 0
    );

    return { sessionsCount, minutesFocused };
  };

  return {
    tasks,
    sessions,
    userStats,
    loading,
    createTask,
    createFocusSession,
    updateUserStats,
    getTodaysStats,
    getTodaysSessions,
    isCloudSyncEnabled: isAuthenticated
  };
}