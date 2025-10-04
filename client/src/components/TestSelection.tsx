import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skull, Flame, Zap, Ghost, Eye, Stars, Target, Home, Fire, AlertTriangle, Swords, Heart, Sparkles } from "lucide-react";
import { testTypes, type TestTypeId } from "@shared/test-types";
import { motion, AnimatePresence } from "framer-motion";

interface TestSelectionProps {
  userName: string;
  userGender: "male" | "female";
  onSelectTest: (testId: TestTypeId) => void;
  onBackToHome?: () => void;
}

const iconMap = {
  brain: Skull,
  skull: Skull,
  chess: Target,
  heart: Ghost,
  eye: Eye,
  stars: Stars,
  flame: Flame,
};

const testThemes = {
  bigFive: {
    gradient: 'from-red-800/30 to-orange-800/30',
    hoverGradient: 'from-red-800/20 to-orange-800/20',
    glow: 'bg-red-800/20',
    hoverGlow: 'group-hover:bg-red-800/40',
    border: 'border-red-700/60',
    iconBg: 'from-red-800/40 to-orange-800/40',
    textGradient: 'from-red-300 to-orange-300',
  },
  darkSide: {
    gradient: 'from-red-900/40 to-black/40',
    hoverGradient: 'from-red-900/30 to-black/30',
    glow: 'bg-red-900/30',
    hoverGlow: 'group-hover:bg-red-900/50',
    border: 'border-red-800/70',
    iconBg: 'from-red-900/50 to-black/50',
    textGradient: 'from-red-400 to-red-200',
  },
  cunningSide: {
    gradient: 'from-orange-900/30 to-red-900/30',
    hoverGradient: 'from-orange-900/20 to-red-900/20',
    glow: 'bg-orange-900/20',
    hoverGlow: 'group-hover:bg-orange-900/40',
    border: 'border-orange-800/60',
    iconBg: 'from-orange-900/40 to-red-900/40',
    textGradient: 'from-orange-300 to-red-300',
  },
  goodSide: {
    gradient: 'from-red-800/30 to-gray-900/30',
    hoverGradient: 'from-red-800/20 to-gray-900/20',
    glow: 'bg-red-800/20',
    hoverGlow: 'group-hover:bg-red-800/40',
    border: 'border-red-700/60',
    iconBg: 'from-red-800/40 to-gray-900/40',
    textGradient: 'from-red-300 to-gray-300',
  },
  mysteriousSide: {
    gradient: 'from-purple-900/30 to-red-900/30',
    hoverGradient: 'from-purple-900/20 to-red-900/20',
    glow: 'bg-purple-900/20',
    hoverGlow: 'group-hover:bg-purple-900/40',
    border: 'border-purple-800/60',
    iconBg: 'from-purple-900/40 to-red-900/40',
    textGradient: 'from-purple-300 to-red-300',
  },
  zodiac: {
    gradient: 'from-indigo-900/30 to-red-900/30',
    hoverGradient: 'from-indigo-900/20 to-red-900/20',
    glow: 'bg-indigo-900/20',
    hoverGlow: 'group-hover:bg-indigo-900/40',
    border: 'border-indigo-800/60',
    iconBg: 'from-indigo-900/40 to-red-900/40',
    textGradient: 'from-indigo-300 to-red-300',
  },
  demonChat: {
    gradient: 'from-red-950/50 to-black/50',
    hoverGradient: 'from-red-950/40 to-black/40',
    glow: 'bg-red-950/30',
    hoverGlow: 'group-hover:bg-red-950/60',
    border: 'border-red-900/80',
    iconBg: 'from-red-950/60 to-black/60',
    textGradient: 'from-red-500 to-orange-500',
  },
};

