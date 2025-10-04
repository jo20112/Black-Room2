import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, ArrowRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Question } from "@shared/schema";

interface TestQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
  canGoBack: boolean;
  onBack: () => void;
  onExit?: () => void;
}

const answerOptions = [
  { value: 1, label: "لا أوافق بشدة" },
  { value: 2, label: "لا أوافق" },
  { value: 3, label: "محايد" },
  { value: 4, label: "أوافق" },
  { value: 5, label: "أوافق بشدة" },
];

export function TestQuestion({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  canGoBack,
  onBack,
  onExit,
}: TestQuestionProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="w-full max-w-3xl mx-auto space-y-8 flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {canGoBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                data-testid="button-back"
                className="hover-elevate active-elevate-2"
                title="السؤال السابق"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {onExit && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-testid="button-exit"
                    className="hover-elevate active-elevate-2 text-destructive hover:text-destructive"
                    title="إنهاء الاختبار"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="backdrop-blur-sm bg-card/95">
                  <AlertDialogHeader>
                    <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                    <AlertDialogDescription>
                      سيتم فقدان تقدمك في الاختبار. هل تريد الخروج؟
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onExit}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      خروج
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span data-testid="text-question-number">
              السؤال {currentIndex + 1} من {totalQuestions}
            </span>
            <span data-testid="text-progress">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 shadow-lg" data-testid="progress-test" />
        </div>

        <div className="animate-float">
          <Card className="flex-1 flex flex-col shadow-2xl backdrop-blur-sm bg-card/90 border-primary/20 relative overflow-hidden group">
            <div className="absolute inset-0 shimmer pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
            
            <CardContent className="p-8 md:p-12 flex flex-col justify-center flex-1 relative z-10">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent px-2" data-testid="text-question">
                {question.text}
              </h2>

              <div className="space-y-2 sm:space-y-3">
                {answerOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className="animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-auto py-3 sm:py-4 md:py-5 px-4 sm:px-5 md:px-6 text-sm sm:text-base md:text-lg justify-start hover-elevate active-elevate-2 border-primary/20 transition-all duration-300 group/btn relative overflow-hidden"
                      onClick={() => onAnswer(option.value)}
                      data-testid={`button-answer-${option.value}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="font-mono text-primary ml-2 sm:ml-3 md:ml-4 relative z-10">{option.value}</span>
                      <span className="flex-1 relative z-10 text-right">{option.label}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
