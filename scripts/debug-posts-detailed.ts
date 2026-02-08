import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

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
})

async function debugPosts() {
  console.log('=== CHECKING ALL POSTS ===\n')
  
  // Get ALL posts (including drafts)
  const allPosts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "isDraft": _id match "drafts.*",
    publishedAt,
    "categories": categories[]->{ title, "slug": slug.current, _id },
    "categoryRefs": categories[]._ref
  }`)
  
  console.log(`Total posts found: ${allPosts.length}\n`)
  
  allPosts.forEach((post: any, i: number) => {
    console.log(`--- Post ${i + 1} ---`)
    console.log(`ID: ${post._id}`)
    console.log(`Title: ${post.title}`)
    console.log(`Is Draft: ${post.isDraft}`)
    console.log(`Published At: ${post.publishedAt}`)
    console.log(`Category Refs: ${JSON.stringify(post.categoryRefs)}`)
    console.log(`Categories: ${JSON.stringify(post.categories, null, 2)}`)
    console.log('')
  })

  console.log('\n=== TESTING HOMEPAGE QUERY ===\n')
  
  const categorySlug = 'mobiliario-inteligente'
  
  // This is the EXACT query from page.tsx
  const homepagePosts = await client.fetch(
    `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      description,
      mainImage,
      publishedAt,
      "author": author->{name, image}
    }`,
    { categorySlug, limit: 3 }
  )
  
  console.log(`Query for "${categorySlug}": Found ${homepagePosts.length} posts`)
  homepagePosts.forEach((p: any) => {
    console.log(`  - ${p.title}`)
  })

  console.log('\n=== CHECKING CATEGORIES ===\n')
  const categories = await client.fetch(`*[_type == "category"]{_id, title, "slug": slug.current}`)
  console.log('Available categories:')
  categories.forEach((cat: any) => {
    console.log(`  - ${cat.title} (${cat.slug}) [ID: ${cat._id}]`)
  })
}

debugPosts()
