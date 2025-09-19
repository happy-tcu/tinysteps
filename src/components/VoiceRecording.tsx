import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface VoiceRecordingProps {
  onTranscriptChange: (transcript: string) => void;
  disabled?: boolean;
}

export const VoiceRecording = ({ onTranscriptChange, disabled }: VoiceRecordingProps) => {
  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const [waveformData, setWaveformData] = useState<number[]>(Array(20).fill(0));
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  // Simulate waveform animation while listening
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isListening) {
      interval = setInterval(() => {
        setWaveformData(prev => 
          prev.map(() => Math.random() * 0.8 + 0.2)
        );
      }, 150);
    } else {
      setWaveformData(Array(20).fill(0));
    }

    return () => clearInterval(interval);
  }, [isListening]);

  const handleToggleRecording = async () => {
    if (isListening) {
      stopListening();
    } else {
      // Request microphone permission first
      if (!permissionRequested) {
        setPermissionRequested(true);
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setPermissionDenied(false);
        } catch (error) {
          console.error('Microphone permission denied:', error);
          setPermissionDenied(true);
          return;
        }
      }
      
      resetTranscript();
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <Card className="p-4 bg-warning-soft border-warning/30">
        <div className="flex items-center gap-3">
          <VolumeX className="w-5 h-5 text-warning" />
          <div>
            <p className="text-sm font-medium text-warning-foreground">
              Voice recording not supported
            </p>
            <p className="text-xs text-muted-foreground">
              Please use a modern browser or type your task instead
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (permissionDenied) {
    return (
      <Card className="p-4 bg-destructive/10 border-destructive/30">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">
              Microphone access required
            </p>
            <p className="text-xs text-muted-foreground">
              Please allow microphone access in your browser settings and refresh the page
            </p>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.location.reload()}
            className="text-xs"
          >
            Refresh
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Voice Recording Button */}
      <div className="flex flex-col items-center space-y-4">
        <Button
          onClick={handleToggleRecording}
          disabled={disabled}
          className={`w-20 h-20 rounded-full transition-all duration-300 ${
            isListening 
              ? 'bg-destructive hover:bg-destructive/90 shadow-lg animate-pulse' 
              : 'bg-gradient-primary hover:shadow-focus'
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
        
        <p className="text-sm text-muted-foreground text-center">
          {isListening 
            ? "Listening... Tap to stop" 
            : "Tap to record your task"
          }
        </p>
      </div>

      {/* Waveform Visualization */}
      {isListening && (
        <Card className="p-4 bg-primary-soft/30 border-primary/20">
          <div className="flex items-center justify-center gap-1 h-12">
            {waveformData.map((height, index) => (
              <div
                key={index}
                className="bg-gradient-primary rounded-full transition-all duration-150"
                style={{
                  width: '3px',
                  height: `${Math.max(height * 100, 10)}%`,
                  minHeight: '4px',
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Recording...</span>
          </div>
        </Card>
      )}

      {/* Transcript Preview */}
      {transcript && (
        <Card className="p-4 bg-secondary-soft/30 border-secondary/20">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                I heard:
              </p>
              <p className="text-foreground italic">
                "{transcript}"
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-3 bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          💡 Speak clearly and naturally. For example: "Read chapter 5 of my book" or "Organize my desk for 15 minutes"
        </p>
      </Card>
    </div>
  );
};