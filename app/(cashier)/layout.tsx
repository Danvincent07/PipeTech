import { LogOut, User, Store, Settings } from 'lucide-react';
import Link from 'next/link';
import { isManager } from '@/lib/actions/auth';

export default async function CashierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <p className="text-sm font-medium text-[#FF6B35]">Cashier Terminal</p>
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
                <p className="text-xs font-medium text-[#FF6B35]">Cashier</p>
                <p className="text-sm font-bold text-white">John Doe</p>
              </div>
            </div>

            {/* Manager Link - Only shown to managers */}
            {await isManager() && (
              <Link
                href="/manager/products"
                className="flex h-10 items-center gap-2 rounded-lg border-2 border-white/20 bg-transparent px-4 font-bold text-white transition-all hover:bg-white/5 hover:border-white/40"
              >
                <Settings className="h-4 w-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">Manage</span>
              </Link>
            )}

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
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
