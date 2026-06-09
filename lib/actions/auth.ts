'use server'

import { createClient } from '@/lib/supabase/server'
import type { User } from '@/types'

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching user data:', error)
    return null
  }

  return userData
}

export async function isManager(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'manager' && user?.is_active === true
}
