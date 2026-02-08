
import { PortableTextBlock } from '@portabletext/react'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Author {
  name: string
  image?: SanityImage
  bio?: string
}

export interface Post {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  description?: string
  mainImage?: SanityImage
  author?: Author
  categories?: Category[]
  body?: PortableTextBlock[]
  publishedAt: string
}
