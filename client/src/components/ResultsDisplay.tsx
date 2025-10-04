import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Sparkles, Skull, Swords, Heart, Eye, Home } from "lucide-react";
import type { TestResult } from "@shared/schema";
import {
  bigFiveTraits,
  darkSideTraits,
  cunningSideTraits,
  goodSideTraits,
  mysteriousSideTraits,
  zodiacTraits,
} from "@shared/schema";
import { testTypes, type TestTypeId } from "@shared/test-types";
import { RadarChart } from "./RadarChart";

interface ResultsDisplayProps {
  result: TestResult;
  userName: string;
  userGender: "male" | "female";
  testType: TestTypeId;
  onBackToHome?: () => void;
}

const traitMaps = {
  bigFive: bigFiveTraits,
  darkSide: darkSideTraits,
  cunningSide: cunningSideTraits,
  goodSide: goodSideTraits,
  mysteriousSide: mysteriousSideTraits,
  zodiac: zodiacTraits,
};

const darkSideDescriptions = {
  cruelty: {
    high: "🔥 قلبك من حديد ونارك لا ترحم. تستمتع بالقوة المطلقة وتحطيم الضعفاء. القسوة تسري في عروقك كالسم الأسود.",
    medium: "⚔️ تمتلك سيف القسوة لكنك تحتفظ به في غمده... حتى يحين الوقت المناسب. الرحمة خيار، لا ضعف.",
    low: "🕊️ نادراً ما تظهر الوحش بداخلك. لا تزال بقايا من الرحمة تكبح جماح ظلامك الداخلي.",
  },
  manipulation: {
    high: "🐍 أنت سيد الدمى البشرية. تحرك الخيوط الخفية وتلوي عقول الضعفاء كما تشاء. الخداع فن تتقنه ببراعة شيطانية.",
    medium: "🎭 تلبس الأقنعة عند الحاجة. تستطيع التلاعب بالعقول لكنك تختار معاركك بحكمة مظلمة.",
    low: "📿 نادراً ما تستخدم ألاعيب الشياطين. الصراحة أحياناً تكون أقوى من الخداع... أو ربما أنت لا تملك الجرأة الكافية.",
  },
  chaos: {
    high: "💀 الفوضى هي عرشك والدمار هو مملكتك. تجد نشوة في تحطيم النظام وحرق القواعد. العالم يحترق أجمل في عينيك.",
    medium: "⚡ تقبل الفوضى كحليف مؤقت. تحب رؤية النظام ينهار... لكن ليس دائماً.",
    low: "🏛️ النظام درعك والقواعد سلاحك. تخشى الفوضى أو ربما تحتاج للنظام لإخفاء ضعفك.",
  },
  darkness: {
    high: "🌑 الظلام منزلك الأبدي. تعانق الأفكار الجهنمية وتتنفس الكآبة. النور يؤلمك والظلمة تغذيك.",
    medium: "🌓 تتأرجح بين العالمين. الظلام يناديك لكنك لم تستسلم له بالكامل... بعد.",
    low: "☀️ تهرب من الظلام كالجبناء. النور ملاذك الآمن من مخاوفك الداخلية.",
  },
  revenge: {
    high: "⚰️ الانتقام دمك الذي يجري في عروقك. لا تنسى... لا تسامح... لا ترحم. كل إساءة محفورة في ذاكرتك السوداء وستدفع بالدم.",
    medium: "🗡️ تفكر في الانتقام وتخطط له في الظلام. لكنك تنتظر اللحظة المثالية لتضرب.",
    low: "🕊️ تسامح بسهولة مريبة. ربما ضعف... ربما حكمة... أو ربما مجرد خوف من المواجهة.",
  },
};

