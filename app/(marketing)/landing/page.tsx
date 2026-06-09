'use client'

import Link from 'next/link'
import { ArrowRight, Package, Layers, TrendingUp, Shield, Zap, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#1A1D23] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b-4 border-[#FF6B35] bg-[#2A2D34]/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#FF6B35] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
            <span className="text-xl font-black tracking-tight">HOLLOW BLOCKS POS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block px-6 py-2 font-bold text-white/80 hover:text-white transition-colors"
            >
              LOGIN
            </Link>
            <Link
              href="/pos"
              className="px-6 py-2.5 bg-[#FF6B35] font-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, #FF6B35 0px, #FF6B35 2px, transparent 2px, transparent 40px),
                             repeating-linear-gradient(90deg, #FF6B35 0px, #FF6B35 2px, transparent 2px, transparent 40px)`
          }} />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#2A2D34] border-2 border-[#FF6B35] font-mono text-sm text-[#FF6B35] transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="h-2 w-2 bg-[#FF6B35] animate-pulse" />
              CONSTRUCTION MATERIALS · INDUSTRIAL GRADE
            </div>

            {/* Main Heading */}
            <h1
              className={`mb-6 font-black text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tighter transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: '200ms',
                textShadow: '4px 4px 0px rgba(255, 107, 53, 0.3)'
              }}
            >
              BUILT FOR THE
              <br />
              <span className="text-[#FF6B35]">CONSTRUCTION</span>
              <br />
              INDUSTRY
            </h1>

            {/* Subheading */}
            <p
              className={`mb-10 max-w-2xl text-xl font-medium text-white/70 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Point of Sale system engineered for hollow blocks and construction materials.
              FIFO inventory, real-time tracking, industrial-strength reliability.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link
                href="/pos"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] font-black text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                START SELLING NOW
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent font-bold text-lg border-4 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
              >
                SEE FEATURES
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'INVENTORY TRACKING', value: 'FIFO' },
              { label: 'TRANSACTION SPEED', value: '<3s' },
              { label: 'UPTIME', value: '99.9%' },
              { label: 'RECEIPT FORMAT', value: '80MM' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 bg-[#2A2D34] border-l-4 border-[#FF6B35] transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${500 + i * 100}ms` }}
              >
                <div className="font-black text-3xl text-[#FF6B35] mb-1">{stat.value}</div>
                <div className="font-mono text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#2A2D34]">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-black text-4xl md:text-5xl tracking-tight">
              INDUSTRIAL-GRADE
              <br />
              <span className="text-[#FF6B35]">FEATURES</span>
            </h2>
            <p className="text-lg text-white/60 font-medium">Built for the demands of construction materials retail</p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: 'FIFO INVENTORY',
                description: 'First-In-First-Out tracking ensures oldest stock moves first. Automated batch management.',
                color: '#FF6B35'
              },
              {
                icon: Zap,
                title: 'LIGHTNING FAST',
                description: 'Process sales in under 3 seconds. Touch-optimized interface with 48px+ tap targets.',
                color: '#FFC107'
              },
              {
                icon: Shield,
                title: 'ROLE-BASED ACCESS',
                description: 'Cashier and Manager roles with granular permissions. Row-level security policies.',
                color: '#4CAF50'
              },
              {
                icon: Package,
                title: 'PRODUCT CATALOG',
                description: 'Manage hollow blocks by size (4", 6", 8", 10"). SKU tracking, pricing tiers, stock alerts.',
                color: '#2196F3'
              },
              {
                icon: TrendingUp,
                title: 'SALES ANALYTICS',
                description: 'Real-time sales history, transaction records, and receipt generation for every sale.',
                color: '#9C27B0'
              },
              {
                icon: CheckCircle2,
                title: 'THERMAL PRINTING',
                description: '80mm thermal receipt format. Print receipts instantly after every transaction.',
                color: '#FF5722'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-[#1A1D23] border-2 border-white/10 hover:border-[#FF6B35] transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div
                  className="mb-4 h-14 w-14 flex items-center justify-center border-2 border-current group-hover:scale-110 transition-transform"
                  style={{ color: feature.color }}
                >
                  <feature.icon className="h-7 w-7" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 font-black text-xl tracking-tight">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-[#1A1D23]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 font-black text-4xl tracking-tight">
              POWERED BY
              <br />
              <span className="text-[#FF6B35]">MODERN STACK</span>
            </h2>
            <p className="mb-12 text-lg text-white/60">Production-ready technologies for maximum reliability</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Next.js 14', desc: 'App Router' },
                { name: 'TypeScript', desc: 'Type Safety' },
                { name: 'Supabase', desc: 'PostgreSQL' },
                { name: 'TailwindCSS', desc: 'Styling' },
              ].map((tech, i) => (
                <div key={i} className="p-6 bg-[#2A2D34] border-2 border-white/10">
                  <div className="font-black text-lg mb-1">{tech.name}</div>
                  <div className="font-mono text-xs text-[#FF6B35]">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#FF6B35]">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 font-black text-5xl md:text-6xl tracking-tight text-black">
            READY TO BUILD?
          </h2>
          <p className="mb-10 text-xl font-bold text-black/70">
            Start managing your construction materials business today
          </p>
          <Link
            href="/pos"
            className="inline-flex items-center gap-2 px-10 py-5 bg-black font-black text-xl text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
          >
            GET STARTED NOW
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0D0F12] border-t-4 border-[#FF6B35]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-[#FF6B35] border-2 border-black" />
              <span className="font-black text-sm tracking-tight">HOLLOW BLOCKS POS</span>
            </div>
            <div className="font-mono text-sm text-white/40">
              © 2026 · INDUSTRIAL PRECISION DESIGN
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
