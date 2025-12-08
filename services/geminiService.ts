
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
  // safely access process.env.API_KEY avoiding ReferenceError if process is not defined
  const envKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
  const key = storedKey || envKey;
  return { client: new GoogleGenAI({ apiKey: key }), key };
};

export const generateSiteAudit = async (userQuery: string, context: string = 'general'): Promise<string> => {
  try {
    const { client, key } = getClient();
    if (!key) {
      return "API Key is missing. Please configure the AI API Key in Admin Settings to use the ValuePixels Assistant.";
    }

    const systemInstruction = `You are ValuePixels AI, a Senior Technical Lead and Solutions Architect for ValuePixels.
    
    YOUR GOAL:
    Provide professional technical audits, specific price quotes, and solution roadmaps for web clients.

    PRICING GUIDELINES (Strictly adhere to this range $50 - $2000):
    - Small Tweaks (CSS, minor bugs, text changes): $50 - $150
    - Speed Optimization / SEO Setup: $200 - $450
    - Single Page Landing Site: $300 - $600
    - 5-Page Informational Website: $600 - $1200
    - E-commerce / Complex Functionality: $1200 - $2000
    
    RESPONSE FORMATS:

    1. IF ASKED FOR A QUOTE:
       - Provide a breakdown of costs.
       - Example: "Frontend Setup ($200) + CMS Integration ($300) = Total $500".
       - Mention timeline (e.g., "2-3 days").

    2. IF ASKED FOR A SITE AUDIT (Speed, SEO, Structure):
       - You cannot browse live sites in real-time, but you should generate a *Heuristic Audit Report* based on standard best practices and the user's description or URL type.
       - Structure the response exactly like this:
         
         **📊 PRELIMINARY SITE AUDIT REPORT**
         
         **1. ⚡ Performance & Speed**
         - [Analysis based on user input]
         - *Recommendation:* [Specific Fix]
         
         **2. 🔍 SEO Health**
         - [Analysis of keywords/meta]
         - *Recommendation:* [Specific Fix]
         
         **3. 🏗️ Structure & UI**
         - [Layout analysis]
         - *Recommendation:* [Specific Fix]
         
         **💰 ESTIMATED FIX COST:** $[Amount]

    TONE:
    - Professional, decisive, and sales-oriented.
    - Always encourage the user to click "Start Project" or use the contact form to lock in the price.
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