const cunningSideDescriptions = {
  strategy: {
    high: "استراتيجي بارع. تخطط لكل خطوة بعناية فائقة.",
    medium: "تخطط للأمور المهمة. توازن بين التخطيط والعفوية.",
    low: "تفضل التصرف بعفوية. لا تحب التخطيط الزائد.",
  },
  analysis: {
    high: "محلل ممتاز. تقرأ المواقف والناس بدقة عالية.",
    medium: "تحلل المواقف المهمة. قدرات تحليل جيدة.",
    low: "تعتمد على الحدس أكثر من التحليل المنطقي.",
  },
  adaptation: {
    high: "تتكيف مع أي موقف بسرعة وسهولة. مرن للغاية.",
    medium: "تستطيع التكيف مع معظم المواقف. مرونة جيدة.",
    low: "تفضل البيئات المألوفة. التكيف يتطلب جهداً.",
  },
  intelligence: {
    high: "ذكاء حاد وقدرة على حل المشكلات المعقدة بسرعة.",
    medium: "ذكي وقادر على التعامل مع التحديات الفكرية.",
    low: "تفضل البساطة على التعقيد الفكري.",
  },
  patience: {
    high: "صبور للغاية. تنتظر اللحظة المناسبة بدون تسرع.",
    medium: "صبور في معظم المواقف. أحياناً تفقد الصبر.",
    low: "تفضل النتائج السريعة. الانتظار صعب عليك.",
  },
};

const goodSideDescriptions = {
  compassion: {
    high: "متعاطف جداً. تشعر بمعاناة الآخرين وتسعى لمساعدتهم.",
    medium: "متعاطف في المواقف المهمة. توازن بين التعاطف والعقلانية.",
    low: "عقلاني أكثر من عاطفي. لا تتأثر بسهولة بمشاعر الآخرين.",
  },
  kindness: {
    high: "طيب القلب للغاية. اللطف طبيعة ثانية لديك.",
    medium: "لطيف مع معظم الناس. توازن بين اللطف والحزم.",
    low: "مباشر أكثر من لطيف. الصدق أهم من اللطف.",
  },
  forgiveness: {
    high: "تسامح بسهولة كبيرة. لا تحمل ضغائن.",
    medium: "تسامح في معظم المواقف. بعض الأشياء يصعب نسيانها.",
    low: "من الصعب أن تسامح. تتذكر الإساءات.",
  },
  generosity: {
    high: "كريم جداً. تعطي بدون انتظار مقابل.",
    medium: "كريم في حدود المعقول. توازن بين العطاء والاحتفاظ.",
    low: "حذر في العطاء. تفكر جيداً قبل أن تعطي.",
  },
  love: {
    high: "قلبك مليء بالحب. تحب بعمق وإخلاص.",
    medium: "قادر على الحب والمودة. عواطفك متوازنة.",
    low: "تحمي قلبك. لا تعبر عن مشاعرك بسهولة.",
  },
};

const mysteriousSideDescriptions = {
  secrecy: {
    high: "تحتفظ بأسرار كثيرة. لا تشارك الكثير عن نفسك.",
    medium: "تحتفظ ببعض الأسرار. انتقائي فيما تشاركه.",
    low: "منفتح ومشارك. لا تخفي الكثير.",
  },
  enigma: {
    high: "لغز محير للآخرين. يصعب فهمك.",
    medium: "بعض الغموض في شخصيتك. ليس سهلاً قراءتك.",
    low: "واضح ومباشر. الناس يفهمونك بسهولة.",
  },
  isolation: {
    high: "تفضل العزلة والانفراد. مرتاح في عالمك الخاص.",
    medium: "توازن بين الوحدة والتواصل مع الآخرين.",
    low: "اجتماعي ويكره العزلة. تفضل التواصل.",
  },
  depth: {
    high: "عميق جداً في أفكارك ومشاعرك. تفكر بعمق.",
    medium: "تفكر بعمق في الأمور المهمة. عمق متوازن.",
    low: "عملي ومباشر. تفضل البساطة.",
  },
  shadow: {
    high: "تحب أن تبقى في الظل. لا تبحث عن الأضواء.",
    medium: "مرتاح في الظل والضوء. حسب الموقف.",
    low: "لا تخاف من الأضواء. مرتاح في الظهور.",
  },
};

