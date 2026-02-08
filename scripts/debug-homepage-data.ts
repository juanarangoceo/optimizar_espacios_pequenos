
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
  useCdn: false, // Ensure we get fresh data
})

async function debugHomepage() {
  const categories = [
    'sistemas-de-organizacion',
    'curaduria-de-espacios',
    'biohacking-del-hogar',
    'hacks',
    'mobiliario-inteligente',
    'proyectos-diy'
  ]

  console.log('--- Checking Categories ---')
  const allCategories = await client.fetch(`*[_type == "category"]{title, "slug": slug.current, _id}`)
  console.log(JSON.stringify(allCategories, null, 2))

  console.log('\n--- Checking Posts per Category Slug ---')
  for (const slug of categories) {
    const posts = await client.fetch(
      `*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)]{
        title, 
        _id, 
        "categories": categories[]->slug.current
      }`, 
      { slug }
    )
    console.log(`Slug: "${slug}" -> Found ${posts.length} posts`)
    if (posts.length > 0) {
        console.log('Sample post:', posts[0].title)
    }
  }
}

debugHomepage()
