// import OpenAI from "openai";
import config from "../../config";

// export const openai = new OpenAI({
//     apiKey: config.open_ai_api_key,
// });

import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini Client
// Make sure config.gemini_api_key points to your Gemini API key in your .env file
export const ai = new GoogleGenAI({
    apiKey: config.gemini_api_key as string, 
});