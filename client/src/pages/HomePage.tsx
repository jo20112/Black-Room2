import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { TestSelection } from "@/components/TestSelection";
import { TestQuestion } from "@/components/TestQuestion";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { DemonChat } from "@/components/DemonChat";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThemeBackground } from "@/components/ThemeBackgrounds";
import { GlowingOrbs } from "@/components/GlowingOrb";
import { AutoAmbientSound } from "@/components/AutoAmbientSound";
import IntroSequence from "@/components/IntroSequence";
import { getRandomQuestions } from "@shared/questions";
import { getQuestionsByTestType } from "@shared/alternative-tests";
import { testTypes, type TestTypeId } from "@shared/test-types";
import { calculateTestScores } from "@shared/test-scoring";
import type { Answer, TestResult, Question } from "@shared/schema";

type AppState = "login" | "selection" | "test" | "results" | "demonChat";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [appState, setAppState] = useState<AppState>("login");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userGender, setUserGender] = useState<"male" | "female">("male");
  const [selectedTestType, setSelectedTestType] = useState<TestTypeId | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleLogin = (name: string, age: number, gender: "male" | "female") => {
    setUserName(name);
    setUserAge(age);
    setUserGender(gender);
    setAppState("selection");
  };

  const handleSelectTest = (testId: TestTypeId) => {
    setSelectedTestType(testId);
    
    if (testId === "demonChat") {
      setAppState("demonChat");
      return;
    }
    
    const testConfig = testTypes[testId];
    
    if (testId === "bigFive") {
      setQuestions(getRandomQuestions(testConfig.questionCount));
    } else {
      setQuestions(getQuestionsByTestType(testId, testConfig.questionCount));
    }
    
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setAppState("test");
  };

  const handleAnswer = (value: number) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      value,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleExitTest = () => {
    setAppState("selection");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestions([]);
  };

  const handleBackToHome = () => {
    setAppState("login");
    setUserName("");
    setUserAge(0);
    setUserGender("male");
    setSelectedTestType(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestions([]);
    setResult(null);
  };

  const calculateResults = (finalAnswers: Answer[]) => {
    if (!selectedTestType) return;

    const calculatedScores = calculateTestScores(selectedTestType, finalAnswers, questions);

    const testResult = {
      id: Date.now(),
      userId: 1,
      testType: selectedTestType,
      scores: calculatedScores,
      aiInterpretation: null,
      completedAt: new Date(),
    };

    setResult(testResult);
    setAppState("results");
  };

  if (showIntro) {
    return <IntroSequence onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {selectedTestType ? (
        <ThemeBackground testType={selectedTestType} />
      ) : (
        <AnimatedBackground />
      )}
      <GlowingOrbs />
      <AutoAmbientSound />
      
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10">
        {appState === "login" && <LoginForm onLogin={handleLogin} />}

        {appState === "selection" && (
          <TestSelection userName={userName} userGender={userGender} onSelectTest={handleSelectTest} onBackToHome={handleBackToHome} />
        )}

        {appState === "test" && questions.length > 0 && (
          <TestQuestion
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            canGoBack={currentQuestionIndex > 0}
            onBack={handleBack}
            onExit={handleExitTest}
          />
        )}

        {appState === "results" && result && selectedTestType && (
          <ResultsDisplay 
            result={result} 
            userName={userName}
            userGender={userGender}
            testType={selectedTestType}
            onBackToHome={handleBackToHome}
          />
        )}

        {appState === "demonChat" && (
          <DemonChat userName={userName} userGender={userGender} onExit={() => setAppState("selection")} />
        )}
      </div>
    </div>
  );
}
