
"use server";

import { client } from "@/lib/sanity/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { generateEmbedding } from "@/lib/ai/gemini";

export async function syncSanityPosts() {
  console.log("🔄 Iniciando sincronización de Sanity a Supabase...");
  
  // 1. Traer todos los posts de Sanity
  // En producción real, filtra por fecha de modificación
  const query = `*[_type == "post"] { _id, title, "slug": slug.current, body, description }`;
  const posts = await client.fetch(query);

  console.log(`📋 Encontrados ${posts.length} posts en Sanity.`);

  let syncedCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    try {
      // 2. Generar embedding (Título + Descripción + Cuerpo parcial)
      // Limitamos el texto para no exceder tokens del modelo de embedding
      const textToEmbed = `${post.title} ${post.description || ''} ${JSON.stringify(post.body).slice(0, 8000)}`;
      
      const embedding = await generateEmbedding(textToEmbed);

      // 3. Upsert en Supabase
      const { error } = await supabaseAdmin
        .from('documents')
        .upsert({
          id: post._id,
          content: JSON.stringify(post.body), // Guardamos el body serializado o texto plano
          metadata: { 
             title: post.title, 
             slug: post.slug,
             description: post.description 
          },
          embedding: embedding
        });

      if (error) {
        console.error(`❌ Error syncing post ${post.title}:`, error);
        errorCount++;
      } else {
        syncedCount++;
      }

    } catch (err) {
      console.error(`❌ Error processing post ${post.title}:`, err);
      errorCount++;
    }
  }

  console.log(`✅ Sincronización completa. Exitosos: ${syncedCount}, Errores: ${errorCount}`);
  return { success: true, synced: syncedCount, errors: errorCount };
}
