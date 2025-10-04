import { users, testResults, type User, type InsertUser, type TestResult, type InsertTestResult } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByName(name: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  createTestResult(testResult: InsertTestResult): Promise<TestResult>;
  getUserTestResults(userId: number): Promise<TestResult[]>;
  getTestResult(id: number): Promise<TestResult | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByName(name: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.name, name));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async createTestResult(insertTestResult: InsertTestResult): Promise<TestResult> {
    const [testResult] = await db
      .insert(testResults)
      .values(insertTestResult)
      .returning();
    return testResult;
  }

  async getUserTestResults(userId: number): Promise<TestResult[]> {
    return await db
      .select()
      .from(testResults)
      .where(eq(testResults.userId, userId));
  }

  async getTestResult(id: number): Promise<TestResult | undefined> {
    const [testResult] = await db
      .select()
      .from(testResults)
      .where(eq(testResults.id, id));
    return testResult || undefined;
  }
}

export const storage = new DatabaseStorage();
