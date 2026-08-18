import Link from 'next/link'
import { Check } from 'lucide-react'

const navLinks = [
  { href: '/map', label: 'Map' },
  { href: '/overview', label: 'Overview' },
  { href: '/faq', label: 'FAQ' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/about', label: 'About' },
  { href: '/sources', label: 'Sources' },
  { href: '/privacy', label: 'Privacy' },
]

export function Footer() {
  return (
    <footer className='bg-[#0F172A] text-white/70'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Top section */}
        <div className='py-12 grid md:grid-cols-3 gap-10 border-b border-white/10'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2.5 mb-4'>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center'>
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
              </div>
              <span className='font-bold text-white text-sm'>WR Zoning Analysis</span>
            </div>
            <p className='text-sm text-white/50 leading-relaxed'>
              Independent civic-data project translating Boston&apos;s proposed zoning changes into
              plain language for West Roxbury homeowners.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className='text-xs font-semibold text-white/30 uppercase tracking-widest mb-4'>
              Navigate
            </p>
            <div className='grid grid-cols-2 gap-2'>
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className='text-sm text-white/50 hover:text-white transition-colors'
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Transparency + Developers */}
          <div>
            <p className='text-xs font-semibold text-white/30 uppercase tracking-widest mb-4'>
              Transparency
            </p>
            <div className='space-y-3 text-sm text-white/50'>
              <div className='flex items-start gap-2'>
                <Check className='w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0' />
                <span>
                  100% open source —{' '}
                  <a
                    href='https://github.com/this-is-the-last-unicorn/west-roxbury-zoning'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white/70 hover:text-white underline underline-offset-2'
                  >
                    view on GitHub
                  </a>
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <Check className='w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0' />
                <span>No cookies · No trackers · No ads</span>
              </div>
              <div className='flex items-start gap-2'>
                <Check className='w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0' />
                <span>Not affiliated with the City of Boston</span>
              </div>
            </div>

            <p className='text-xs font-semibold text-white/30 uppercase tracking-widest mt-6 mb-3'>
              Developers
            </p>
            <div className='flex flex-wrap gap-2'>
              <a
                href='/robots.txt'
                className='text-xs px-2 py-1 rounded bg-white/5 text-white/50 hover:text-white/80 font-mono transition-colors'
              >
                robots.txt
              </a>
              <a
                href='/llms.txt'
                className='text-xs px-2 py-1 rounded bg-white/5 text-white/50 hover:text-white/80 font-mono transition-colors'
              >
                llms.txt
              </a>
              <Link
                href='/about#api'
                className='text-xs px-2 py-1 rounded bg-white/5 text-white/50 hover:text-white/80 font-mono transition-colors'
              >
                Public API
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='py-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-white/30'>
            Created by Emily Gamble · Prepared by{' '}
            <a
              href='https://lastunicorn.io'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent hover:from-violet-300 hover:via-fuchsia-300 hover:to-pink-300 transition-all'
            >
              The Last Unicorn, LLC
            </a>
          </p>
          <p className='text-xs text-white/30'>
            MIT License · Data current as of{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=footer'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-white/90'
            >
              July 2026 draft
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
