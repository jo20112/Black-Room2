import { pgTable, serial, varchar, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  testType: varchar("test_type", { length: 50 }).notNull(),
  scores: jsonb("scores").notNull(),
  aiInterpretation: text("ai_interpretation"),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertTestResultSchema = createInsertSchema(testResults).omit({ id: true, completedAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;

export const bigFiveTraits = {
  openness: "الانفتاح",
  conscientiousness: "الضمير",
  extraversion: "الانبساط",
  agreeableness: "التوافق",
  neuroticism: "العصابية",
} as const;

export const darkSideTraits = {
  cruelty: "القسوة",
  manipulation: "التلاعب",
  chaos: "الفوضى",
  darkness: "الظلام",
  revenge: "الانتقام",
} as const;

export const cunningSideTraits = {
  strategy: "الاستراتيجية",
  analysis: "التحليل",
  adaptation: "التكيف",
  intelligence: "الذكاء",
  patience: "الصبر",
} as const;

export const goodSideTraits = {
  compassion: "التعاطف",
  kindness: "اللطف",
  forgiveness: "التسامح",
  generosity: "الكرم",
  love: "الحب",
} as const;

export const mysteriousSideTraits = {
  secrecy: "السرية",
  enigma: "اللغز",
  isolation: "العزلة",
  depth: "العمق",
  shadow: "الظل",
} as const;

export const zodiacTraits = {
  cosmic: "الكوني",
  intuition: "الحدس",
  spiritual: "الروحي",
  energy: "الطاقة",
  mystic: "الغموض الفلكي",
} as const;

export type TraitKey = keyof typeof bigFiveTraits;
export type DarkSideTraitKey = keyof typeof darkSideTraits;
export type CunningSideTraitKey = keyof typeof cunningSideTraits;
export type GoodSideTraitKey = keyof typeof goodSideTraits;
export type MysteriousSideTraitKey = keyof typeof mysteriousSideTraits;
export type ZodiacTraitKey = keyof typeof zodiacTraits;

export const questionSchema = z.object({
  id: z.number(),
  text: z.string(),
  trait: z.enum(["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"]),
  reverse: z.boolean(),
});

export const answerSchema = z.object({
  questionId: z.number(),
  value: z.number().min(1).max(5),
});

export type Question = z.infer<typeof questionSchema>;
export type Answer = z.infer<typeof answerSchema>;

export type BigFiveScores = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};

export type DarkSideScores = {
  cruelty: number;
  manipulation: number;
  chaos: number;
  darkness: number;
  revenge: number;
};

export type CunningSideScores = {
  strategy: number;
  analysis: number;
  adaptation: number;
  intelligence: number;
  patience: number;
};

export type GoodSideScores = {
  compassion: number;
  kindness: number;
  forgiveness: number;
  generosity: number;
  love: number;
};

export type MysteriousSideScores = {
  secrecy: number;
  enigma: number;
  isolation: number;
  depth: number;
  shadow: number;
};

export type ZodiacScores = {
  cosmic: number;
  intuition: number;
  spiritual: number;
  energy: number;
  mystic: number;
};

export type TestScores = 
  | BigFiveScores 
  | DarkSideScores 
  | CunningSideScores 
  | GoodSideScores 
  | MysteriousSideScores 
  | ZodiacScores;
