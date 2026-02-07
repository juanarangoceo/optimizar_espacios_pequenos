
'use client'

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // In the browser, we need to get env vars from window or fallback
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Your project's URL and Key are required to create a Supabase client!\n\n` +
      `Check your Supabase project's API settings to find these values\n\n` +
      `https://supabase.com/dashboard/project/_/settings/api\n\n` +
      `Missing: ${!supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : ''} ${!supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : ''}`
    )
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
