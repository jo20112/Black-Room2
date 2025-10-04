import type { Answer } from "./schema";
import type { TestTypeId } from "./test-types";
import type {
  BigFiveScores,
  DarkSideScores,
  CunningSideScores,
  GoodSideScores,
  MysteriousSideScores,
  ZodiacScores,
} from "./schema";

export function calculateTestScores(
  testType: TestTypeId,
  answers: Answer[],
  questions: any[]
): any {
  switch (testType) {
    case "bigFive":
      return calculateBigFiveScores(answers, questions);
    case "darkSide":
      return calculateDarkSideScores(answers, questions);
    case "cunningSide":
      return calculateCunningSideScores(answers, questions);
    case "goodSide":
      return calculateGoodSideScores(answers, questions);
    case "mysteriousSide":
      return calculateMysteriousSideScores(answers, questions);
    case "zodiac":
      return calculateZodiacScores(answers, questions);
    default:
      return calculateBigFiveScores(answers, questions);
  }
}

function calculateBigFiveScores(
  answers: Answer[],
  questions: any[]
): BigFiveScores {
  const traits: Record<string, number[]> = {
    openness: [],
    conscientiousness: [],
    extraversion: [],
    agreeableness: [],
    neuroticism: [],
  };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const score = question.reverse ? 6 - answer.value : answer.value;
    traits[question.trait].push(score);
  });

  return {
    openness: calculateAverage(traits.openness),
    conscientiousness: calculateAverage(traits.conscientiousness),
    extraversion: calculateAverage(traits.extraversion),
    agreeableness: calculateAverage(traits.agreeableness),
    neuroticism: calculateAverage(traits.neuroticism),
  };
}

function calculateDarkSideScores(
  answers: Answer[],
  questions: any[]
): DarkSideScores {
  const totalQuestions = answers.length;
  const questionsPerTrait = Math.ceil(totalQuestions / 5);

  const crueltyScores: number[] = [];
  const manipulationScores: number[] = [];
  const chaosScores: number[] = [];
  const darknessScores: number[] = [];
  const revengeScores: number[] = [];

  answers.forEach((answer, index) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const score = question.reverse ? 6 - answer.value : answer.value;
    const traitIndex = Math.floor(index / questionsPerTrait);

    switch (traitIndex) {
      case 0:
        crueltyScores.push(score);
        break;
      case 1:
        manipulationScores.push(score);
        break;
      case 2:
        chaosScores.push(score);
        break;
      case 3:
        darknessScores.push(score);
        break;
      default:
        revengeScores.push(score);
    }
  });

  return {
    cruelty: calculateAverage(crueltyScores),
    manipulation: calculateAverage(manipulationScores),
    chaos: calculateAverage(chaosScores),
    darkness: calculateAverage(darknessScores),
    revenge: calculateAverage(revengeScores),
  };
}

function calculateCunningSideScores(
  answers: Answer[],
  questions: any[]
): CunningSideScores {
  const totalQuestions = answers.length;
  const questionsPerTrait = Math.ceil(totalQuestions / 5);

  const strategyScores: number[] = [];
  const analysisScores: number[] = [];
  const adaptationScores: number[] = [];
  const intelligenceScores: number[] = [];
  const patienceScores: number[] = [];

  answers.forEach((answer, index) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const score = question.reverse ? 6 - answer.value : answer.value;
    const traitIndex = Math.floor(index / questionsPerTrait);

    switch (traitIndex) {
      case 0:
        strategyScores.push(score);
        break;
      case 1:
        analysisScores.push(score);
        break;
      case 2:
        adaptationScores.push(score);
        break;
      case 3:
        intelligenceScores.push(score);
        break;
      default:
        patienceScores.push(score);
    }
  });

  return {
    strategy: calculateAverage(strategyScores),
    analysis: calculateAverage(analysisScores),
    adaptation: calculateAverage(adaptationScores),
    intelligence: calculateAverage(intelligenceScores),
    patience: calculateAverage(patienceScores),
  };
}

function calculateGoodSideScores(
  answers: Answer[],
  questions: any[]
): GoodSideScores {
  const totalQuestions = answers.length;
  const questionsPerTrait = Math.ceil(totalQuestions / 5);

  const compassionScores: number[] = [];
  const kindnessScores: number[] = [];
  const forgivenessScores: number[] = [];
  const generosityScores: number[] = [];
  const loveScores: number[] = [];

  answers.forEach((answer, index) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const score = question.reverse ? 6 - answer.value : answer.value;
    const traitIndex = Math.floor(index / questionsPerTrait);

    switch (traitIndex) {
      case 0:
        compassionScores.push(score);
        break;
      case 1:
        kindnessScores.push(score);
        break;
      case 2:
        forgivenessScores.push(score);
        break;
      case 3:
        generosityScores.push(score);
        break;
      default:
        loveScores.push(score);
    }
  });

  return {
    compassion: calculateAverage(compassionScores),
    kindness: calculateAverage(kindnessScores),
    forgiveness: calculateAverage(forgivenessScores),
    generosity: calculateAverage(generosityScores),
    love: calculateAverage(loveScores),
  };
}

function calculateMysteriousSideScores(
  answers: Answer[],
  questions: any[]
): MysteriousSideScores {
  const totalQuestions = answers.length;
  const questionsPerTrait = Math.ceil(totalQuestions / 5);

  const secrecyScores: number[] = [];
  const enigmaScores: number[] = [];
  const isolationScores: number[] = [];
  const depthScores: number[] = [];
  const shadowScores: number[] = [];

  answers.forEach((answer, index) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const score = question.reverse ? 6 - answer.value : answer.value;
    const traitIndex = Math.floor(index / questionsPerTrait);

    switch (traitIndex) {
      case 0:
        secrecyScores.push(score);
        break;
      case 1:
        enigmaScores.push(score);
        break;
      case 2:
        isolationScores.push(score);
        break;
      case 3:
        depthScores.push(score);
        break;
      default:
        shadowScores.push(score);
    }
  });

  return {
    secrecy: calculateAverage(secrecyScores),
    enigma: calculateAverage(enigmaScores),
    isolation: calculateAverage(isolationScores),
    depth: calculateAverage(depthScores),
    shadow: calculateAverage(shadowScores),
  };
}

function calculateZodiacScores(
  answers: Answer[],
  questions: any[]
): ZodiacScores {
  const totalQuestions = answers.length;
  const questionsPerTrait = Math.ceil(totalQuestions / 5);

  const cosmicScores: number[] = [];
  const intuitionScores: number[] = [];
  const spiritualScores: number[] = [];
  const energyScores: number[] = [];
  const mysticScores: number[] = [];

  answers.forEach((answer, index) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const score = question.reverse ? 6 - answer.value : answer.value;
    const traitIndex = Math.floor(index / questionsPerTrait);

    switch (traitIndex) {
      case 0:
        cosmicScores.push(score);
        break;
      case 1:
        intuitionScores.push(score);
        break;
      case 2:
        spiritualScores.push(score);
        break;
      case 3:
        energyScores.push(score);
        break;
      default:
        mysticScores.push(score);
    }
  });

  return {
    cosmic: calculateAverage(cosmicScores),
    intuition: calculateAverage(intuitionScores),
    spiritual: calculateAverage(spiritualScores),
    energy: calculateAverage(energyScores),
    mystic: calculateAverage(mysticScores),
  };
}

function calculateAverage(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  const average = sum / scores.length;
  return Math.round((average / 5) * 100);
}
