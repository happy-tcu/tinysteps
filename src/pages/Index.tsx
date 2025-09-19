import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TaskCreationScreen } from "@/components/TaskCreationScreen";
import { FocusTimer } from "@/components/FocusTimer";
import { BreakScreen } from "@/components/BreakScreen";
import { ProgressDashboard } from "@/components/ProgressDashboard";

type AppState = 'welcome' | 'create-task' | 'focus-timer' | 'break' | 'progress';

interface Task {
  name: string;
  duration: number;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleStartFocus = () => {
    setCurrentState('create-task');
  };

  const handleViewProgress = () => {
    setCurrentState('progress');
  };

  const handleCreateTask = (taskName: string, duration: number) => {
    setCurrentTask({ name: taskName, duration });
    setCurrentState('focus-timer');
  };

  const handleFocusComplete = () => {
    setCurrentState('break');
  };

  const handleBreakComplete = () => {
    setCurrentState('welcome');
  };

  const handleStartNewTask = () => {
    setCurrentTask(null);
    setCurrentState('create-task');
  };

  const handleBackToWelcome = () => {
    setCurrentTask(null);
    setCurrentState('welcome');
  };

  return (
    <div className="min-h-screen">
      {currentState === 'welcome' && (
        <WelcomeScreen 
          onStartFocus={handleStartFocus}
          onViewProgress={handleViewProgress}
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
    </div>
  );
};

export default Index;
