import { useLocalStorage } from './useLocalStorage';

export interface CompletedTask {
  id: string;
  name: string;
  duration: number;
  completedAt: Date;
  date: string;
  category?: string;
  quality?: number;
}

export interface UserStats {
  totalTasks: number;
  totalMinutes: number;
  currentStreak: number;
  lastCompletionDate: string | null;
  points: number;
  achievements: string[];
  longestStreak?: number;
  totalPoints?: number;
  level?: number;
  weeklyGoal?: number;
}

export interface AppData {
  completedTasks: CompletedTask[];
  userStats: UserStats;
  settings: {
    defaultFocusTime: number;
    defaultBreakTime: number;
    soundEnabled: boolean;
    voiceEnabled: boolean;
  };
}

const defaultAppData: AppData = {
  completedTasks: [],
  userStats: {
    totalTasks: 0,
    totalMinutes: 0,
    currentStreak: 0,
    lastCompletionDate: null,
    points: 0,
    achievements: [],
    longestStreak: 0,
    totalPoints: 0,
    level: 1,
    weeklyGoal: 1500,
  },
  settings: {
    defaultFocusTime: 25,
    defaultBreakTime: 5,
    soundEnabled: true,
    voiceEnabled: true,
  },
};

export const useAppData = () => {
  const [appData, setAppData] = useLocalStorage<AppData>('tinysteps-data', defaultAppData);

  const addCompletedTask = (task: Omit<CompletedTask, 'id' | 'completedAt' | 'date'>) => {
    const now = new Date();
    const newTask: CompletedTask = {
      ...task,
      id: Date.now().toString(),
      completedAt: now,
      date: now.toLocaleDateString(),
    };

    setAppData(prev => {
      const updatedStats = { ...prev.userStats };
      updatedStats.totalTasks += 1;
      updatedStats.totalMinutes += task.duration;
      updatedStats.points += Math.round(task.duration * 1.5); // 1.5 points per minute

      // Update streak
      const today = new Date().toDateString();
      const lastCompletion = prev.userStats.lastCompletionDate;
      
      if (!lastCompletion) {
        updatedStats.currentStreak = 1;
      } else {
        const lastDate = new Date(lastCompletion).toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === today) {
          // Already completed today, keep streak
        } else if (lastDate === yesterday.toDateString()) {
          updatedStats.currentStreak += 1;
        } else {
          updatedStats.currentStreak = 1; // Reset streak
        }
      }
      
      updatedStats.lastCompletionDate = today;

      // Check for new achievements
      const newAchievements = [...updatedStats.achievements];
      
      if (updatedStats.currentStreak === 3 && !newAchievements.includes('first-streak')) {
        newAchievements.push('first-streak');
      }
      if (updatedStats.currentStreak === 7 && !newAchievements.includes('week-warrior')) {
        newAchievements.push('week-warrior');
      }
      if (updatedStats.totalTasks === 10 && !newAchievements.includes('task-master')) {
        newAchievements.push('task-master');
      }
      if (updatedStats.totalMinutes >= 180 && !newAchievements.includes('time-champion')) {
        newAchievements.push('time-champion');
      }

      updatedStats.achievements = newAchievements;

      return {
        ...prev,
        completedTasks: [newTask, ...prev.completedTasks],
        userStats: updatedStats,
      };
    });

    return newTask;
  };

  const updateSettings = (newSettings: Partial<AppData['settings']>) => {
    setAppData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
  };

  const getTodaysStats = () => {
    const today = new Date().toDateString();
    const todaysTasks = appData.completedTasks.filter(
      task => new Date(task.completedAt).toDateString() === today
    );
    
    return {
      sessionsToday: todaysTasks.length,
      minutesToday: todaysTasks.reduce((sum, task) => sum + task.duration, 0),
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
      
      const dayTasks = appData.completedTasks.filter(
        task => new Date(task.completedAt).toDateString() === dateString
      );
      
      weekData.push({
        day: weekDays[date.getDay()],
        completed: dayTasks.length,
        date: dateString,
      });
    }

    return weekData;
  };

  return {
    appData,
    addCompletedTask,
    updateSettings,
    getTodaysStats,
    getWeeklyProgress,
  };
};
