
'use client'
import {useState, useCallback} from 'react'
import {Stack, Button, Card, Text, TextArea, Flex, Select, Label, TextInput, Box, ToastProvider, useToast} from '@sanity/ui'
import {SparklesIcon} from '@sanity/icons'
import {useClient, useFormValue} from 'sanity'
import {set, unset} from 'sanity'
import type {StringInputProps, PatchEvent} from 'sanity'

const CATEGORIES = [
  {title: 'Mobiliario Inteligente', value: 'Mobiliario Inteligente'},
  {title: 'Sistemas de Organizacion', value: 'Sistemas de Organizacion'},
  {title: 'Curaduria de Espacios', value: 'Curaduria de Espacios'},
  {title: 'Biohacking del Hogar', value: 'Biohacking del Hogar'},
  {title: 'Hacks', value: 'Hacks'},
  {title: 'Proyectos DIY', value: 'Proyectos DIY'},
  {title: 'General', value: 'General'},
]

export function GenerateBlogPost(props: StringInputProps) {
  const {onChange, value} = props
  const [topic, setTopic] = useState(value || '')
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [isLoading, setIsLoading] = useState(false)
  
  const client = useClient({apiVersion: '2024-01-01'})
  const toast = useToast()
  
  // Get document ID to patch it directly if needed, or we use onChange for the field
  const docId = useFormValue(['_id']) as string

  const handleGenerate = useCallback(async () => {
    if (!topic) {
      toast.push({status: 'error', title: 'Por favor escribe un tema'})
      return
    }

    setIsLoading(true)
    
    try {
      // Call our Next.js API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({topic, category}),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate')
      }

      // We successfully generated content.
      // Now we need to update the document.
      // If the document doesn't exist yet (new draft), we create it.
      // If it exists, we patch it.
      
      const {title, slug, body, publishedAt} = data

      // Check if document exists (has a valid _id that's not a draft placeholder)
      if (docId && !docId.startsWith('drafts.')) {
        // Document exists, update it
        await client
          .patch(docId)
          .set({
            title,
            body,
            slug: {current: slug},
            publishedAt: publishedAt || new Date().toISOString(),
          })
          .commit()
      } else {
        // Document doesn't exist yet, create it
        const newDoc = await client.create({
          _type: 'post',
          title,
          body,
          slug: {current: slug},
          publishedAt: publishedAt || new Date().toISOString(),
          aiGenerator: 'v2-automated',
        })
        
        // Optionally, you could redirect to the new document
        console.log('Created new document:', newDoc._id)
      }

      toast.push({
        status: 'success', 
        title: 'Blog Post Generado!',
        description: 'Se han actualizado los campos Título, Slug y Contenido.'
      })
      
      // Update the current field (Topic) to reflect what was used
      // onChange(PatchEvent.from(set(topic) as any)) 

    } catch (err: any) {
      console.error(err)
      toast.push({status: 'error', title: 'Error', description: err.message})
    } finally {
      setIsLoading(false)
    }
  }, [topic, category, client, docId, toast])

  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={4}>
        <Flex align="center" gap={2}>
            <SparklesIcon />
            <Text weight="bold" size={2}>Generador IA Experto</Text>
        </Flex>

        <Stack space={3}>
            <Label>Tema del Artículo</Label>
            <TextArea 
                value={topic} 
                onChange={(e) => {
                    setTopic(e.currentTarget.value)
                    // Optional: sync with actual field value if we want to save the topic
                    // onChange(PatchEvent.from(set(e.currentTarget.value) as any))
                }}
                rows={2}
                placeholder="Ej: Mesas extensibles para cenas de 6 personas..." 
            />
        </Stack>

        <Stack space={3}>
            <Label>Categoría / Contexto</Label>
            <Select 
                value={category} 
                onChange={(e) => setCategory(e.currentTarget.value)}
            >
                {CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.title}</option>
                ))}
            </Select>
        </Stack>

        <Button 
            icon={SparklesIcon} 
            text={isLoading ? 'Generando Contenido...' : 'Generar Blog Post'} 
            tone="primary" 
            onClick={handleGenerate} 
            disabled={isLoading}
            loading={isLoading}
        />
        
        {isLoading && (
            <Text size={1} muted>Esto puede tomar unos 30-60 segundos. La IA está escribiendo...</Text>
        )}
      </Stack>
    </Card>
  )
}
