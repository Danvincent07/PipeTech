'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Store, Package, Layers, BarChart3 } from 'lucide-react'

export function ManagerNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/pos', label: 'POS', icon: Store },
    { href: '/manager/products', label: 'Products', icon: Package },
    { href: '/manager/inventory', label: 'Inventory', icon: Layers },
    { href: '/sales', label: 'Sales', icon: BarChart3 },
  ]

  return (
    <nav className="container mx-auto border-t border-white/10" aria-label="Manager navigation">
      <div className="flex gap-1 px-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== '/pos' ? true : pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${
                isActive
                  ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
