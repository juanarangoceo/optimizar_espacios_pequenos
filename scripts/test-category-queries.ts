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

async function testCategoryQueries() {
  console.log('=== TESTING CATEGORY QUERIES ===\n')
  
  const categories = [
    'sistemas-de-organizacion',
    'curaduria-de-espacios',
    'mobiliario-inteligente',
    'biohacking-del-hogar',
    'hacks',
    'proyectos-diy'
  ]

  for (const categorySlug of categories) {
    console.log(`\n--- Testing: ${categorySlug} ---`)
    
    // Current query (from page.tsx)
    const currentQuery = `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "categoryRefs": categories[]._ref,
      "categories": categories[]->{title, "slug": slug.current}
    }`
    
    const results = await client.fetch(currentQuery, { categorySlug })
    
    console.log(`Found ${results.length} posts:`)
    results.forEach((post: any) => {
      console.log(`  - ${post.title}`)
      console.log(`    Categories: ${post.categories.map((c: any) => c.title).join(', ')}`)
    })
  }

  console.log('\n\n=== TESTING ALTERNATIVE QUERY ===\n')
  
  for (const categorySlug of categories) {
    console.log(`\n--- Testing: ${categorySlug} ---`)
    
    // Alternative query
    const altQuery = `*[_type == "post" && count((categories[]->slug.current)[@ == $categorySlug]) > 0] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "categories": categories[]->{title, "slug": slug.current}
    }`
    
    const results = await client.fetch(altQuery, { categorySlug })
    
    console.log(`Found ${results.length} posts:`)
    results.forEach((post: any) => {
      console.log(`  - ${post.title}`)
      console.log(`    Categories: ${post.categories.map((c: any) => c.title).join(', ')}`)
    })
  }
}

testCategoryQueries()
