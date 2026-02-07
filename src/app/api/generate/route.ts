
import { NextResponse } from 'next/server'
import { generateBlogPost } from '@/lib/ai/gemini'

export const maxDuration = 60 

export async function POST(request: Request) {
  try {
    const { topic, category } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    // Generate content using the new category-aware function
    const generatedContent = await generateBlogPost(topic, category || 'General')

    // Convert Markdown to Blocks
    const blocks = generatedContent.body.split('\n\n').map((line: string) => {
        if (line.startsWith('## ')) {
            return {
                style: 'h2',
                _type: 'block',
                children: [{ _type: 'span', text: line.replace('## ', '') }]
            }
        }
        if (line.startsWith('### ')) {
            return {
                style: 'h3',
                _type: 'block',
                children: [{ _type: 'span', text: line.replace('### ', '') }]
            }
        }
        // Handle lists - simplistic check
        if (line.startsWith('- ')) {
             return {
                style: 'normal',
                listItem: 'bullet',
                _type: 'block',
                children: [{ _type: 'span', text: line.replace('- ', '') }]
            }
        }
        return {
            style: 'normal',
            _type: 'block',
            children: [{ _type: 'span', text: line }]
        }
    })

    return NextResponse.json({
        success: true,
        title: generatedContent.title,
        slug: generatedContent.slug,
        body: blocks,
        publishedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Generation Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
