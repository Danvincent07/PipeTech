import { redirect } from 'next/navigation'
import { isManager } from '@/lib/actions/auth'
import { LogOut, User, Store, Package, Layers, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userIsManager = await isManager()

  if (!userIsManager) {
    redirect('/pos')
  }

  return (
    <div className="min-h-screen bg-[#2A2D34]">
      {/* Industrial Header */}
      <header className="sticky top-0 z-50 border-b-4 border-[#FF6B35] bg-[#3B4B5C] shadow-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF6B35] shadow-lg">
              <Store className="h-7 w-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-white">
                Hollow Blocks POS
              </h1>
              <p className="text-sm font-medium text-[#FF6B35]">Manager Dashboard</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            {/* User Badge */}
            <div className="flex items-center gap-2 rounded-lg bg-[#2A2D34] px-4 py-2 shadow-inner">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35]">
                <User className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-[#FF6B35]">Manager</p>
                <p className="text-sm font-bold text-white">Admin</p>
              </div>
            </div>

            {/* Logout Button */}
            <Link
              href="/api/auth/logout"
              className="flex h-10 items-center gap-2 rounded-lg border-2 border-[#FF6B35] bg-transparent px-4 font-bold text-white transition-all hover:bg-[#FF6B35] hover:shadow-lg"
            >
              <LogOut className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="container mx-auto border-t border-white/10">
          <div className="flex gap-1 px-4">
            <Link
              href="/pos"
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Store className="h-4 w-4" />
              POS
            </Link>
            <Link
              href="/manager/products"
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#FF6B35] border-b-2 border-[#FF6B35]"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/manager/inventory"
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Layers className="h-4 w-4" />
              Inventory
            </Link>
            <Link
              href="/sales"
              className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Sales
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}
