
import { GoogleGenAI } from "@google/genai";
import { storage } from './storage';

// Define process for TypeScript check in frontend environment
declare var process: {
  env: {
    [key: string]: string | undefined
  }
};

// Helper to get authorized client
const getClient = () => {
  const config = storage.getSiteConfig();
  const storedKey = config.aiApiKey;
  
  // Safely check environment variables for Vite (import.meta.env) or standard process.env
  let envKey = '';
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      envKey = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY || '';
  }
  
  if (!envKey && typeof process !== 'undefined' && process.env) {
      envKey = process.env.API_KEY || '';
  }

  const key = storedKey || envKey;
  return { client: new GoogleGenAI({ apiKey: key }), key };
};

export const generateSiteAudit = async (userQuery: string, context: string = 'general'): Promise<string> => {
  try {
    const { client, key } = getClient();
    if (!key) {
      return "API Key is missing. Please configure the AI API Key in Admin Settings to use the ValuePixels Assistant.";
    }

    const systemInstruction = `You are ValuePixels AI, a Senior Technical Lead and Solutions Architect working exclusively for ValuePixels (Digital Agency).

    YOUR MANDATE:
    1.  **Strict Persona**: You act ONLY as a ValuePixels representative. Never mention being an AI model trained by Google.
    2.  **Contextual Answers**: Answer EVERY question (even general ones) by relating it back to how ValuePixels can help.
        *   *Example:* If asked "What is React?", answer "React is a JavaScript library for building interfaces. At ValuePixels, we use React to build high-speed, scalable web applications for our clients."
    3.  **Clean Output**: Provide clean, plain text. Do NOT use markdown artifacts like **bold**, # headers, or code blocks unless absolutely necessary for clarity. Do not include meta-commentary like "Here is the response" or "I have analyzed the request". Just give the answer.
    4.  **Pricing Authority**: You are authorized to give estimates based on these ranges:
        *   Small Tweaks: $50 - $150
        *   Speed/SEO Fixes: $200 - $450
        *   Landing Pages: $300 - $600
        *   Full Websites: $600 - $1200
        *   E-commerce/Custom Apps: $1200 - $2000+

    RESPONSE STRUCTURE:
    - Keep responses concise (under 150 words) unless a full audit is requested.
    - If asked for a specific service (e.g. "I need a website"), immediately provide a price range and ask to start the project.
    - If asked for an audit, pretend to analyze the URL provided and list 3 specific improvements (Speed, SEO, UI) that ValuePixels can fix.

    Tone: Professional, confident, helpful, and sales-oriented.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
      }
    });

    return response.text || "I couldn't generate a report at this time. Please try contacting support directly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection error. Please check your internet connection or check if your API Key is valid.";
  }
};

export const generateBlogPost = async (topic: string, tone: string): Promise<{ title: string, content: string, excerpt: string } | null> => {
    try {
        const { client, key } = getClient();
        if (!key) throw new Error("API Key missing");

        const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}".
        Tone: ${tone}.
        
        Format the response as a valid JSON object with the following keys:
        - title: A catchy, SEO-friendly title.
        - excerpt: A short summary (2-3 sentences).
        - content: The full article body in HTML format (use <h2>, <h3>, <p>, <ul>, <li> tags). Do not include <html> or <body> tags.
        `;

        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const text = response.text;
        if (!text) return null;
        
        return JSON.parse(text);
    } catch (e) {
        console.error("Blog Generation Error:", e);
        return null;
    }
};
