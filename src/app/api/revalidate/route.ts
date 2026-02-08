import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    // Revalidate the homepage provided
    revalidatePath('/')
    
    // If it's a post, we might want to revalidate specific paths, 
    // but revalidating layout/home is usually a good catch-all for lists.
    // Ideally we'd revalidate /espacios/[category]/[slug] too if we had the category.
    
    console.log('Revalidated content:', body._type, body.slug?.current)

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
