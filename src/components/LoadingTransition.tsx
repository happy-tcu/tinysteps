import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
}

export function LoadingTransition({ 
  isLoading, 
  children, 
  message = "Loading...",
  className 
}: LoadingTransitionProps) {
  if (isLoading) {
    return (
      <div className={cn(
        "min-h-screen bg-gradient-background flex items-center justify-center",
        className
      )}>
        <div className="text-center space-y-4 animate-fade-in">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}