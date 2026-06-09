import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: Request) {
  const supabase = await createClient()

  // Sign out the user
  await supabase.auth.signOut()

  // Revalidate the cache
  revalidatePath('/', 'layout')

  // Get the origin from the request to handle both local and deployed environments
  const requestUrl = new URL(request.url)
  const origin = requestUrl.origin

  // Redirect to login page
  return NextResponse.redirect(`${origin}/login`)
}

export async function POST(request: Request) {
  const supabase = await createClient()

  // Sign out the user
  await supabase.auth.signOut()

  // Revalidate the cache
  revalidatePath('/', 'layout')

  // Get the origin from the request
  const requestUrl = new URL(request.url)
  const origin = requestUrl.origin

  // Redirect to login page
  return NextResponse.redirect(`${origin}/login`)
}
