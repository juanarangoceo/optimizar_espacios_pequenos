
import { GoogleGenerativeAI } from '@google/generative-ai'

// Remove top-level await/check for build safety
// export const model = ... // Moved inside function to avoid build-time error

export async function generateBlogPost(keyword: string, category: string) {
  const apiKey = process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `
    Act as an expert interior designer and professional automation blogger.
    Write a comprehensive, engaging, and SEO-optimized blog post about "${keyword}" in the category "${category}".
    
    Structure the response in JSON format with the following fields:
    - title: Catchy, SEO-friendly title.
    - slug: URL-friendly slug based on the title.
    - description: A short meta description (150-160 characters).
    - body: The full blog post content in Markdown format. Use H2, H3, bullet points, and bold text for readability.
    - tags: An array of 5 relevant tags.
    
    Ensure the tone is helpful, inspiring, and practical for people with small spaces.
    RETURN ONLY JSON. NO MARKDOWN BLOCK.
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
