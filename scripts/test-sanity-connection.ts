
import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

console.log('Testing Sanity Connection...')
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_DATASET is missing!')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function testConnection() {
  try {
    const posts = await client.fetch('*[_type == "post"][0...1]')
    console.log('✅ Connection Successful!')
    console.log('Fetched', posts.length, 'posts.')
  } catch (error) {
    console.error('❌ Connection Failed:', error)
  }
}

testConnection()
