import { useEffect, useRef } from "react";

export default function HeartbeatSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/heartbeat.mp3');
    audio.volume = 0.3;
    audio.loop = true;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(e => console.log('Heartbeat audio play failed:', e));
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('keydown', startAudio);
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);
    document.addEventListener('keydown', startAudio);
    
    audio.play().catch(() => {});

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('keydown', startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return null;
}
