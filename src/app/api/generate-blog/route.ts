
import { NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/ai/gemini";
import { client } from "@/lib/sanity/client";
import { syncSanityPosts } from "@/app/actions/sync-posts";

export const maxDuration = 60; // Set max duration to 60 seconds for Vercel

export async function POST(req: Request) {
  try {
    const { topic, category } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    console.log(`🚀 Starting generation for topic: ${topic}, category: ${category}`);

    // 1. Generate content with AI (Gemini)
    // This returns a JSON object with title, slug, description, body
    const aiContent = await generateBlogPost(topic, category || "General");

    console.log("✅ Content generated successfully");

    // 2. Save to Sanity (CMS)
    // We use the Write Client (configured with token)
    const newPost = await client.create({
      _type: 'post',
      title: aiContent.title,
      slug: { current: aiContent.slug },
      description: aiContent.description,
      body: aiContent.body, // In a real app, convert Markdown to PortableText
      publishedAt: new Date().toISOString(),
      // Add category reference if possible, for now we skip strict ref
      aiGenerator: "v2-automated", 
    });

    console.log(`✅ Post created in Sanity: ${newPost._id}`);

    // 3. Trigger Sync to Supabase (Vector Search)
    // We run this asynchronously or await it depending on needs. 
    // Awaiting ensures consistency for the user.
    const syncResult = await syncSanityPosts();

    return NextResponse.json({ 
      success: true, 
      id: newPost._id, 
      sanity: newPost,
      sync: syncResult 
    });

  } catch (error) {
    console.error("❌ Error in generate-blog route:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
