import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skull, Flame, AlertTriangle, User, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface LoginFormProps {
  onLogin: (name: string, age: number, gender: "male" | "female") => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [bloodDrip, setBloodDrip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBloodDrip(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAgeChange = (value: string) => {
    setAge(value);
    const ageNum = parseInt(value);
    if (value && ageNum < 18) {
      setAgeError("يجب أن يكون عمرك 18 سنة أو أكثر للدخول");
    } else {
      setAgeError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    
    if (!name.trim()) {
      return;
    }
    
    if (ageNum < 18) {
      setAgeError("يجب أن يكون عمرك 18 سنة أو أكثر للدخول");
      return;
    }
    
    if (ageNum > 0 && ageNum < 120 && agreedToTerms && gender) {
      onLogin(name.trim(), ageNum, gender);
    }
  };

  const isFormValid = name.trim() && age && parseInt(age) >= 18 && parseInt(age) < 120 && agreedToTerms && gender;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black to-black" />
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-red-900"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}px`,
              top: `-${Math.random() * 100}px`,
            }}
            animate={{
              y: ['0vh', '120vh'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="animate-float max-w-lg w-full relative z-10">
        <Card className="w-full shadow-2xl backdrop-blur-sm bg-black/95 border-red-900/70 border-2 relative overflow-hidden group hover-elevate transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-red-950/30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-900/30 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-900/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          
          <motion.div
            className="absolute top-0 left-1/4 w-2 h-20 bg-gradient-to-b from-red-600 to-transparent"
            animate={{
              height: bloodDrip ? ['0px', '80px'] : '0px',
              opacity: bloodDrip ? [0, 1, 0.5] : 0,
            }}
            transition={{ duration: 2 }}
          />
          <motion.div
            className="absolute top-0 right-1/3 w-2 h-16 bg-gradient-to-b from-red-700 to-transparent"
            animate={{
              height: bloodDrip ? ['0px', '60px'] : '0px',
              opacity: bloodDrip ? [0, 1, 0.5] : 0,
            }}
            transition={{ duration: 2, delay: 0.3 }}
          />
          
          <CardHeader className="text-center space-y-6 pb-6 relative z-10">
            <div className="flex justify-center">
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-red-900/40 to-black/40 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500 border-2 border-red-800/50"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(220, 38, 38, 0.3)',
                    '0 0 40px rgba(220, 38, 38, 0.6)',
                    '0 0 20px rgba(220, 38, 38, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute inset-0 rounded-full bg-red-900/40 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/20 to-orange-600/20 blur-xl" />
                <Skull className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-red-400 relative z-10" />
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-500 absolute bottom-1 sm:bottom-2 animate-pulse" />
              </motion.div>
            </div>
            <div>
              <motion.div
                animate={{
                  textShadow: [
                    '0 0 20px rgba(220, 38, 38, 0.5)',
                    '0 0 40px rgba(220, 38, 38, 0.8)',
                    '0 0 20px rgba(220, 38, 38, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl mb-3 bg-gradient-to-r from-red-400 via-orange-500 to-red-400 bg-clip-text text-transparent" data-testid="text-login-title">
                  ادخل الجحيم
                </CardTitle>
              </motion.div>
              <CardDescription className="text-base sm:text-lg text-red-300/70">
                روحك ستُختبر... لا مفر من الظلام
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10 space-y-6">
            <Alert className="border-red-700/70 bg-red-950/40 shadow-lg shadow-red-900/20">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 animate-pulse" />
              <AlertDescription className="text-red-200 text-xs sm:text-sm leading-relaxed font-bold flex items-start gap-2">
                <Skull className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-red-400">تحذير الموت:</strong> أنت على وشك الدخول لعالم الظلام والرعب النفسي. 
                  للبالغين فقط (+18). روحك وعقلك على وشك الاختبار الحقيقي... لا مجال للعودة.
                </div>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-red-300 font-bold" data-testid="label-name">
                  اسمك الملعون
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="اكتب اسمك... إن كنت تجرؤ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="input-name"
                  className="text-base sm:text-lg border-red-800/50 focus:border-red-600 bg-black/70 text-red-100 placeholder:text-red-900/50 backdrop-blur-sm transition-all duration-300 shadow-inner shadow-red-900/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-red-300 font-bold" data-testid="label-age">
                  سنوات عذابك <span className="text-red-500 text-sm animate-pulse">(18+ فقط)</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="كم سنة عشت في هذا الجحيم؟"
                  value={age}
                  onChange={(e) => handleAgeChange(e.target.value)}
                  required
                  min="18"
                  max="120"
                  data-testid="input-age"
                  className={`text-base sm:text-lg ${ageError ? 'border-red-600 focus:border-red-500 shadow-lg shadow-red-600/30' : 'border-red-800/50 focus:border-red-600'} bg-black/70 text-red-100 placeholder:text-red-900/50 backdrop-blur-sm transition-all duration-300 shadow-inner shadow-red-900/20`}
                />
                {ageError && (
                  <motion.p 
                    className="text-red-500 text-sm mt-1 font-bold"
                    data-testid="text-age-error"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <AlertTriangle className="w-4 h-4 inline ml-1" />
                    {ageError}
                  </motion.p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-red-300 font-bold">جنسك الملعون</Label>
                <RadioGroup value={gender} onValueChange={(value) => setGender(value as "male" | "female")} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse bg-red-950/20 p-3 rounded border border-red-900/30 flex-1 cursor-pointer hover:bg-red-950/30 transition-all">
                    <RadioGroupItem value="male" id="male" className="border-red-700/50 text-red-600" />
                    <Label htmlFor="male" className="text-red-200 cursor-pointer flex items-center gap-2 flex-1">
                      <User className="w-5 h-5" />
                      رجل
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse bg-red-950/20 p-3 rounded border border-red-900/30 flex-1 cursor-pointer hover:bg-red-950/30 transition-all">
                    <RadioGroupItem value="female" id="female" className="border-red-700/50 text-red-600" />
                    <Label htmlFor="female" className="text-red-200 cursor-pointer flex items-center gap-2 flex-1">
                      <Users className="w-5 h-5" />
                      امرأة
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse bg-red-950/20 p-3 rounded border border-red-900/30">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1 border-red-700/50 data-[state=checked]:bg-red-900 data-[state=checked]:border-red-700"
                  data-testid="checkbox-terms"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-relaxed text-red-200/90 cursor-pointer font-medium"
                >
                  أبيع روحي طواعية وأتحمل كامل المسؤولية عن النتائج والعذاب النفسي القادم. 
                  عمري 18+ وأنا مستعد للظلام الأبدي.
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full text-base sm:text-lg relative overflow-hidden group/btn bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 border-2 border-red-700/50 shadow-lg shadow-red-900/50"
                size="lg"
                disabled={!isFormValid}
                data-testid="button-start"
              >
                <span className="relative z-10 font-bold text-red-100 flex items-center justify-center gap-2">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                  ادخل أبواب الجحيم
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
