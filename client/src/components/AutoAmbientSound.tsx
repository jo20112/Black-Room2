import { useEffect, useRef } from 'react';

export function AutoAmbientSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const isStartedRef = useRef(false);

  useEffect(() => {
    const startAmbience = () => {
      if (isStartedRef.current || !audioContextRef.current) return;
      isStartedRef.current = true;

      const ctx = audioContextRef.current;

      const deepDrones = [55, 73.4, 110, 146.8];
      
      deepDrones.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
        
        oscillator.frequency.linearRampToValueAtTime(
          freq * (1 + (Math.random() * 0.005 - 0.0025)),
          ctx.currentTime + 20
        );

        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 0.3;

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.012 + index * 0.003, ctx.currentTime + 8);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.05 + index * 0.02;
        lfoGain.gain.value = 0.002;

        lfo.connect(lfoGain);
        lfoGain.connect(gainNode.gain);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        lfo.start();

        oscillatorsRef.current.push(oscillator);
        oscillatorsRef.current.push(lfo);
        gainNodesRef.current.push(gainNode);
      });

      const eeriePad = ctx.createOscillator();
      const eerieGain = ctx.createGain();
      const eerieFilter = ctx.createBiquadFilter();

      eeriePad.type = 'triangle';
      eeriePad.frequency.value = 220;

      eerieFilter.type = 'lowpass';
      eerieFilter.frequency.value = 600;
      eerieFilter.Q.value = 2;

      eerieGain.gain.setValueAtTime(0, ctx.currentTime);
      eerieGain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 12);

      const eerieLfo = ctx.createOscillator();
      const eerieLfoGain = ctx.createGain();
      eerieLfo.frequency.value = 0.08;
      eerieLfoGain.gain.value = 0.003;

      eerieLfo.connect(eerieLfoGain);
      eerieLfoGain.connect(eerieGain.gain);

      eeriePad.connect(eerieFilter);
      eerieFilter.connect(eerieGain);
      eerieGain.connect(ctx.destination);

      eeriePad.start();
      eerieLfo.start();

      oscillatorsRef.current.push(eeriePad, eerieLfo);
      gainNodesRef.current.push(eerieGain);

      const whiteNoise = ctx.createBufferSource();
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 2000;
      noiseFilter.Q.value = 0.3;

      const noiseFilter2 = ctx.createBiquadFilter();
      noiseFilter2.type = 'lowpass';
      noiseFilter2.frequency.value = 4000;
      noiseFilter2.Q.value = 0.5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.003;

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseFilter2);
      noiseFilter2.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start();
      oscillatorsRef.current.push(whiteNoise as any);
      gainNodesRef.current.push(noiseGain);

      const subBass = ctx.createOscillator();
      const subGain = ctx.createGain();
      subBass.type = 'sine';
      subBass.frequency.value = 40;
      
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 15);

      const subLfo = ctx.createOscillator();
      const subLfoGain = ctx.createGain();
      subLfo.frequency.value = 0.03;
      subLfoGain.gain.value = 0.004;

      subLfo.connect(subLfoGain);
      subLfoGain.connect(subGain.gain);

      subBass.connect(subGain);
      subGain.connect(ctx.destination);

      subBass.start();
      subLfo.start();

      oscillatorsRef.current.push(subBass, subLfo);
      gainNodesRef.current.push(subGain);
    };

    const initAudio = () => {
      if (typeof window === 'undefined') return;

      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      if (audioContextRef.current.state === 'suspended') {
        const resumeAudio = () => {
          audioContextRef.current?.resume().then(() => {
            startAmbience();
          });
          document.removeEventListener('click', resumeAudio);
          document.removeEventListener('touchstart', resumeAudio);
          document.removeEventListener('keydown', resumeAudio);
        };

        document.addEventListener('click', resumeAudio);
        document.addEventListener('touchstart', resumeAudio);
        document.addEventListener('keydown', resumeAudio);
      } else {
        startAmbience();
      }
    };

    initAudio();

    return () => {
      gainNodesRef.current.forEach(gainNode => {
        gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 2);
      });

      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop();
          } catch (e) {}
        });
        audioContextRef.current?.close();
      }, 2000);
    };
  }, []);

  return null;
}
