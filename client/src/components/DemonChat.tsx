import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  text: string;
  sender: "user" | "demon";
  timestamp: Date;
}

interface DemonChatProps {
  userName: string;
  userGender: "male" | "female";
  onExit?: () => void;
}

export function DemonChat({ userName, userGender, onExit }: DemonChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [showWarning, setShowWarning] = useState(true);

  const genderVerb = userGender === "male" ? "تحدث" : "تحدثي";
  const genderDare = userGender === "male" ? "تجرؤ" : "تجرئين";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }

    const initialMessage: Message = {
      id: 1,
      text: `${userName}... أخيراً... لقد كنت أنتظرك... أنا أعرف كل شيء عنك... كل أسرارك... كل مخاوفك... ${genderVerb} معي... إن كنت ${genderDare}...`,
      sender: "demon",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const playDemonSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    const growl = ctx.createOscillator();
    const growlGain = ctx.createGain();
    const growlFilter = ctx.createBiquadFilter();

    growl.type = 'sawtooth';
    growlFilter.type = 'lowpass';
    growlFilter.frequency.value = 200;
    growlFilter.Q.value = 5;

    growl.frequency.setValueAtTime(60, ctx.currentTime);
    growl.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);

    growlGain.gain.setValueAtTime(0, ctx.currentTime);
    growlGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    growlGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    growl.connect(growlFilter);
    growlFilter.connect(growlGain);
    growlGain.connect(ctx.destination);

    growl.start();
    growl.stop(ctx.currentTime + 0.5);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    if (inputText.trim().toLowerCase() === "استسلام" || inputText.trim().toLowerCase() === "استسلم") {
      const surrenderMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, surrenderMessage]);
      
      setTimeout(() => {
        const demonFarewell: Message = {
          id: messages.length + 2,
          text: "ضعيف... سأنتظرك... عندما تجرؤ على العودة... 😈",
          sender: "demon",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, demonFarewell]);
        
        setTimeout(() => {
          if (onExit) onExit();
        }, 2000);
      }, 1000);
      
      setInputText("");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/demon-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: inputText,
          userName: userName,
          conversationHistory: messages.slice(-5),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      playDemonSound();
      
      setTimeout(() => {
        const demonMessage: Message = {
          id: messages.length + 2,
          text: data.response,
          sender: "demon",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, demonMessage]);
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "الاتصال ضعيف... لكنني ما زلت هنا... أراقبك...",
        sender: "demon",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  if (showWarning) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="p-8 bg-gradient-to-b from-red-950/40 to-black border-red-900/50 shadow-2xl shadow-red-900/50">
            <div className="text-center space-y-6">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Skull className="w-24 h-24 mx-auto text-red-600" />
              </motion.div>
              
              <h1 className="text-4xl font-bold text-red-500">تحذير</h1>
              
              <div className="space-y-4 text-lg text-red-200">
                <p className="font-bold">أنت على وشك الدخول في محادثة مع كيان مظلم</p>
                <p>هذه ليست لعبة... الشيطان يقرأ أفكارك ومشاعرك</p>
                <p>قد تسمع أصواتاً مخيفة... قد ترى أشياء غريبة</p>
                <p className="text-red-400">هل أنت مستعد حقاً؟</p>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-gray-600 hover:bg-gray-800"
                >
                  الهروب
                </Button>
                <Button
                  onClick={() => setShowWarning(false)}
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/50"
                >
                  أنا أجرؤ
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-red-950/20 via-black to-black"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-red-900"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
        <motion.div
          className="text-center py-6 border-b border-red-900/30"
          animate={{
            textShadow: glitch
              ? ['0 0 10px #ff0000', '0 0 20px #ff0000', '0 0 10px #ff0000']
              : '0 0 10px rgba(255, 0, 0, 0.5)',
          }}
        >
          <h1 className={`text-2xl sm:text-3xl font-bold text-red-500 ${glitch ? 'mix-blend-difference' : ''}`}>
            غرفة الظلام
          </h1>
          <p className="text-red-300/60 text-xs sm:text-sm mt-2">للخروج... اكتب "استسلام" إن جبنت... 👹</p>
        </motion.div>

        <div className="flex-1 overflow-y-auto py-4 sm:py-6 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.sender === "user" ? 50 : -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 text-sm sm:text-base ${
                    message.sender === "user"
                      ? "bg-gray-800/80 border border-gray-700"
                      : "bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 shadow-lg shadow-red-900/30"
                  }`}
                  style={{
                    textShadow: message.sender === "demon" && glitch
                      ? '2px 2px #ff0000, -2px -2px #00ff00'
                      : 'none',
                  }}
                >
                  {message.sender === "demon" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Skull className="w-4 h-4 text-red-600" />
                      <span className="text-xs text-red-400 font-mono">الكيان المظلم</span>
                    </div>
                  )}
                  <p className={`${message.sender === "demon" ? "text-red-200" : "text-gray-200"}`}>
                    {message.text}
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {message.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-br from-red-950/60 to-black border border-red-900/50 rounded-lg p-4">
                <div className="flex gap-2">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-2 bg-red-500 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-red-500 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-red-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <motion.div
          className="border-t border-red-900/30 pt-4"
          animate={{
            boxShadow: glitch
              ? ['0 -5px 20px rgba(255, 0, 0, 0.3)', '0 -5px 20px rgba(255, 0, 0, 0.6)', '0 -5px 20px rgba(255, 0, 0, 0.3)']
              : '0 -5px 20px rgba(255, 0, 0, 0.2)',
          }}
        >
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اكتب رسالتك... إن كنت تجرؤ..."
              className="bg-gray-900/50 border-red-900/30 text-white placeholder:text-gray-600 focus:border-red-600 text-sm sm:text-base"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/50 px-3 sm:px-4"
              size="icon"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none border-4 border-red-900/10"
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
