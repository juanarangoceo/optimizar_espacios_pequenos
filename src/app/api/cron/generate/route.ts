
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { client } from '@/lib/sanity/client'
import { generateBlogPost } from '@/lib/ai/gemini'

export const maxDuration = 60 // Allow longer timeout for AI generation

export async function GET(request: Request) {
  // 1. Auth Check
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const supabase = await createClient()

    // 2. Fetch Pending Keyword
    // We join with categories to get the category title/slug
    const { data: keywordData, error: keywordError } = await supabase
      .from('keywords')
      .select('*, categories(title, slug)')
      .eq('status', 'pending')
      .limit(1)
      .single()

    if (keywordError || !keywordData) {
      return NextResponse.json({ message: 'No pending keywords found' })
    }

    const { keyword, id: keywordId, categories } = keywordData
    // Handle array or single object for joined data (Supabase returns object for single relation if not array mode)
    // Actually, `categories` here depends on relation... assume singular based on schema FK.
    // If categories is array (it shouldn't be with simple FK), take first.
    const categoryTitle = Array.isArray(categories) ? categories[0]?.title : categories?.title
    const categoryRef = Array.isArray(categories) ? categories[0]?.slug : categories?.slug // We might need Supabase ID for reference, but Sanity needs reference to its own document. 
    // Wait, we need to link Sanity Post to Sanity Category. 
    // Does Sanity Category exist? Logic: Supabase Category -> Sanity Category.
    // Ideally we sync them. For now, let's just generate the post and try to find the category in Sanity by slug.
    
    // 3. Generate Content
    const generatedContent = await generateBlogPost(keyword, categoryTitle || 'General')
    
    // 4. Convert Markdown to Blocks (Basic)
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
        return {
            style: 'normal',
            _type: 'block',
            children: [{ _type: 'span', text: line }]
        }
    })

    // 5. Create Sanity Document
    // We need to find the Sanity Author and Category IDs to link them.
    // For MVP, we might create them if missing or just leave empty?
    // Let's assume we have a default author or just skip relations if not found.
    
    const doc = {
      _type: 'post',
      title: generatedContent.title,
      slug: { current: generatedContent.slug },
      publishedAt: new Date().toISOString(),
      body: blocks,
      external_id: keywordId,
      // Default Author/Category would go here if we fetched them from Sanity first
    }

    const sanityDoc = await client.create(doc)

    // 6. Update Supabase
    await supabase
      .from('keywords')
      .update({ status: 'drafted', generated_post_id: sanityDoc._id })
      .eq('id', keywordId)

    return NextResponse.json({ success: true, doc: sanityDoc })

  } catch (error) {
    console.error('Generation Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
