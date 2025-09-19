import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, ArrowLeft, Volume2, VolumeX, Timer, Coffee } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const { appData, updateSettings } = useAppData();
  const [focusTime, setFocusTime] = useState(appData.settings.defaultFocusTime);
  const [breakTime, setBreakTime] = useState(appData.settings.defaultBreakTime);
  const [soundEnabled, setSoundEnabled] = useState(appData.settings.soundEnabled);
  const [voiceEnabled, setVoiceEnabled] = useState(appData.settings.voiceEnabled);

  const handleSave = () => {
    updateSettings({
      defaultFocusTime: focusTime,
      defaultBreakTime: breakTime,
      soundEnabled,
      voiceEnabled,
    });
    onBack();
  };

  const focusTimes = [10, 15, 20, 25, 30, 45, 60];
  const breakTimes = [5, 10, 15, 20];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <div className="w-16"></div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Focus Timer Settings */}
        <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Timer className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Timer Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Default Focus Time (minutes)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {focusTimes.map((time) => (
                  <Button
                    key={time}
                    variant={focusTime === time ? "default" : "outline"}
                    onClick={() => setFocusTime(time)}
                    className={`h-12 ${
                      focusTime === time 
                        ? "bg-gradient-primary" 
                        : "hover:bg-primary-soft"
                    }`}
                  >
                    {time}m
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Default Break Time (minutes)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {breakTimes.map((time) => (
                  <Button
                    key={time}
                    variant={breakTime === time ? "default" : "outline"}
                    onClick={() => setBreakTime(time)}
                    className={`h-12 ${
                      breakTime === time 
                        ? "bg-gradient-secondary" 
                        : "hover:bg-secondary-soft"
                    }`}
                  >
                    {time}m
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Audio Settings */}
        <Card className="p-6 shadow-soft bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6">
            <Volume2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Audio Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-primary" />
                ) : (
                  <VolumeX className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">Sound Effects</p>
                  <p className="text-sm text-muted-foreground">
                    Progress notifications and completion sounds
                  </p>
                </div>
              </div>
              <Button
                variant={soundEnabled ? "default" : "outline"}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`min-w-16 ${
                  soundEnabled 
                    ? "bg-gradient-primary" 
                    : "hover:bg-muted"
                }`}
              >
                {soundEnabled ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Voice Input</p>
                  <p className="text-sm text-muted-foreground">
                    Enable voice recording for task creation
                  </p>
                </div>
              </div>
              <Button
                variant={voiceEnabled ? "default" : "outline"}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`min-w-16 ${
                  voiceEnabled 
                    ? "bg-gradient-primary" 
                    : "hover:bg-muted"
                }`}
              >
                {voiceEnabled ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-6 shadow-soft bg-gradient-soft border-primary/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Coffee className="w-8 h-8 text-primary-foreground" />
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
    </div>
  );
};