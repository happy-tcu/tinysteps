import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Clock, Zap, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
interface TaskSuggestion {
  title: string;
  category: string;
  estimatedMinutes: number;
  energyLevel: string;
  whyGood: string;
}
interface AITaskSuggestionsProps {
  timeAvailable: number;
  onSelectTask: (title: string, duration: number) => void;
  recentTasks?: string[];
}
const AITaskSuggestions: React.FC<AITaskSuggestionsProps> = ({
  timeAvailable,
  onSelectTask,
  recentTasks = []
}) => {
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const generateSuggestions = async (mood = 'neutral') => {
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('ai-task-suggestions', {
        body: {
          timeAvailable,
          mood,
          recentTasks,
          context: 'Focus session'
        }
      });
      if (error) throw error;
      setSuggestions(data.suggestions || []);
    } catch (error: any) {
      console.error('Error generating suggestions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate task suggestions. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    generateSuggestions();
  }, [timeAvailable]);
  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-secondary text-secondary-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'organization':
        return '🗂️';
      case 'creative':
        return '🎨';
      case 'learning':
        return '📚';
      case 'self-care':
        return '💆';
      case 'administrative':
        return '📋';
      default:
        return '✨';
    }
  };
  return <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Task Suggestions
          </div>
          <Button variant="ghost" size="sm" onClick={() => generateSuggestions()} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription>
          Smart task suggestions based on your available time ({timeAvailable} minutes)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && suggestions.length === 0 ? <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">Generating suggestions...</p>
            </div>
          </div> : <div className="space-y-3">
            {suggestions.map((suggestion, index) => <Card key={index} className="p-4 hover:shadow-md transition-all cursor-pointer border-l-4 border-l-primary/20 hover:border-l-primary" onClick={() => onSelectTask(suggestion.title, suggestion.estimatedMinutes)}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(suggestion.category)}</span>
                      <h4 className="font-medium">{suggestion.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className={getEnergyColor(suggestion.energyLevel)}>
                        <Zap className="w-3 h-3 mr-1" />
                        {suggestion.energyLevel}
                      </Badge>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {suggestion.estimatedMinutes}m
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{suggestion.whyGood}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                    <span className="text-xs text-primary">Click to start →</span>
                  </div>
                </div>
              </Card>)}

            {suggestions.length === 0 && !loading && <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No suggestions available. Try refreshing!</p>
              </div>}
          </div>}

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Suggestions are personalized for ADHD-friendly productivity
          </p>
        </div>
      </CardContent>
    </Card>;
};
export default AITaskSuggestions;