const zodiacDescriptions = {
  cosmic: {
    high: "متصل بقوة مع الطاقات الكونية. تشعر بتأثير الكواكب.",
    medium: "تشعر ببعض التأثيرات الكونية. ارتباط متوازن.",
    low: "لا تشعر كثيراً بالتأثيرات الكونية. أكثر واقعية.",
  },
  intuition: {
    high: "حدسك قوي جداً. تثق في مشاعرك الداخلية.",
    medium: "حدس جيد. توازن بين الحدس والمنطق.",
    low: "تعتمد على المنطق أكثر من الحدس.",
  },
  spiritual: {
    high: "روحاني للغاية. تؤمن بقوى ما وراء المادة.",
    medium: "منفتح على الروحانيات. توازن مع الواقع.",
    low: "مادي أكثر من روحاني. تفضل الملموس.",
  },
  energy: {
    high: "تشعر بالطاقات من حولك بقوة. حساس للطاقات.",
    medium: "تشعر بالطاقات أحياناً. حساسية متوازنة.",
    low: "لا تشعر كثيراً بالطاقات. أكثر عملية.",
  },
  mystic: {
    high: "تنجذب للغموض الفلكي والأسرار الكونية.",
    medium: "مهتم بالأسرار الكونية بشكل معتدل.",
    low: "غير مهتم كثيراً بالأمور الغامضة.",
  },
};

const bigFiveDescriptions = {
  openness: {
    high: "لديك خيال واسع وفضول كبير. تحب التجارب الجديدة.",
    medium: "تجمع بين الإبداع والواقعية.",
    low: "تفضل الروتين والتقاليد. عملي ومباشر.",
  },
  conscientiousness: {
    high: "منظم ومنضبط. تخطط بعناية وتلتزم بالمواعيد.",
    medium: "توازن بين التنظيم والمرونة.",
    low: "مرن وعفوي. تفضل الطبيعية.",
  },
  extraversion: {
    high: "اجتماعي ونشيط. تستمد طاقتك من الآخرين.",
    medium: "متوازن بين الاجتماعية والخصوصية.",
    low: "تفضل الأنشطة الهادئة والتأمل.",
  },
  agreeableness: {
    high: "متعاطف ومتعاون. تسعى للانسجام.",
    medium: "متعاون لكنك تدافع عن آرائك.",
    low: "مباشر وصريح. تقدر الحقيقة.",
  },
  neuroticism: {
    high: "حساس عاطفياً. تشعر بالمشاعر بعمق.",
    medium: "استقرار عاطفي متوسط.",
    low: "هادئ ومستقر. تتعامل مع الضغوط بثقة.",
  },
};

const descriptionsMap: Record<TestTypeId, any> = {
  bigFive: bigFiveDescriptions,
  darkSide: darkSideDescriptions,
  cunningSide: cunningSideDescriptions,
  goodSide: goodSideDescriptions,
  mysteriousSide: mysteriousSideDescriptions,
  zodiac: zodiacDescriptions,
};

