import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTestResultSchema } from "@shared/schema";
import { generateDemonResponse } from "./demon-ai";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('فقط الصور مسموحة!'));
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }, (req, res, next) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    req.url = req.url.split('?')[0];
    return (require('express').static(uploadDir))(req, res, next);
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByName(userData.name);
      
      if (existingUser) {
        return res.json({ user: existingUser });
      }

      const user = await storage.createUser(userData);
      res.json({ user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "المستخدم غير موجود" });
      }

      res.json({ user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      
      const user = await storage.updateUser(userId, updates);
      
      if (!user) {
        return res.status(404).json({ error: "المستخدم غير موجود" });
      }

      res.json({ user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/upload-profile-image/:userId", upload.single('profileImage'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "لم يتم رفع أي صورة" });
      }

      const userId = parseInt(req.params.userId);
      const imageUrl = `/uploads/${req.file.filename}`;
      
      const user = await storage.updateUser(userId, { profileImage: imageUrl });
      
      if (!user) {
        return res.status(404).json({ error: "المستخدم غير موجود" });
      }

      res.json({ user, imageUrl });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/test-results", async (req, res) => {
    try {
      const testResultData = insertTestResultSchema.parse(req.body);
      const testResult = await storage.createTestResult(testResultData);
      res.json({ testResult });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:userId/test-results", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const testResults = await storage.getUserTestResults(userId);
      res.json({ testResults });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/test-results/:id", async (req, res) => {
    try {
      const testId = parseInt(req.params.id);
      const testResult = await storage.getTestResult(testId);
      
      if (!testResult) {
        return res.status(404).json({ error: "نتيجة الاختبار غير موجودة" });
      }

      res.json({ testResult });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/demon-chat", async (req, res) => {
    try {
      const { userMessage, userName, conversationHistory } = req.body;
      
      if (!userMessage || !userName) {
        return res.status(400).json({ error: "رسالة المستخدم والاسم مطلوبان" });
      }

      const response = await generateDemonResponse(userMessage, userName, conversationHistory || []);
      
      res.json({ response });
    } catch (error: any) {
      console.error("Demon chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