export function TestSelection({ userName, userGender, onSelectTest, onBackToHome }: TestSelectionProps) {
  const genderText = {
    male: {
      welcome: "أهلاً في ظلامك الداخلي",
      warning: "كل اختبار سيكشف عن أعماق ظلامك الداخلي... لا مجال للهروب من الحقيقة المظلمة. اختر بحذر... فكل طريق يقودك لجزء مختلف من جحيمك الشخصي.",
      enter: "ادخل العذاب"
    },
    female: {
      welcome: "أهلاً في ظلامك الداخلي",
      warning: "كل اختبار سيكشف عن أعماق ظلامك الداخلي... لا مجال للهروب من الحقيقة المظلمة. اختاري بحذر... فكل طريق يقودك لجزء مختلف من جحيمك الشخصي.",
      enter: "ادخلي العذاب"
    }
  };

  const texts = genderText[userGender];
  
  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      
      {/* Blood drips */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-red-600 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 200 + 100}px`,
            }}
            animate={{
              y: ['-100%', '100vh'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      {/* Floating skulls */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Skull className="w-16 h-16 text-red-900" />
          </motion.div>
        ))}
      </div>
      
      {/* Red fog effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-950/40 via-transparent to-red-950/60" />
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {onBackToHome && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              onClick={onBackToHome}
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-900/50 backdrop-blur-sm"
            >
              <Home className="w-5 h-5 ml-2" />
              العودة للصفحة الرئيسية
            </Button>
          </motion.div>
        )}
        
        <div className="text-center space-y-8 animate-float">
          <motion.div 
            className="inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Skull header */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 blur-2xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Skull className="w-24 h-24 text-red-600" />
                </motion.div>
                <Skull className="w-24 h-24 text-red-500 relative z-10 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-600 bg-clip-text text-transparent flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap mb-4"
              data-testid="text-welcome"
              animate={{
                textShadow: [
                  '0 0 30px rgba(220, 38, 38, 0.8)',
                  '0 0 60px rgba(220, 38, 38, 1)',
                  '0 0 30px rgba(220, 38, 38, 0.8)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
              {userName}... {texts.welcome}
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 text-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
            </motion.h1>
            
            <div className="relative h-2 w-full max-w-2xl mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.8)]" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
          
          {/* Warning box */}
          <motion.div
            className="max-w-3xl mx-auto bg-black/80 border-2 border-red-900 rounded-lg p-4 sm:p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold text-red-400">تحذير من الجحيم</h2>
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-pulse" />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-red-200/90 leading-relaxed">
              {texts.warning}
            </p>
          </motion.div>
        </div>

        <div className="space-y-8">
          {Object.entries(testTypes)
            .sort(([keyA], [keyB]) => {
              if (keyA === 'demonChat') return -1;
              if (keyB === 'demonChat') return 1;
              return 0;
            })
            .map(([key, test], index) => {
              const Icon = iconMap[test.icon as keyof typeof iconMap];
              const theme = testThemes[key as TestTypeId];
              const isDemonChat = key === 'demonChat';
              
              return (
                <div
                  key={key}
                  className={`animate-float ${isDemonChat ? 'mb-12' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <motion.div
                    whileHover={{ scale: isDemonChat ? 1.02 : 1.05, rotate: isDemonChat ? 0 : (Math.random() > 0.5 ? 1 : -1) }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {isDemonChat ? (
                      <Card
                        className="transition-all duration-700 cursor-pointer group bg-black border-4 border-red-600 relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:shadow-[0_0_80px_rgba(220,38,38,0.9)]"
                        onClick={() => onSelectTest(key as TestTypeId)}
                        data-testid={`card-test-${key}`}
                      >
                        {/* Scary background effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-black to-red-900/40" />
                        
                        {/* Animated fire particles */}
                        <div className="absolute inset-0 opacity-20">
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute bg-orange-500 rounded-full"
                              style={{
                                width: `${Math.random() * 6 + 3}px`,
                                height: `${Math.random() * 6 + 3}px`,
                                left: `${Math.random() * 100}%`,
                                bottom: 0,
                              }}
                              animate={{
                                y: [0, -300],
                                opacity: [1, 0],
                                scale: [1, 0.3],
                              }}
                              transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeOut",
                              }}
                            />
                          ))}
                        </div>
                        
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: [
                              'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)',
                            ],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                          }}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10 relative z-10">
                          <div className="flex flex-col justify-center items-center space-y-6 sm:space-y-8">
                            <motion.div
                              className="relative"
                              animate={{
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              {/* Glowing skull */}
                              <motion.div
                                className="absolute inset-0 blur-3xl"
                                animate={{
                                  scale: [1, 1.8, 1],
                                  opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              >
                                <Skull className="w-40 h-40 text-red-600" />
                              </motion.div>
                              <Skull className="w-40 h-40 text-red-500 relative z-10 drop-shadow-[0_0_40px_rgba(220,38,38,1)]" />
                              
                              {/* Flame eyes */}
                              <motion.div
                                className="absolute top-12 left-12"
                                animate={{
                                  opacity: [0.6, 1, 0.6],
                                  scale: [0.9, 1.1, 0.9],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                }}
                              >
                                <Flame className="w-8 h-8 text-orange-500" />
                              </motion.div>
                              <motion.div
                                className="absolute top-12 right-12"
                                animate={{
                                  opacity: [0.6, 1, 0.6],
                                  scale: [0.9, 1.1, 0.9],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: 0.3,
                                }}
                              >
                                <Flame className="w-8 h-8 text-orange-500" />
                              </motion.div>
                            </motion.div>
                          </div>
                          
                          <div className="flex flex-col justify-center space-y-6">
                            <motion.div
                              animate={{
                                textShadow: [
                                  '0 0 20px rgba(220, 38, 38, 0.8)',
                                  '0 0 40px rgba(220, 38, 38, 1)',
                                  '0 0 20px rgba(220, 38, 38, 0.8)',
                                ],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent font-bold text-center md:text-right mb-4">
                                {test.name}
                              </CardTitle>
                            </motion.div>
                            
                            <CardDescription className="text-base sm:text-lg md:text-xl leading-relaxed text-red-100/90 text-center md:text-right font-semibold">
                              {test.description}
                            </CardDescription>
                            
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                className="w-full text-base sm:text-lg md:text-xl py-6 sm:py-8 relative overflow-hidden bg-gradient-to-r from-red-900 via-red-700 to-red-900 hover:from-red-800 hover:via-red-600 hover:to-red-800 border-2 sm:border-4 border-orange-600 text-white font-bold shadow-[0_0_30px_rgba(249,115,22,0.6)] group/btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectTest(key as TestTypeId);
                                }}
                                data-testid={`button-start-${key}`}
                              >
                                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                  <Skull className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                  ادخل عالم الشياطين
                                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                </span>
                                <motion.div 
                                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"
                                  animate={{ opacity: [0, 0.7, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </Card>
                    ) : null}
                  </motion.div>
                </div>
              );
            })}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(testTypes)
              .filter(([key]) => key !== 'demonChat')
              .map(([key, test], index) => {
                const Icon = iconMap[test.icon as keyof typeof iconMap];
                const theme = testThemes[key as TestTypeId];
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <Card
                      className={`transition-all duration-500 cursor-pointer group bg-black/90 ${theme.border} border-3 relative overflow-hidden h-full shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)]`}
                      onClick={() => onSelectTest(key as TestTypeId)}
                      data-testid={`card-test-${key}`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Glowing orbs */}
                      <motion.div 
                        className={`absolute top-0 right-0 w-32 h-32 ${theme.glow} rounded-full blur-3xl`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />
                      <motion.div 
                        className={`absolute bottom-0 left-0 w-24 h-24 ${theme.glow} rounded-full blur-2xl`}
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                        }}
                      />
                      
                      <CardHeader className="space-y-4 sm:space-y-6 relative z-10">
                        <motion.div 
                          className="flex justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <motion.div 
                            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${theme.iconBg} flex items-center justify-center relative border-2 sm:border-3 ${theme.border}`}
                            animate={{
                              boxShadow: [
                                '0 0 20px rgba(220, 38, 38, 0.4)',
                                '0 0 40px rgba(220, 38, 38, 0.8)',
                                '0 0 20px rgba(220, 38, 38, 0.4)',
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className={`absolute inset-0 rounded-full ${theme.glow} animate-ping opacity-0 group-hover:opacity-100`} />
                            {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-400 relative z-10 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" />}
                          </motion.div>
                        </motion.div>
                        
                        <CardTitle className={`text-center text-base sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r ${theme.textGradient} bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300 font-bold drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]`}>
                          {test.name}
                        </CardTitle>
                        
                        <CardDescription className="text-center text-sm sm:text-base leading-relaxed min-h-[50px] sm:min-h-[60px] text-red-100/80 font-medium">
                          {test.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex flex-col gap-3 sm:gap-4 relative z-10">
                        <div className="text-center">
                          <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${theme.gradient} text-xs sm:text-sm border-2 ${theme.border} text-red-100 font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)]`}>
                            <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
                            {test.questionCount} سؤال من الجحيم
                          </span>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className={`w-full text-sm sm:text-base group/btn relative overflow-hidden bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 border-2 sm:border-3 ${theme.border} text-red-100 font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)]`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTest(key as TestTypeId);
                            }}
                            data-testid={`button-start-${key}`}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Skull className="w-5 h-5" />
                              {texts.enter}
                              <Flame className="w-5 h-5" />
                            </span>
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"
                              animate={{ opacity: [0, 0.5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
