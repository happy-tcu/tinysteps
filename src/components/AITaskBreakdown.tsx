import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Clock, Lightbulb, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TaskStep {
  step: string;
  estimatedMinutes: number;
  focusTips: string[];
  priority: number;
}

interface TaskBreakdown {
  breakdown: TaskStep[];
  overallStrategy: string;
  adhdTips: string[];
  totalEstimatedTime: number;
}

interface AITaskBreakdownProps {
  task: string;
  duration: number;
  onSelectStep: (step: string, duration: number) => void;
}

const AITaskBreakdown: React.FC<AITaskBreakdownProps> = ({ task, duration, onSelectStep }) => {
  const [breakdown, setBreakdown] = useState<TaskBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateBreakdown = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-task-breakdown', {
        body: {
          task,
          duration,
          context: 'ADHD-friendly focus session'
        }
      });

      if (error) throw error;

      setBreakdown(data.breakdown);
      toast({
        title: "Task broken down!",
        description: "AI has created manageable steps for your task.",
      });
    } catch (error: any) {
      console.error('Error generating breakdown:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate task breakdown. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!breakdown) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Task Breakdown
          </CardTitle>
          <CardDescription>
            Let AI break "{task}" into manageable steps for better focus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={generateBreakdown} 
            disabled={loading}
            className="w-full bg-gradient-primary"
          >
            {loading ? 'Analyzing...' : 'Break Down This Task'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Task Breakdown
          </CardTitle>
          <CardDescription>
            {breakdown.overallStrategy}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {breakdown.breakdown.map((step, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onSelectStep(step.step, step.estimatedMinutes)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Step {step.priority}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {step.estimatedMinutes} min
                      </div>
                    </div>
                    <p className="font-medium mb-2">{step.step}</p>
                    {step.focusTips.length > 0 && (
                      <div className="space-y-1">
                        {step.focusTips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-accent-soft border-accent/20">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-accent-foreground mb-2">ADHD Focus Tips</h4>
              <ul className="space-y-1 text-sm">
                {breakdown.adhdTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-muted-foreground">
              Total estimated time: {breakdown.totalEstimatedTime} minutes
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setBreakdown(null)}
            >
              Generate New Breakdown
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITaskBreakdown;