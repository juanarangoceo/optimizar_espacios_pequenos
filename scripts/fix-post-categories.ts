import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2024-01-01'

if (!projectId || !dataset) {
  console.error('Missing env vars')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write access
})

async function fixPosts() {
  console.log('=== FIXING POSTS WITHOUT CATEGORIES ===\n')
  
  // Get posts without categories
  const postsWithoutCategories = await client.fetch(`*[_type == "post" && !defined(categories)]{
    _id,
    title,
    "isDraft": _id match "drafts.*"
  }`)
  
  console.log(`Found ${postsWithoutCategories.length} posts without categories\n`)
  
  if (postsWithoutCategories.length === 0) {
    console.log('✅ All posts have categories!')
    return
  }

  // Get "Sistemas de Organización" category (since the existing post is about organization)
  const organizationCategory = await client.fetch(`*[_type == "category" && slug.current == "sistemas-de-organizacion"][0]{_id, title}`)
  
  if (!organizationCategory) {
    console.error('❌ Category "sistemas-de-organizacion" not found!')
    return
  }

  console.log(`Will assign category: ${organizationCategory.title} (${organizationCategory._id})\n`)

  // Fix each post
  for (const post of postsWithoutCategories) {
    console.log(`Fixing: ${post.title}`)
    
    try {
      await client
        .patch(post._id)
        .set({
          categories: [{
            _type: 'reference',
            _ref: organizationCategory._id,
            _key: uuidv4()
          }]
        })
        .commit()
      
      console.log(`✅ Fixed: ${post._id}\n`)
    } catch (err) {
      console.error(`❌ Error fixing ${post._id}:`, err)
    }
  }

  console.log('\n=== VERIFICATION ===\n')
  
  // Verify the fix
  const homepagePosts = await client.fetch(
    `*[_type == "post" && references(*[_type == "category" && slug.current == "sistemas-de-organizacion"]._id)] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "categories": categories[]->title
    }`
  )
  
  console.log(`Posts now in "Sistemas de Organización": ${homepagePosts.length}`)
  homepagePosts.forEach((p: any) => {
    console.log(`  - ${p.title} (Categories: ${p.categories?.join(', ') || 'none'})`)
  })
}

fixPosts()
