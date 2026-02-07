import { GoogleGenAI } from "@google/genai";
import { getPromptForCategory } from '@/lib/ai/prompts'

export async function generateBlogPost(keyword: string, category: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY
  
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or GOOGLE_API_KEY environment variable')
  }

  // Inicializar el cliente con la API Key
  const ai = new GoogleGenAI({ apiKey });

  const prompt = getPromptForCategory(category, keyword) + `
    
    Formato de respuesta JSON requerido (MANTÉN ESTE FORMATO EXACTO):
    {
      "title": "Título SEO Optimizado (Max 60 caracteres)",
      "slug": "titulo-seo-optimizado-url-friendly",
      "description": "Meta descripción atractiva (150-160 caracteres)",
      "body": "Contenido del artículo en Markdown. Usa # para título (aunque no se usará), ## para secciones, ### para subsecciones. Incluye listas y negritas."
    }
    
    NO incluyas bloques de código (\`\`\`json). Devuelve SOLO el JSON raw.
  `

  try {
    // Ejecutar la generación con Gemini 3 Flash
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    // text es un getter, no un método
    const text = response.text;
    
    // Basic cleanup
    const cleanText = text ? text.replace(/```json/g, '').replace(/```/g, '').trim() : "{}"
    
    return JSON.parse(cleanText)
  } catch (e) {
    console.error("Failed to generate content with Gemini 3 Flash:", e)
    throw new Error("AI Generation Failed: " + (e as Error).message)
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("Missing Gemini API Key");

  const ai = new GoogleGenAI({ apiKey });

  try {
    // Para embeddings, usamos el modelo de embeddings
    const response = await ai.models.embedContent({
      model: "text-embedding-004",
      contents: text
    });

    // embeddings es un array, tomamos el primer elemento
    if (response.embeddings && response.embeddings.length > 0 && response.embeddings[0].values) {
        return response.embeddings[0].values;
    }
    
    throw new Error("Invalid embedding response structure");

  } catch (e) {
      console.error("Embedding generation failed:", e);
      throw e;
  }
}
