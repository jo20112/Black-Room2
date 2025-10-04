import { ResultsDisplay } from "../ResultsDisplay";

export default function ResultsDisplayExample() {
  const mockResult = {
    id: "123",
    scores: {
      openness: 75,
      conscientiousness: 82,
      extraversion: 45,
      agreeableness: 68,
      neuroticism: 35,
    },
    aiInterpretation: "بناءً على نتائجك، أنت شخص منظم ومبدع في آن واحد. درجتك العالية في الضمير تشير إلى أنك موثوق ومسؤول، بينما انفتاحك يجعلك متقبلاً للأفكار الجديدة. هدوئك العاطفي وتوازنك الاجتماعي يساعدانك على بناء علاقات صحية مع الآخرين.",
    completedAt: new Date().toISOString(),
  };

  return <ResultsDisplay result={mockResult} userName="أحمد" testType="bigFive" />;
}
