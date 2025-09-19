import { useCallback } from 'react';

// Create audio context for sound effects
const createBeep = (frequency: number, duration: number, volume: number = 0.3) => {
  if (typeof window === 'undefined') return;
  
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  
  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

const createSuccessChime = () => {
  // Play a pleasant success sound sequence
  createBeep(523.25, 0.2); // C5
  setTimeout(() => createBeep(659.25, 0.2), 100); // E5
  setTimeout(() => createBeep(783.99, 0.3), 200); // G5
};

const createNotificationSound = () => {
  // Gentle notification sound
  createBeep(440, 0.15, 0.2); // A4 - soft
};

const createStartSound = () => {
  // Encouraging start sound
  createBeep(523.25, 0.2, 0.25); // C5
  setTimeout(() => createBeep(659.25, 0.2, 0.25), 150); // E5
};

const createProgressSound = () => {
  // Gentle progress notification
  createBeep(493.88, 0.1, 0.15); // B4 - very soft
};

export const useSoundEffects = () => {
  const playSuccess = useCallback(() => {
    try {
      createSuccessChime();
    } catch (error) {
      console.warn('Could not play success sound:', error);
    }
  }, []);

  const playNotification = useCallback(() => {
    try {
      createNotificationSound();
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }, []);

  const playStart = useCallback(() => {
    try {
      createStartSound();
    } catch (error) {
      console.warn('Could not play start sound:', error);
    }
  }, []);

  const playProgress = useCallback(() => {
    try {
      createProgressSound();
    } catch (error) {
      console.warn('Could not play progress sound:', error);
    }
  }, []);

  return {
    playSuccess,
    playNotification,
    playStart,
    playProgress,
  };
};