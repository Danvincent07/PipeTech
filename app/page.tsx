import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LandingPage from './(marketing)/landing/page'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is authenticated, redirect to POS
  if (user) {
    redirect('/pos')
  }

  // Otherwise, show the landing page
  return <LandingPage />
}
