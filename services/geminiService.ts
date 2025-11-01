
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateProductDescription = async (keywords: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI description generation is unavailable. Please write a description manually.");
  }
  
  try {
    const prompt = `You are a marketing expert for a C2C fashion marketplace. Write a compelling and appealing product description based on these keywords: "${keywords}". 
    The description should be engaging for potential buyers. Highlight key features, suggest how it can be styled, and mention its condition if specified.
    Keep it concise, under 80 words, and use a friendly, enthusiastic tone. Do not use markdown.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "There was an error generating the description. Please try again or write one manually.";
  }
};
