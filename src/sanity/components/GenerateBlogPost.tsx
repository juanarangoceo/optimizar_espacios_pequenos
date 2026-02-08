
'use client'
import {useState, useCallback, useEffect} from 'react'
import {Stack, Button, Card, Text, TextArea, Flex, Select, Label, TextInput, Box, ToastProvider, useToast} from '@sanity/ui'
import {SparklesIcon} from '@sanity/icons'
import {useClient, useFormValue} from 'sanity'
import {set, unset} from 'sanity'
import type {StringInputProps, PatchEvent} from 'sanity'
import { v4 as uuidv4 } from 'uuid'

// Default categories as fallback
const DEFAULT_CATEGORIES = [
  {title: 'General', _id: 'general'},
]

export function GenerateBlogPost(props: StringInputProps) {
  const {onChange, value} = props
  const [topic, setTopic] = useState(value || '')
  // Store the full category object or ID. We'll store ID and find title.
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [categories, setCategories] = useState<{title: string, _id: string}[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const client = useClient({apiVersion: '2024-01-01'})
  const toast = useToast()
  
  const docId = useFormValue(['_id']) as string

  // Fetch categories on mount
  useEffect(() => {
    client.fetch(`*[_type == "category"]{_id, title}|order(title asc)`)
      .then((data) => {
        setCategories(data)
        if (data.length > 0) {
            setSelectedCategoryId(data[0]._id)
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err)
        setCategories(DEFAULT_CATEGORIES)
      })
  }, [client])

  const handleGenerate = useCallback(async () => {
    if (!topic) {
      toast.push({status: 'error', title: 'Por favor escribe un tema'})
      return
    }

    // Validate that we have a category selected
    if (!selectedCategoryId || categories.length === 0) {
      toast.push({status: 'error', title: 'Esperando categorías...', description: 'Por favor espera un momento'})
      return
    }

    setIsLoading(true)
    
    // Find selected category title for the prompt
    const selectedCategoryObj = categories.find(c => c._id === selectedCategoryId)
    const categoryTitle = selectedCategoryObj ? selectedCategoryObj.title : 'General'

    console.log('🎯 Generating with category:', {
      selectedCategoryId,
      categoryTitle,
      categoriesAvailable: categories.length
    })

    try {
      // Call our Next.js API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({topic, category: categoryTitle}),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate')
      }
      
      const {title, slug, body, publishedAt} = data

      // Improved Logic: Use a transaction to ensure validity
      if (docId) {
        const transaction = client.transaction()
        
        transaction.createIfNotExists({_type: 'post', _id: docId})
        
        const patchData: any = {
            title,
            body,
            slug: {current: slug},
            publishedAt: publishedAt || new Date().toISOString(),
            aiGenerator: 'v2-automated',
        }

        // ALWAYS add category reference if we have a valid ID
        // Remove the 'general' check - all categories should be saved
        if (selectedCategoryId) {
            patchData.categories = [{
                _type: 'reference',
                _ref: selectedCategoryId,
                _key: uuidv4()
            }]
            console.log('✅ Adding category to post:', selectedCategoryId, categoryTitle)
        } else {
            console.warn('⚠️ No category selected!')
        }
        
        transaction.patch(docId, p => p.set(patchData))

        await transaction.commit()
        console.log('✅ Document updated successfully:', docId, 'Category:', categoryTitle)
      }

      toast.push({
        status: 'success', 
        title: 'Blog Post Generado!',
        description: `Contenido creado para categoría: ${categoryTitle}`
      })
      
    } catch (err: any) {
      console.error('❌ Generation error:', err)
      toast.push({status: 'error', title: 'Error', description: err.message})
    } finally {
      setIsLoading(false)
    }
  }, [topic, selectedCategoryId, categories, client, docId, toast])

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
                onChange={(e) => setTopic(e.currentTarget.value)}
                rows={2}
                placeholder="Ej: Mesas extensibles para cenas de 6 personas..." 
            />
        </Stack>

        <Stack space={3}>
            <Label>Categoría / Contexto</Label>
            <Select 
                value={selectedCategoryId} 
                onChange={(e) => setSelectedCategoryId(e.currentTarget.value)}
                disabled={categories.length === 0}
            >
                {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.title}</option>
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
