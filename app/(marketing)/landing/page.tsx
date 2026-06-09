'use client'

import Link from 'next/link'
import { ArrowRight, Package, Layers, TrendingUp, Shield, Zap, CheckCircle2, BarChart3, Clock, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <Package className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                PipeTech POS
              </span>
              <p className="text-xs text-slate-500 font-medium">Construction Materials</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block px-5 py-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/pos"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold text-blue-700 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <CheckCircle2 className="h-4 w-4" />
              Trusted by Construction Businesses
            </div>

            {/* Main Heading */}
            <h1
              className={`mb-6 font-bold text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PipeTech
              </span>
            </h1>

            {/* Subheading */}
            <p
              className={`mb-10 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Streamline your hollow blocks business with intelligent inventory management,
              fast transactions, and real-time analytics.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200"
              >
                Log In
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold text-lg rounded-lg border-2 border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              className={`mt-16 flex flex-wrap justify-center gap-8 text-sm text-slate-500 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { label: 'Transaction Speed', value: '< 3 sec', icon: Clock },
              { label: 'System Uptime', value: '99.9%', icon: TrendingUp },
              { label: 'Active Users', value: '500+', icon: Users },
              { label: 'Sales Processed', value: '10K+', icon: BarChart3 },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 text-blue-600 mb-3" strokeWidth={1.5} />
                <div className="font-bold text-3xl text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="mb-4 font-bold text-4xl md:text-5xl text-slate-900">
              Everything You Need to Run
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Your Business Efficiently
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed specifically for construction materials retail
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Layers,
                title: 'Smart Inventory Management',
                description: 'FIFO tracking ensures your oldest stock moves first. Automated reorder alerts and batch management keep you stocked.',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: Zap,
                title: 'Lightning-Fast Checkout',
                description: 'Process transactions in under 3 seconds with our touch-optimized interface. Built for speed and efficiency.',
                gradient: 'from-amber-500 to-orange-600'
              },
              {
                icon: Shield,
                title: 'Secure Access Control',
                description: 'Role-based permissions for cashiers and managers. Enterprise-grade security with row-level policies.',
                gradient: 'from-green-500 to-emerald-600'
              },
              {
                icon: Package,
                title: 'Product Catalog',
                description: 'Manage all hollow block sizes (4", 6", 8", 10"). Track SKUs, pricing tiers, and stock levels effortlessly.',
                gradient: 'from-sky-500 to-blue-600'
              },
              {
                icon: TrendingUp,
                title: 'Real-Time Analytics',
                description: 'Monitor sales performance with detailed reports. Make data-driven decisions to grow your business.',
                gradient: 'from-purple-500 to-indigo-600'
              },
              {
                icon: CheckCircle2,
                title: 'Receipt Printing',
                description: 'Professional 80mm thermal receipts. Print instantly after every transaction with customizable templates.',
                gradient: 'from-pink-500 to-rose-600'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`mb-6 h-14 w-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="mb-3 font-bold text-xl text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 font-bold text-4xl text-slate-900">
              Built with Modern Technology
            </h2>
            <p className="mb-12 text-lg text-slate-600">
              Powered by industry-leading tools for reliability and performance
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Next.js 14', desc: 'React Framework', color: 'from-slate-700 to-slate-800' },
                { name: 'TypeScript', desc: 'Type Safety', color: 'from-blue-600 to-blue-700' },
                { name: 'Supabase', desc: 'PostgreSQL DB', color: 'from-green-600 to-emerald-700' },
                { name: 'Tailwind CSS', desc: 'Modern Styling', color: 'from-cyan-500 to-blue-600' },
              ].map((tech, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`inline-block px-3 py-1 mb-3 bg-gradient-to-r ${tech.color} text-white text-xs font-bold rounded-full`}>
                    {tech.desc}
                  </div>
                  <div className="font-bold text-lg text-slate-900">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

        <div className="container mx-auto text-center relative z-10">
          <h2 className="mb-6 font-bold text-4xl md:text-5xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mb-10 text-xl text-blue-100 max-w-2xl mx-auto">
            Join hundreds of construction materials businesses using PipeTech POS to streamline operations
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-700 font-bold text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
          >
            Log In Now
            <ArrowRight className="h-6 w-6" />
          </Link>
          <p className="mt-6 text-sm text-blue-200">
            Access your POS system instantly
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <span className="font-bold text-lg">PipeTech POS</span>
                <p className="text-xs text-slate-400">Construction Materials Solution</p>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              © 2026 PipeTech. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
