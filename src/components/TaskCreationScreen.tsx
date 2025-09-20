import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Timer, Target, Lightbulb, Mic, Keyboard, Brain, Sparkles, Zap } from "lucide-react";
import { VoiceRecording } from "./VoiceRecording";
import { useAppData } from "@/hooks/useAppData";
import AITaskSuggestions from "./AITaskSuggestions";
import AITaskBreakdown from "./AITaskBreakdown";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TaskCreationScreenProps {
  onBack: () => void;
  onCreateTask: (task: string, duration: number) => void;
}

export const TaskCreationScreen = ({ onBack, onCreateTask }: TaskCreationScreenProps) => {
  const { appData } = useAppData();
  const [task, setTask] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(appData.settings.defaultFocusTime);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [inputMode, setInputMode] = useState<'type' | 'voice'>('type');
  const [showAiBreakdown, setShowAiBreakdown] = useState(false);
  const [aiSettings] = useLocalStorage('aiSettings', {
    openaiApiKey: '',
    enableAiSuggestions: true,
    enableAiBreakdown: true,
    enableAiCoaching: true,
  });
  
  const durations = [
    { value: 10, label: "10 min", description: "Quick task" },
    { value: 15, label: "15 min", description: "Short focus" },
    { value: 25, label: "25 min", description: "Standard" },
    { value: 45, label: "45 min", description: "Deep work" }
  ];

  // Update task when voice transcript changes
  useEffect(() => {
    if (voiceTranscript && inputMode === 'voice') {
      setTask(voiceTranscript);
    }
  }, [voiceTranscript, inputMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTask = inputMode === 'voice' ? voiceTranscript : task;
    if (finalTask.trim()) {
      onCreateTask(finalTask.trim(), selectedDuration);
    }
  };

  const handleAiTaskSelect = (title: string, duration: number) => {
    onCreateTask(title, duration);
  };

  const handleBreakdownStepSelect = (step: string, duration: number) => {
    setTask(step);
    setSelectedDuration(duration);
    setShowAiBreakdown(false);
  };

  const currentTask = inputMode === 'voice' ? voiceTranscript : task;

  const suggestions = [
    "Read 5 pages of my book",
    "Write one paragraph",
    "Organize my desk",
    "Reply to 3 emails",
    "Review meeting notes"
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Create Your Task</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          
          {/* Main Task Creation Form */}
          <div className="space-y-6">
            <Card className="p-8 shadow-soft bg-card/80 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Task Input with Tabs for Voice/Text */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-6 h-6 text-primary" />
                    <label className="text-lg font-semibold text-foreground">
                      What's your next tiny step?
                    </label>
                  </div>
                  
                  <Tabs value={inputMode} onValueChange={(value) => setInputMode(value as 'type' | 'voice')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="type" className="flex items-center gap-2">
                        <Keyboard className="w-4 h-4" />
                        Type
                      </TabsTrigger>
                      <TabsTrigger value="voice" className="flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        Voice
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="type" className="space-y-3">
                      <Input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="e.g., Read one chapter of my book"
                        className="h-14 text-lg border-2 border-border focus:border-primary transition-smooth"
                        autoFocus
                      />
                    </TabsContent>
                    
                    <TabsContent value="voice" className="space-y-3">
                      <VoiceRecording 
                        onTranscriptChange={setVoiceTranscript}
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Keep it small and specific. You've got this! 💙
                    </p>
                    
                    {/* AI Breakdown Button */}
                    {aiSettings.enableAiBreakdown && aiSettings.openaiApiKey && currentTask.trim() && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAiBreakdown(!showAiBreakdown)}
                        className="gap-2"
                      >
                        <Brain className="w-4 h-4" />
                        {showAiBreakdown ? "Hide" : "AI Breakdown"}
                      </Button>
                    )}
                  </div>
                </div>

                {/* AI Task Breakdown */}
                {showAiBreakdown && currentTask.trim() && aiSettings.enableAiBreakdown && aiSettings.openaiApiKey && (
                  <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                    <AITaskBreakdown
                      task={currentTask}
                      duration={selectedDuration}
                      onSelectStep={handleBreakdownStepSelect}
                    />
                  </div>
                )}

                {/* Duration Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-6 h-6 text-primary" />
                    <label className="text-lg font-semibold text-foreground">
                      How long will you focus?
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {durations.map((duration) => (
                      <Button
                        key={duration.value}
                        type="button"
                        variant={selectedDuration === duration.value ? "default" : "outline"}
                        onClick={() => setSelectedDuration(duration.value)}
                        className={`h-16 flex flex-col transition-smooth ${
                          selectedDuration === duration.value 
                            ? "bg-gradient-primary shadow-focus text-white" 
                            : "hover:bg-primary-soft hover:border-primary/40 text-foreground"
                        }`}
                      >
                        <span className="font-bold text-base">{duration.label}</span>
                        <span className="text-xs opacity-80">{duration.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!currentTask.trim()}
                  className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-focus transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Timer className="w-6 h-6 mr-3" />
                  Start Focus Session
                </Button>
              </form>
            </Card>

            {/* Manual Suggestions */}
            <Card className="p-6 shadow-soft bg-card/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Need inspiration?</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setTask(suggestion)}
                    className="text-sm hover:bg-accent-soft hover:text-accent-foreground transition-smooth"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Suggestions Sidebar */}
          <div className="space-y-6">
            {/* AI Task Suggestions */}
            <AITaskSuggestions
              timeAvailable={selectedDuration}
              onSelectTask={handleAiTaskSelect}
            />
            
            {/* Feature Info */}
            <Card className="border-primary/20 bg-gradient-soft">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">AI Features Available</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Smart task suggestions based on your time</li>
                    <li>• Break large tasks into tiny steps</li>
                    <li>• ADHD-friendly focus coaching</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};