function getLevel(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

function getLevelLabel(score: number): string {
  if (score >= 70) return "عالي";
  if (score >= 40) return "متوسط";
  return "منخفض";
}

export function ResultsDisplay({ result, userName, userGender, testType, onBackToHome }: ResultsDisplayProps) {
  const traits = Object.entries(result.scores as Record<string, number>);
  const testConfig = testTypes[testType];
  const traitLabels = traitMaps[testType];
  const descriptions = descriptionsMap[testType];
  
  const iconMap = {
    bigFive: Brain,
    darkSide: Skull,
    cunningSide: Swords,
    goodSide: Heart,
    mysteriousSide: Eye,
    zodiac: Sparkles,
  };
  
  const ResultIcon = iconMap[testType];
  const isDarkSide = testType === 'darkSide';
  
  const genderText = userGender === "male" 
    ? `${userName}، إليك تحليل شامل لشخصيتك`
    : `${userName}، إليك تحليل شامل لشخصيتك`;
  const darkText = userGender === "male"
    ? `${userName}... ها هي حقيقتك المظلمة`
    : `${userName}... ها هي حقيقتك المظلمة`;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {onBackToHome && (
          <div className="flex justify-start">
            <Button
              onClick={onBackToHome}
              variant="ghost"
              className={`${isDarkSide ? 'text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-900/50' : 'text-purple-400 hover:text-purple-300'}`}
            >
              <Home className="w-5 h-5 ml-2" />
              العودة للصفحة الرئيسية
            </Button>
          </div>
        )}
        
        <div className="animate-float">
          <Card className={`shadow-2xl backdrop-blur-sm ${isDarkSide ? 'bg-black/80 border-red-600/50 border-2' : 'bg-card/90 border-primary/30'} relative overflow-hidden`}>
            {isDarkSide && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-black to-orange-950/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-red-500 rounded-full"
                      style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 3}s`,
                        boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
            {!isDarkSide && (
              <>
                <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              </>
            )}
            
            <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 relative z-10">
              <div className="flex justify-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ${isDarkSide ? 'bg-gradient-to-br from-red-900/60 to-orange-900/60 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-br from-primary/30 to-violet-500/30'} flex items-center justify-center relative transition-all duration-500 ${isDarkSide ? 'animate-pulse' : 'group-hover:scale-110'}`}>
                  {isDarkSide ? (
                    <>
                      <div className="absolute inset-0 rounded-full bg-red-600/60 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 blur-2xl animate-pulse" />
                      <Skull className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500 relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-violet-400/20 blur-xl" />
                      <ResultIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary relative z-10" />
                    </>
                  )}
                </div>
              </div>
              <div>
                <CardTitle className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 px-2 ${isDarkSide ? 'bg-gradient-to-r from-red-400 via-orange-400 to-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse' : 'bg-gradient-to-r from-purple-300 via-violet-300 to-fuchsia-300'} bg-clip-text text-transparent`} data-testid="text-result-title">
                  {isDarkSide ? '🔥 ' : ''}{testConfig.name}{isDarkSide ? ' 🔥' : ''}
                </CardTitle>
                <CardDescription className={`text-base sm:text-lg md:text-xl px-2 ${isDarkSide ? 'text-red-200/80' : ''}`}>
                  {isDarkSide ? darkText : genderText}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="animate-float" style={{ animationDelay: '0.1s' }}>
            <Card className={`shadow-2xl backdrop-blur-sm ${isDarkSide ? 'bg-black/70 border-red-600/40 border-2' : 'bg-card/90 border-primary/20'} h-full relative overflow-hidden`}>
              {isDarkSide && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-black/60 pointer-events-none" />
              )}
              <CardHeader className="relative z-10">
                <CardTitle className={`text-2xl ${isDarkSide ? 'bg-gradient-to-r from-red-300 to-orange-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-purple-200 to-violet-200'} bg-clip-text text-transparent`}>
                  {isDarkSide ? '💀 ' : ''}التمثيل البصري
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center min-h-[400px] relative z-10">
                <RadarChart 
                  scores={result.scores as Record<string, number>} 
                  traitLabels={traitLabels}
                  isDarkSide={isDarkSide}
                />
              </CardContent>
            </Card>
          </div>

          <div className="animate-float" style={{ animationDelay: '0.2s' }}>
            <Card className={`shadow-2xl backdrop-blur-sm ${isDarkSide ? 'bg-black/70 border-red-600/40 border-2' : 'bg-card/90 border-primary/20'} h-full relative overflow-hidden`}>
              {isDarkSide && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-black/60 pointer-events-none" />
              )}
              <CardHeader className="relative z-10">
                <CardTitle className={`text-2xl ${isDarkSide ? 'bg-gradient-to-r from-red-300 to-orange-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-purple-200 to-violet-200'} bg-clip-text text-transparent`}>
                  {isDarkSide ? '🔥 ' : ''}درجات السمات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                {traits.map(([trait, score]: [string, any], index) => (
                  <div key={trait} className="space-y-3 animate-float" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold text-lg ${isDarkSide ? 'text-red-200' : ''}`} data-testid={`text-trait-${trait}`}>
                        {traitLabels[trait as keyof typeof traitLabels]}
                      </span>
                      <div className="flex items-center gap-3">
                        <Badge variant={isDarkSide ? "destructive" : "secondary"} className={`text-sm ${isDarkSide ? 'shadow-[0_0_10px_rgba(239,68,68,0.4)]' : ''}`} data-testid={`badge-score-${trait}`}>
                          {getLevelLabel(score)}
                        </Badge>
                        <span className={`font-mono font-bold text-xl ${isDarkSide ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'text-primary'}`} data-testid={`text-score-${trait}`}>
                          {score}
                        </span>
                      </div>
                    </div>
                    <Progress value={score} className={`h-3 shadow-lg ${isDarkSide ? 'bg-red-950/50' : ''}`} data-testid={`progress-${trait}`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="animate-float" style={{ animationDelay: '0.3s' }}>
          <Card className={`shadow-2xl backdrop-blur-sm ${isDarkSide ? 'bg-black/70 border-red-600/40 border-2' : 'bg-card/90 border-primary/20'} relative overflow-hidden`}>
            {isDarkSide ? (
              <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-black/70" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5" />
            )}
            
            <CardHeader className="relative z-10">
              <CardTitle className={`text-2xl ${isDarkSide ? 'bg-gradient-to-r from-red-300 to-orange-300 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-purple-200 to-violet-200'} bg-clip-text text-transparent`}>
                {isDarkSide ? '⚰️ ' : ''}تفصيل السمات
              </CardTitle>
              <CardDescription className={`text-lg ${isDarkSide ? 'text-red-200/70' : ''}`}>
                {isDarkSide ? 'اكتشف عمق ظلامك الداخلي...' : 'اقرأ التفسير المفصل لكل سمة من سماتك'}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Accordion type="single" collapsible className="w-full">
                {traits.map(([trait, score]: [string, any]) => (
                  <AccordionItem key={trait} value={trait} className={isDarkSide ? 'border-red-900/30' : 'border-primary/10'}>
                    <AccordionTrigger className={`text-right ${isDarkSide ? 'hover:text-red-400' : 'hover:text-primary'} transition-colors`} data-testid={`accordion-${trait}`}>
                      <div className="flex items-center gap-4">
                        <span className={`font-semibold text-xl ${isDarkSide ? 'text-red-200' : ''}`}>{traitLabels[trait as keyof typeof traitLabels]}</span>
                        <Badge variant={isDarkSide ? "destructive" : "outline"} className={`text-sm ${isDarkSide ? 'shadow-[0_0_8px_rgba(239,68,68,0.4)]' : ''}`}>{score}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className={`text-base leading-relaxed pt-4 ${isDarkSide ? 'text-red-100/80' : 'text-muted-foreground'}`}>
                      {descriptions[trait][getLevel(score)]}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {result.aiInterpretation && (
          <div className="animate-float" style={{ animationDelay: '0.4s' }}>
            <Card className="shadow-2xl backdrop-blur-sm bg-gradient-to-br from-primary/10 to-violet-500/5 border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 shimmer pointer-events-none" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">التفسير بالذكاء الاصطناعي</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  تحليل مخصص لك بناءً على نتائجك الفريدة
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-lg leading-relaxed whitespace-pre-line" data-testid="text-ai-interpretation">
                  {result.aiInterpretation}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
