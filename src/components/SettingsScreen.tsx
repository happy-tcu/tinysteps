import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, ArrowLeft, Volume2, VolumeX, Timer, Coffee, Brain, Key, Sparkles, Shield } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

interface AppPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  hasCompletedOnboarding: boolean;
}

interface SettingsScreenProps {
  onBack: () => void;
  preferences?: AppPreferences;
  onUpdatePreferences?: (preferences: AppPreferences | ((prev: AppPreferences) => AppPreferences)) => void;
}

export const SettingsScreen = ({ onBack, preferences, onUpdatePreferences }: SettingsScreenProps) => {
  const { appData, updateSettings } = useAppData();
  const [focusTime, setFocusTime] = useState(appData.settings.defaultFocusTime);
  const [breakTime, setBreakTime] = useState(appData.settings.defaultBreakTime);
  const [soundEnabled, setSoundEnabled] = useState(appData.settings.soundEnabled);
  const [voiceEnabled, setVoiceEnabled] = useState(appData.settings.voiceEnabled);
  
  // AI Settings
  const [aiSettings, setAiSettings] = useLocalStorage('aiSettings', {
    openaiApiKey: '',
    enableAiSuggestions: true,
    enableAiBreakdown: true,
    enableAiCoaching: true,
    aiPersonality: 'encouraging' // encouraging, focused, gentle
  });
  
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    updateSettings({
      defaultFocusTime: focusTime,
      defaultBreakTime: breakTime,
      soundEnabled,
      voiceEnabled,
    });
    
    // Update accessibility preferences if available
    if (preferences && onUpdatePreferences) {
      onUpdatePreferences({
        ...preferences,
        reducedMotion: preferences.reducedMotion,
        highContrast: preferences.highContrast
      });
    }
    
    toast.success("Settings saved successfully!");
  };

  const handleAiSettingsUpdate = (key: string, value: any) => {
    setAiSettings(prev => ({ ...prev, [key]: value }));
  };

  const testApiKey = async () => {
    if (!aiSettings.openaiApiKey) {
      toast.error("Please enter your OpenAI API key first");
      return;
    }
    
    try {
      // Simple test call to verify the API key works
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${aiSettings.openaiApiKey}`,
        }
      });
      
      if (response.ok) {
        toast.success("API key is valid! ✨");
      } else {
        toast.error("Invalid API key. Please check and try again.");
      }
    } catch (error) {
      toast.error("Failed to validate API key. Check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="space-y-8">
          
          {/* AI Settings Section */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Features</CardTitle>
                  <CardDescription>
                    Configure AI-powered task breakdown, suggestions, and coaching
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* OpenAI API Key */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" />
                  <Label className="font-medium">OpenAI API Key</Label>
                  <div className="flex items-center gap-1 ml-auto">
                    <Shield className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Stored locally</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      placeholder="sk-..."
                      value={aiSettings.openaiApiKey}
                      onChange={(e) => handleAiSettingsUpdate('openaiApiKey', e.target.value)}
                      className="pr-20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-1 top-1 h-8 px-2 text-xs"
                    >
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <Button onClick={testApiKey} variant="outline" size="sm">
                    Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get your API key from{" "}
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    OpenAI Platform
                  </a>
                </p>
              </div>

              <Separator />

              {/* AI Feature Toggles */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI Features
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Smart Task Suggestions</div>
                      <div className="text-xs text-muted-foreground">AI suggests tasks based on your time and energy</div>
                    </div>
                    <Button
                      variant={aiSettings.enableAiSuggestions ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAiSettingsUpdate('enableAiSuggestions', !aiSettings.enableAiSuggestions)}
                    >
                      {aiSettings.enableAiSuggestions ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Task Breakdown</div>
                      <div className="text-xs text-muted-foreground">Automatically break large tasks into tiny steps</div>
                    </div>
                    <Button
                      variant={aiSettings.enableAiBreakdown ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAiSettingsUpdate('enableAiBreakdown', !aiSettings.enableAiBreakdown)}
                    >
                      {aiSettings.enableAiBreakdown ? "On" : "Off"}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Focus Coaching</div>
                      <div className="text-xs text-muted-foreground">AI provides encouragement and tips during sessions</div>
                    </div>
                    <Button
                      variant={aiSettings.enableAiCoaching ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAiSettingsUpdate('enableAiCoaching', !aiSettings.enableAiCoaching)}
                    >
                      {aiSettings.enableAiCoaching ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Focus & Timer Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                Focus & Timer
              </CardTitle>
              <CardDescription>
                Customize your focus sessions and break intervals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Focus Time Selector */}
              <div className="space-y-3">
                <Label className="font-medium">Default Focus Time</Label>
                <div className="flex gap-2 flex-wrap">
                  {[15, 25, 30, 45, 60].map((time) => (
                    <Button
                      key={time}
                      variant={focusTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFocusTime(time)}
                      className={focusTime === time ? "bg-gradient-primary" : ""}
                    >
                      {time}m
                    </Button>
                  ))}
                </div>
              </div>

              {/* Break Time Selector */}
              <div className="space-y-3">
                <Label className="font-medium">Default Break Time</Label>
                <div className="flex gap-2 flex-wrap">
                  {[5, 10, 15, 20].map((time) => (
                    <Button
                      key={time}
                      variant={breakTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBreakTime(time)}
                      className={breakTime === time ? "bg-gradient-primary" : ""}
                    >
                      {time}m
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Audio Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Audio Settings</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
                    <div>
                      <div className="font-medium text-sm">Sound Effects</div>
                      <div className="text-xs text-muted-foreground">Timer notifications and alerts</div>
                    </div>
                  </div>
                  <Button
                    variant={soundEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? "On" : "Off"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Voice Commands</div>
                      <div className="text-xs text-muted-foreground">Voice input for creating tasks</div>
                    </div>
                  </div>
                  <Button
                    variant={voiceEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                  >
                    {voiceEnabled ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Settings */}
          {preferences && onUpdatePreferences && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Accessibility
                </CardTitle>
                <CardDescription>
                  Customize the app for your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Reduced Motion</div>
                    <div className="text-xs text-muted-foreground">Minimize animations and transitions</div>
                  </div>
                  <Button
                    variant={preferences.reducedMotion ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUpdatePreferences(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
                  >
                    {preferences.reducedMotion ? "On" : "Off"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">High Contrast</div>
                    <div className="text-xs text-muted-foreground">Enhanced contrast for better visibility</div>
                  </div>
                  <Button
                    variant={preferences.highContrast ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUpdatePreferences(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                  >
                    {preferences.highContrast ? "On" : "Off"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About Section */}
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    TinySteps v1.0
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ADHD-friendly focus assistant designed to help you build sustainable productivity habits through tiny, manageable steps.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    Made with 💙 for minds that work differently
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              onClick={handleSave}
              className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:shadow-focus transition-smooth"
            >
              Save Settings
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};