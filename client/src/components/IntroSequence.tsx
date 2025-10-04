import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
  onComplete: () => void;
}

const introMessages = [
  "مرحبًا بك في الغرفة السوداء...",
  "لن تخرج من هنا بسهولة.",
  "العقل هو سجنك.",
  "ابدأ الاختبار... إن كنت تجرؤ.",
  "كل سؤال يقربك من النهاية.",
  "هل تسمع الأصوات؟",
  "الوقت ينفد..."
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const audioElementsRef = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const playHorrorSound = (soundFile: string, volume: number = 0.5, delay: number = 0) => {
      setTimeout(() => {
        const audio = new Audio(soundFile);
        audio.volume = volume;
        audio.play().catch(e => console.log('Audio play failed:', e));
        audioElementsRef.current.push(audio);
      }, delay);
    };

    const startHorrorSound = async () => {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      playHorrorSound('/sounds/صوت مرعب 1.mp3', 0.6, 0);

      const backgroundAudio = new Audio('/sounds/صوت مرعب 3.mp3');
      backgroundAudio.volume = 0.35;
      backgroundAudio.loop = true;
      backgroundAudio.play().catch(e => console.log('Background audio play failed:', e));
      audioElementsRef.current.push(backgroundAudio);

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.25;
      masterGain.connect(ctx.destination);

      const deepDrone = ctx.createOscillator();
      const droneGain = ctx.createGain();
      deepDrone.type = 'sine';
      deepDrone.frequency.value = 30;
      droneGain.gain.setValueAtTime(0, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2);
      deepDrone.connect(droneGain);
      droneGain.connect(masterGain);
      deepDrone.start();
      oscillatorsRef.current.push(deepDrone);

      const heartbeat = ctx.createOscillator();
      const heartbeatGain = ctx.createGain();
      heartbeat.type = 'sine';
      heartbeat.frequency.value = 50;
      heartbeatGain.gain.setValueAtTime(0, ctx.currentTime);
      
      const pulseInterval = setInterval(() => {
        const now = ctx.currentTime;
        heartbeatGain.gain.cancelScheduledValues(now);
        heartbeatGain.gain.setValueAtTime(0, now);
        heartbeatGain.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
        heartbeatGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      }, 1200);

      heartbeat.connect(heartbeatGain);
      heartbeatGain.connect(masterGain);
      heartbeat.start();
      oscillatorsRef.current.push(heartbeat);

      return () => {
        clearInterval(pulseInterval);
      };
    };

    const handleUserInteraction = () => {
      startHorrorSound();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    startHorrorSound();

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      
      audioElementsRef.current.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
      
      if (ctx && ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 120);
      }
    }, 1200);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (currentIndex === 5) {
      const audio = new Audio('/sounds/صوت مرعب 4.mp3');
      audio.volume = 0.8;
      audio.play().catch(e => console.log('Audio play failed:', e));
      audioElementsRef.current.push(audio);
    }

    if (currentIndex < introMessages.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsComplete(true);
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        onComplete();
      }, 1500);

      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, onComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      <div 
        className={`absolute inset-0 bg-gradient-radial from-red-950/30 via-black to-black transition-opacity duration-1000 ${
          currentIndex % 2 === 0 ? 'opacity-100' : 'opacity-60'
        }`}
      />
      
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: ['rgba(0,0,0,1)', 'rgba(100,0,0,0.15)', 'rgba(0,0,0,1)'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-red-900"
            style={{
              left: `${Math.random() * 100}%`,
              height: '100%',
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-red-900/20 blur-3xl"
          style={{
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {currentIndex < introMessages.length && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.5, rotateX: -90, z: -100 }}
            animate={{ 
              opacity: 1, 
              scale: glitch ? [1, 1.15, 0.85, 1.1, 1] : 1,
              rotateX: glitch ? [0, 5, -5, 0] : 0,
              x: glitch ? [-8, 8, -8, 8, 0] : 0,
              y: glitch ? [0, -5, 5, -3, 0] : 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.3,
              rotateX: 90,
              filter: 'blur(20px)',
              y: -50,
            }}
            transition={{ 
              duration: 1,
              exit: { duration: 0.6 },
            }}
            className="text-center px-8 relative z-10"
          >
            <motion.div
              animate={{
                filter: glitch 
                  ? ['blur(0px)', 'blur(3px)', 'blur(0px)']
                  : 'blur(0px)',
              }}
              transition={{ duration: 0.15 }}
            >
              <motion.p 
                className={`text-white text-3xl md:text-6xl font-bold tracking-wider select-none ${
                  glitch ? 'mix-blend-difference' : ''
                }`}
                style={{
                  textShadow: glitch 
                    ? '3px 3px #ff0000, -3px -3px #00ffff, 0 0 30px rgba(255, 0, 0, 0.8)' 
                    : '0 0 30px rgba(255, 0, 0, 0.6), 0 0 60px rgba(139, 0, 0, 0.4), 0 0 90px rgba(0, 0, 0, 0.8)',
                }}
                animate={{
                  opacity: [1, 0.85, 1],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                }}
              >
                {introMessages[currentIndex]}
              </motion.p>
            </motion.div>
            
            {glitch && (
              <>
                <motion.p 
                  className="absolute inset-0 text-red-500 text-3xl md:text-6xl font-bold tracking-wider opacity-80"
                  style={{ 
                    clipPath: 'inset(0 0 60% 0)',
                    transform: 'translateX(-7px) translateY(-3px)',
                  }}
                >
                  {introMessages[currentIndex]}
                </motion.p>
                <motion.p 
                  className="absolute inset-0 text-cyan-400 text-3xl md:text-6xl font-bold tracking-wider opacity-80"
                  style={{ 
                    clipPath: 'inset(60% 0 0 0)',
                    transform: 'translateX(7px) translateY(3px)',
                  }}
                >
                  {introMessages[currentIndex]}
                </motion.p>
                <motion.p 
                  className="absolute inset-0 text-green-400 text-3xl md:text-6xl font-bold tracking-wider opacity-60"
                  style={{ 
                    clipPath: 'inset(40% 0 40% 0)',
                    transform: 'translateX(4px) translateY(-2px)',
                  }}
                >
                  {introMessages[currentIndex]}
                </motion.p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: glitch ? [0, 0.5, 0] : [0, 0.1, 0],
        }}
        transition={{
          duration: 0.1,
        }}
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3) 1px, transparent 1px, transparent 3px)',
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
        {introMessages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-red-500 w-10"
                : index < currentIndex
                ? "bg-red-900/50 w-2"
                : "bg-gray-800/30 w-2"
            }`}
            animate={index === currentIndex ? {
              boxShadow: [
                '0 0 15px rgba(239, 68, 68, 0.6)',
                '0 0 30px rgba(239, 68, 68, 1)',
                '0 0 15px rgba(239, 68, 68, 0.6)',
              ],
              scaleX: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          x: ['100%', '-200%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute top-4 right-6 text-red-500/40 text-sm font-mono"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          {currentIndex + 1}/{introMessages.length}
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent"
            style={{
              top: `${15 + i * 12}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none border-2 border-red-900/20"
        animate={{
          borderColor: ['rgba(127, 29, 29, 0.1)', 'rgba(127, 29, 29, 0.3)', 'rgba(127, 29, 29, 0.1)'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
