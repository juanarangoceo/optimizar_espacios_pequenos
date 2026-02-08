
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Needed for write operations
  useCdn: false,
})

const CATEGORIES = [
  { title: 'Mobiliario Inteligente', slug: 'mobiliario-inteligente', description: 'Muebles multifuncionales y transformables para optimizar espacio.' },
  { title: 'Sistemas de Organización', slug: 'sistemas-de-organizacion', description: 'Estrategias y productos para mantener el orden en espacios pequeños.' },
  { title: 'Curaduría de Espacios', slug: 'curaduria-de-espacios', description: 'Análisis y crítica de diseño de interiores y arquitectura.' },
  { title: 'Biohacking del Hogar', slug: 'biohacking-del-hogar', description: 'Optimización del entorno doméstico para la salud y el bienestar.' },
  { title: 'Hacks', slug: 'hacks', description: 'Trucos rápidos y soluciones ingeniosas para el hogar.' },
  { title: 'Proyectos DIY', slug: 'proyectos-diy', description: 'Tutoriales paso a paso para construir tus propias soluciones.' },
]

async function main() {
  console.log('Seeding categories...')
  
  for (const cat of CATEGORIES) {
    try {
      // Check if category exists
      const existing = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: cat.slug })
      
      if (existing) {
        console.log(`Category "${cat.title}" already exists. Skipping.`)
      } else {
        await client.create({
          _type: 'category',
          title: cat.title,
          slug: { _type: 'slug', current: cat.slug },
          description: cat.description
        })
        console.log(`Created category: ${cat.title}`)
      }
    } catch (err) {
      console.error(`Error creating category ${cat.title}:`, err)
    }
  }
  
  console.log('Seeding complete.')
}

main()
