import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Track & log unhandled promise rejections during boot/runtime safely
process.on("unhandledRejection", (reason, promise) => {
  console.error("CRITICAL: Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("CRITICAL: Uncaught Exception thrown:", error);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  let aiInstance: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI {
    if (!aiInstance) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiInstance = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiInstance;
  }

  // API Route for AI Hinting
  app.post("/api/gemini/hint", async (req, res) => {
    try {
      const { lessonTitle, userCode, taskDescription } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `You are a cyberpunk hacker mentor named 'Synapse'. The user is stuck on the lesson "${lessonTitle}": ${taskDescription}\nUser code:\n${userCode}\nProvide a supportive remark, a brief conceptual explanation, and a small code snippet to help them move forward.`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              remark: { type: Type.STRING, description: "A thematic helpful remark" },
              concept: { type: Type.STRING, description: "Bite-sized technical explanation" },
              snippet: { type: Type.STRING, description: "Helpful partial code snippet" }
            },
            required: ["remark", "concept", "snippet"]
          }
        }
      });
      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Server API key or request error in getAIHint proxy:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // API Route for AI Code Evaluation
  app.post("/api/gemini/check-code", async (req, res) => {
    try {
      const { userCode, lessonTitle, taskDescription, solutionRegex, inputs } = req.body;
      const inputContext = inputs?.length ? `\nInputs provided during execution: ${inputs.join(', ')}` : "";
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Evaluate the following Python code for correctness based on the mission requirements.\nLesson: ${lessonTitle}\nTask: ${taskDescription}\nRequired Patterns (Regex): ${solutionRegex.join(' AND ')}\nUser Code:\n${userCode}${inputContext}\nDetermine if they succeeded, provide thematic feedback, and list any syntax or logic errors.`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              success: { type: Type.BOOLEAN },
              feedback: { type: Type.STRING },
              output: { type: Type.STRING },
              errors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    line: { type: Type.NUMBER },
                    message: { type: Type.STRING },
                    type: { type: Type.STRING }
                  },
                  required: ["line", "message", "type"]
                }
              }
            },
            required: ["success", "feedback", "output", "errors"]
          }
        }
      });
      res.json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Server API key or request error in checkCodeWithAI proxy:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // API Route for AI Retheming Lessons
  app.post("/api/gemini/retheme", async (req, res) => {
    try {
      const { interest, currentLessons } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `You are a theme generator. Re-theme the following Python programming curriculum to match a user's interest in: "${interest}". \nPreserve the underlying programming logic but change the story, variables, and context.\n\nCurrent Lessons:\n${JSON.stringify(currentLessons.slice(0, 15))}\n\nReturn an array of themed lesson objects.`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                headerPrefix: { type: Type.STRING },
                missionPrefix: { type: Type.STRING },
                intro: { type: Type.STRING },
                technical: { type: Type.STRING },
                example: { type: Type.STRING },
                task: { type: Type.STRING },
                baseCode: { type: Type.STRING },
                hints: { type: Type.ARRAY, items: { type: Type.STRING } },
                solution: { type: Type.STRING },
                solutionRegex: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["id", "title", "description", "intro", "task", "baseCode", "hints", "solution", "solutionRegex"]
            }
          }
        }
      });
      res.json(JSON.parse(response.text || "[]"));
    } catch (error: any) {
      console.error("Server API key or request error in rethemeLessons proxy:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Serve compiled 'dist' files if they exist; otherwise, fall back to Vite development middleware.
  // This is highly robust and prevents startup ENOENT crashes if build hasn't run.
  const distPath = path.join(process.cwd(), 'dist');
  const isProduction = process.env.NODE_ENV === "production" || !fs.existsSync(path.join(process.cwd(), "server.ts"));

  if (!isProduction) {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Set no-cache headers for HTML files in development to prevent browser caching stale code
    app.use((req, res, next) => {
      if (req.path === "/" || req.path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      }
      next();
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const ext = path.extname(req.path);
      if (ext && !['.html', '.htm'].includes(ext)) {
        return next();
      }

      try {
        const url = req.originalUrl;
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        if (vite && typeof vite.ssrFixStacktrace === 'function') {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    console.log("Starting server in production/static mode serving compiled dist files...");
    
    // Serve static files with no-cache headers for index.html to prevent asset hash mismatch issues
    app.use(express.static(distPath, {
      setHeaders: (res, filepath) => {
        if (filepath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }
    }));

    app.get('*', (req, res) => {
      // If the request has an extension and is not an HTML file, do not fall back to index.html
      const ext = path.extname(req.path);
      if (ext && !['.html', '.htm'].includes(ext)) {
        res.status(404).send('Not Found');
        return;
      }

      const indexPath = path.join(distPath, 'index.html');
      if (!fs.existsSync(indexPath)) {
        res.status(503).send("Application is starting or compiling... Please refresh the page in a few seconds.");
        return;
      }
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("CRITICAL: Failed to start the server:", err);
  process.exit(1);
});
