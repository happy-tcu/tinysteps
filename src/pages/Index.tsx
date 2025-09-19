import { useState, useEffect, useCallback } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TaskCreationScreen } from "@/components/TaskCreationScreen";
import { FocusTimer } from "@/components/FocusTimer";
import { BreakScreen } from "@/components/BreakScreen";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { SettingsScreen } from "@/components/SettingsScreen";
import AuthGuard from "@/components/AuthGuard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingTransition } from "@/components/LoadingTransition";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type AppState = 'welcome' | 'create-task' | 'focus-timer' | 'break' | 'progress' | 'settings';

interface Task {
  name: string;
  duration: number;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [appPreferences, setAppPreferences] = useLocalStorage('appPreferences', {
    reducedMotion: false,
    highContrast: false,
    hasCompletedOnboarding: false
  });

  // Smooth state transitions with loading
  const transitionToState = useCallback(async (newState: AppState, newTask?: Task | null) => {
    if (appPreferences.reducedMotion) {
      setCurrentState(newState);
      if (newTask !== undefined) setCurrentTask(newTask);
      return;
    }

    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    setCurrentState(newState);
    if (newTask !== undefined) setCurrentTask(newTask);
    setIsTransitioning(false);
  }, [appPreferences.reducedMotion]);

  const handleStartFocus = useCallback(() => {
    transitionToState('create-task');
  }, [transitionToState]);

  const handleViewProgress = useCallback(() => {
    transitionToState('progress');
  }, [transitionToState]);

  const handleOpenSettings = useCallback(() => {
    transitionToState('settings');
  }, [transitionToState]);

  const handleCreateTask = useCallback((taskName: string, duration: number) => {
    transitionToState('focus-timer', { name: taskName, duration });
  }, [transitionToState]);

  const handleFocusComplete = useCallback(() => {
    transitionToState('break');
  }, [transitionToState]);

  const handleBreakComplete = useCallback(() => {
    transitionToState('welcome');
  }, [transitionToState]);

  const handleStartNewTask = useCallback(() => {
    transitionToState('create-task', null);
  }, [transitionToState]);

  const handleBackToWelcome = useCallback(() => {
    transitionToState('welcome', null);
  }, [transitionToState]);

  const handleCompleteOnboarding = useCallback(() => {
    setAppPreferences(prev => ({ ...prev, hasCompletedOnboarding: true }));
  }, [setAppPreferences]);

  // Persist app state
  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    const savedTask = localStorage.getItem('currentTask');
    
    if (savedState && savedState !== 'focus-timer') {
      setCurrentState(savedState as AppState);
    }
    if (savedTask) {
      try {
        setCurrentTask(JSON.parse(savedTask));
      } catch (e) {
        console.warn('Failed to parse saved task:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appState', currentState);
    if (currentTask) {
      localStorage.setItem('currentTask', JSON.stringify(currentTask));
    } else {
      localStorage.removeItem('currentTask');
    }
  }, [currentState, currentTask]);

  return (
    <ErrorBoundary>
      <AuthGuard>
        <LoadingTransition isLoading={isTransitioning} message="Transitioning...">
          <div className="min-h-screen bg-gradient-background">
            {/* Add semantic landmarks for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50">
              Skip to main content
            </a>
            
            <main id="main-content" role="main" aria-live="polite">
              {currentState === 'welcome' && (
                <WelcomeScreen 
                  onStartFocus={handleStartFocus}
                  onViewProgress={handleViewProgress}
                  onOpenSettings={handleOpenSettings}
                  hasCompletedOnboarding={appPreferences.hasCompletedOnboarding}
                  onCompleteOnboarding={handleCompleteOnboarding}
                />
              )}
              
              {currentState === 'create-task' && (
                <TaskCreationScreen 
                  onBack={handleBackToWelcome}
                  onCreateTask={handleCreateTask}
                />
              )}
              
              {currentState === 'focus-timer' && currentTask && (
                <FocusTimer 
                  task={currentTask.name}
                  duration={currentTask.duration}
                  onComplete={handleFocusComplete}
                  onBack={handleBackToWelcome}
                />
              )}
              
              {currentState === 'break' && (
                <BreakScreen 
                  onBreakComplete={handleBreakComplete}
                  onStartNewTask={handleStartNewTask}
                />
              )}
              
              {currentState === 'progress' && (
                <ProgressDashboard 
                  onBack={handleBackToWelcome}
                />
              )}
              
              {currentState === 'settings' && (
                <SettingsScreen 
                  onBack={handleBackToWelcome}
                  preferences={appPreferences}
                  onUpdatePreferences={setAppPreferences}
                />
              )}
            </main>
          </div>
        </LoadingTransition>
      </AuthGuard>
    </ErrorBoundary>
  );
};

export default Index;
