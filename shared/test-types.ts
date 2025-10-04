export const testTypes = {
  bigFive: {
    id: "bigFive",
    name: "العوامل الخمسة الكبرى",
    description: "اختبار علمي معتمد لتحليل السمات الأساسية للشخصية",
    icon: "brain",
    questionCount: 50,
  },
  darkSide: {
    id: "darkSide",
    name: "الجانب الشرير",
    description: "اكتشف الجوانب المظلمة والغامضة في شخصيتك",
    icon: "skull",
    questionCount: 30,
  },
  cunningSide: {
    id: "cunningSide",
    name: "الجانب الخبيث",
    description: "قس مدى دهائك وقدرتك على التخطيط الاستراتيجي",
    icon: "chess",
    questionCount: 30,
  },
  goodSide: {
    id: "goodSide",
    name: "الجانب الطيب",
    description: "اكتشف مستوى التعاطف والخير في شخصيتك",
    icon: "heart",
    questionCount: 30,
  },
  mysteriousSide: {
    id: "mysteriousSide",
    name: "الجانب المريب",
    description: "تعرف على الغموض والأسرار التي تحيط بشخصيتك",
    icon: "eye",
    questionCount: 30,
  },
  zodiac: {
    id: "zodiac",
    name: "تحليل الأبراج",
    description: "تحليل شخصيتك بناءً على برجك الفلكي والطاقات الكونية",
    icon: "stars",
    questionCount: 25,
  },
  demonChat: {
    id: "demonChat",
    name: "محادثة مع الشيطان",
    description: "هل تجرؤ على التحدث مع الكيان المظلم؟ محادثة مرعبة مع شيطان يقرأ روحك...",
    icon: "flame",
    questionCount: 0,
  },
} as const;

export type TestTypeId = keyof typeof testTypes;
