
/**
 * Seed script to populate categories in Supabase
 * Run with: npx tsx scripts/seed-categories.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const categories = [
  {
    title: 'Sistemas de Organizacion',
    slug: 'sistemas-de-organizacion',
    description: 'Soluciones inteligentes para organizar espacios pequeños'
  },
  {
    title: 'Curaduria de Espacios',
    slug: 'curaduria-de-espacios',
    description: 'Diseño y curaduría de espacios optimizados'
  },
  {
    title: 'Mobiliario Inteligente',
    slug: 'mobiliario-inteligente',
    description: 'Muebles multifuncionales para maximizar el espacio'
  },
  {
    title: 'Biohacking del Hogar',
    slug: 'biohacking-del-hogar',
    description: 'Optimiza tu hogar para mejorar tu bienestar'
  },
  {
    title: 'Hacks',
    slug: 'hacks',
    description: 'Trucos y consejos rápidos para espacios pequeños'
  },
  {
    title: 'Proyectos DIY',
    slug: 'proyectos-diy',
    description: 'Proyectos hazlo tú mismo para personalizar tu espacio'
  }
]

async function seedCategories() {
  console.log('🌱 Seeding categories...')

  for (const category of categories) {
    // Check if category already exists
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category.slug)
      .single()

    if (existing) {
      console.log(`✓ Category "${category.title}" already exists`)
      continue
    }

    // Insert category
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) {
      console.error(`✗ Error creating "${category.title}":`, error.message)
    } else {
      console.log(`✓ Created category "${category.title}"`)
    }
  }

  console.log('✅ Seeding complete!')
}

seedCategories().catch(console.error)
