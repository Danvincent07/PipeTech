import { redirect } from 'next/navigation'
import { isManager, getCurrentUser } from '@/lib/actions/auth'
import { LogOut, User, Store } from 'lucide-react'
import Link from 'next/link'
import { ManagerNav } from './manager-nav'

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userIsManager = await isManager()

  if (!userIsManager) {
    redirect('/pos')
  }

  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-[#2A2D34]">
      {/* Industrial Header */}
      <header className="sticky top-0 z-50 border-b-4 border-[#FF6B35] bg-[#3B4B5C] shadow-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF6B35] shadow-lg">
              <Store className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-white">
                Hollow Blocks POS
              </h1>
              <p className="text-sm font-medium text-[#FF6B35]">Manager Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-[#2A2D34] px-4 py-2 shadow-inner">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35]">
                <User className="h-4 w-4 text-white" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-[#FF6B35]">Manager</p>
                <p className="text-sm font-bold text-white">{user?.full_name || 'Manager'}</p>
              </div>
            </div>

            <form action="/api/auth/logout" method="get">
              <button
                type="submit"
                className="flex h-10 items-center gap-2 rounded-lg border-2 border-[#FF6B35] bg-transparent px-4 font-bold text-white transition-all hover:bg-[#FF6B35] hover:shadow-lg"
              >
                <LogOut className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                <span className="hidden sm:inline">Logout</span>
                <span className="sr-only">Logout from manager dashboard</span>
              </button>
            </form>
          </div>
        </div>

        <ManagerNav />
      </header>

      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}
