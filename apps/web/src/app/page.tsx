import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, ArrowRightLeft, MessageCircle } from 'lucide-react'
import { AddressSearch } from '@/components/address-search'

export const metadata: Metadata = {
  title: 'West Roxbury Zoning Analysis — What the proposed changes mean for your property',
  description:
    "Independent, open-source analysis of Boston's proposed zoning changes for West Roxbury. Look up your address to see how the July 2026 draft affects your property.",
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className='bg-white'>
        <div className='max-w-3xl mx-auto px-6 pt-20 pb-16 text-center'>
          <p className='text-sm font-medium text-[#2E5090] uppercase tracking-widest mb-4'>
            West Roxbury Zoning Analysis
          </p>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight text-[#0F172A] mb-6'>
            See what Boston&apos;s{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=homepage'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              proposed zoning
            </a>{' '}
            means for your property.
          </h1>
          <p className='text-lg text-[#64748B] mb-10 max-w-xl mx-auto'>
            Type your address to get a plain-English breakdown of what could change on your property
            — and what stays the same.
          </p>

          <div className='max-w-lg mx-auto'>
            <AddressSearch />
          </div>

          <div className='flex flex-wrap justify-center gap-4 mt-6 text-sm'>
            <Link
              href='/map'
              className='text-[#64748B] hover:text-[#0F172A] transition-colors underline underline-offset-4'
            >
              Browse the map instead
            </Link>
            <span className='text-[#CBD5E1]'>·</span>
            <Link
              href='/faq'
              className='text-[#64748B] hover:text-[#0F172A] transition-colors underline underline-offset-4'
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className='max-w-4xl mx-auto px-6'>
        <div className='grid grid-cols-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] divide-x divide-[#E2E8F0]'>
          <div className='p-6 text-center'>
            <p className='text-3xl font-bold text-[#0F172A]'>9,500+</p>
            <p className='text-sm text-[#94A3B8] mt-1'>Properties analyzed</p>
          </div>
          <div className='p-6 text-center'>
            <p className='text-3xl font-bold text-[#0F172A]'>100%</p>
            <p className='text-sm text-[#94A3B8] mt-1'>Open source</p>
          </div>
          <div className='p-6 text-center'>
            <p className='text-3xl font-bold text-[#0F172A]'>0</p>
            <p className='text-sm text-[#94A3B8] mt-1'>Cookies or trackers</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className='max-w-4xl mx-auto px-6 py-20'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl font-bold text-[#0F172A]'>How it works</h2>
          <p className='text-[#64748B] mt-2'>Three steps, no jargon.</p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              icon: <Search className='w-6 h-6' />,
              title: 'Search your address',
              desc: 'Type it in and we pull your property data from city records.',
            },
            {
              icon: <ArrowRightLeft className='w-6 h-6' />,
              title: 'See what would change',
              desc: "We compare today's zoning rules vs. the proposal — for your specific lot.",
            },
            {
              icon: <MessageCircle className='w-6 h-6' />,
              title: 'Understand it clearly',
              desc: 'Plain English explanations of what the rules mean, with no legal jargon.',
            },
          ].map(item => (
            <div key={item.title} className='text-center flex flex-col items-center'>
              <div className='w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2E5090] flex items-center justify-center mb-4'>
                {item.icon}
              </div>
              <h3 className='font-semibold text-[#0F172A] mb-2'>{item.title}</h3>
              <p className='text-sm text-[#64748B]'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Independence notice */}
      <div className='max-w-2xl mx-auto px-6 pb-16'>
        <div className='bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-6 text-center'>
          <p className='text-sm text-[#64748B]'>
            This is an <strong className='text-[#0F172A]'>independent civic-data project</strong>.
            Not affiliated with or endorsed by the City of Boston. Built by residents, for
            residents.{' '}
            <Link href='/about' className='text-[#2E5090] underline'>
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
