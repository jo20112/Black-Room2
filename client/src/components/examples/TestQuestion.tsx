import { TestQuestion } from "../TestQuestion";

export default function TestQuestionExample() {
  return (
    <TestQuestion
      question={{
        id: 1,
        text: "أستمتع بتجربة أشياء جديدة ومختلفة",
        trait: "openness",
        reverse: false,
      }}
      currentIndex={0}
      totalQuestions={50}
      onAnswer={(value) => console.log("إجابة:", value)}
      canGoBack={false}
      onBack={() => console.log("رجوع")}
    />
  );
}
