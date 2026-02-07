
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getPromptForCategory } from '@/lib/ai/prompts'

// Remove top-level await/check for build safety
// export const model = ... // Moved inside function to avoid build-time error

export async function generateBlogPost(keyword: string, category: string) {
  const apiKey = process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  
  // Basic cleanup to ensure JSON parsing if the model wraps it in code blocks
  const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
  
  try {
    return JSON.parse(cleanText)
  } catch (e) {
    console.error("Failed to parse JSON from Gemini:", text)
    throw new Error("Invalid JSON response from AI")
  }
}
