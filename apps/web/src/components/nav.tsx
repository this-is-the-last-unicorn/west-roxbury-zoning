'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, MapPin } from 'lucide-react'

const links = [
  { href: '/map', label: 'Map' },
  { href: '/overview', label: 'Overview' },
  { href: '/faq', label: 'FAQ' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/about', label: 'About' },
  { href: '/sources', label: 'Sources' },
]

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-xl bg-[#0F172A]/95 border-b border-white/10'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          <Link href='/' className='flex items-center gap-2.5 group'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-500/20'>
              <MapPin className='w-4 h-4 text-white' />
            </div>
            <div className='hidden sm:block'>
              <span className='font-bold text-white text-sm tracking-tight'>WR Zoning</span>
              <span className='text-[10px] text-white/40 block -mt-0.5 tracking-wide'>
                WEST ROXBURY
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className='hidden md:flex items-center gap-1'>
            {links.map(l => {
              const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Search shortcut */}
          <Link
            href='/'
            className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 text-white/40 text-sm hover:border-white/25 hover:text-white/60 transition-all'
          >
            <span className='text-xs'>⌘</span>
            Search address
          </Link>

          {/* Mobile toggle */}
          <button
            className='md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors'
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Toggle menu'
          >
            {mobileOpen ? (
              <X className='h-5 w-5 text-white' />
            ) : (
              <Menu className='h-5 w-5 text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden border-t border-white/10 bg-[#0F172A]'>
          <div className='px-4 py-3 space-y-1'>
            {links.map(l => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
