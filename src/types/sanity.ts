
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
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: {
    current: string
  }
  description: string
  mainImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  publishedAt: string
  author?: {
    name: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  category?: {
    title: string
    slug: string
  }
}
