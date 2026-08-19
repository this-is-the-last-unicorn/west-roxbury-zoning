import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About this project, who built it, and how it works.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className='bg-white border-b border-[#E2E8F0] py-20 px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='text-sm font-medium text-[#2E5090] uppercase tracking-widest mb-3'>About</p>
          <h1 className='text-4xl md:text-5xl font-bold text-[#0F172A] mb-4'>
            Civic data, <br className='hidden md:block' />
            plain language.
          </h1>
          <p className='text-lg text-[#64748B] max-w-xl mx-auto'>
            We translate Boston&apos;s proposed zoning changes into property-specific information
            every property owner can actually understand.
          </p>
        </div>
      </div>

      <div className='max-w-3xl mx-auto px-6 py-16 space-y-16'>
        {/* Who */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              Who made this
            </p>
          </div>
          <div className='md:col-span-3 space-y-3 text-[#475569] leading-relaxed'>
            <p>
              Created by <strong className='text-[#0F172A]'>Emily Gamble</strong>, a West Roxbury
              resident who wanted to understand what the city&apos;s proposed zoning changes would
              mean for her neighborhood.
            </p>
            <p>
              Built by{' '}
              <a
                href='https://lastunicorn.io'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400 transition-all'
              >
                The Last Unicorn, LLC
              </a>{' '}
              — a studio that builds tools for people who deserve better information.
            </p>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* Independence */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              Independence
            </p>
          </div>
          <div className='md:col-span-3 space-y-3 text-[#475569] leading-relaxed'>
            <p>
              This project is{' '}
              <strong className='text-[#0F172A]'>
                not affiliated with, endorsed by, or funded by
              </strong>{' '}
              the City of Boston, the{' '}
              <a
                href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=about'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Boston Planning Department
              </a>
              , or any developer, advocacy group, or political campaign.
            </p>
            <p>
              All analysis is based on publicly available data and the{' '}
              <a
                href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=about'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                published draft zoning text
              </a>
              . We don&apos;t have an agenda — we just think people should be able to understand
              what&apos;s being proposed for their properties.
            </p>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* Open Source */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              Open source
            </p>
          </div>
          <div className='md:col-span-3 space-y-4'>
            <p className='text-[#475569] leading-relaxed'>
              Every line of code, every calculation, every data source is public. If you think
              something is wrong, you can check our work — or submit a fix.
            </p>
            <a
              href='https://github.com/this-is-the-last-unicorn/west-roxbury-zoning'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F172A] text-white text-sm font-medium hover:bg-[#1E293B] transition-colors'
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
              </svg>
              View on GitHub
            </a>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* How it works */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              How it works
            </p>
          </div>
          <div className='md:col-span-3'>
            <div className='space-y-6'>
              {[
                {
                  step: '01',
                  title: 'Public data in',
                  desc: "We pull parcel boundaries, assessor records, and building data from the City of Boston's open data portal (data.boston.gov).",
                },
                {
                  step: '02',
                  title: 'Zoning rules applied',
                  desc: "We compare every parcel against both today's zoning code and the proposed draft, computing what would change for each property.",
                },
                {
                  step: '03',
                  title: 'Plain language out',
                  desc: 'The results are translated from legalese into clear, property-specific explanations anyone can understand.',
                },
              ].map(item => (
                <div key={item.step} className='flex gap-4'>
                  <div className='shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white text-sm font-bold'>
                    {item.step}
                  </div>
                  <div>
                    <h3 className='font-semibold text-[#0F172A]'>{item.title}</h3>
                    <p className='text-sm text-[#475569] mt-1'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* Tech stack */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              Technology
            </p>
          </div>
          <div className='md:col-span-3'>
            <div className='grid grid-cols-2 gap-4'>
              {[
                { label: 'Hosting', value: 'Render' },
                { label: 'Domain', value: 'Cloudflare' },
                { label: 'Code', value: 'GitHub (MIT)' },
                { label: 'Maps', value: 'Mapbox GL' },
                { label: 'Analytics', value: 'Umami (no cookies)' },
                { label: 'Errors', value: 'Sentry' },
                { label: 'Security', value: 'Aikido' },
                { label: 'Database', value: 'PostgreSQL' },
              ].map(item => (
                <div
                  key={item.label}
                  className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3'
                >
                  <p className='text-xs text-[#94A3B8] uppercase tracking-wide'>{item.label}</p>
                  <p className='text-sm font-medium text-[#0F172A] mt-0.5'>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* Public API */}
        <section id='api' className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              Public API
            </p>
          </div>
          <div className='md:col-span-3 space-y-4'>
            <p className='text-[#475569] leading-relaxed'>
              All the data on this site is available through a free, public API. No API key
              required. Build your own tools, run your own analysis, or plug it into your favorite
              AI.
            </p>
            <div className='bg-[#0F172A] text-[#E2E8F0] rounded-lg p-5 text-sm font-mono space-y-3 overflow-x-auto'>
              <p className='text-[#94A3B8]'># Look up a property by GIS ID</p>
              <p>
                GET /api/property/<span className='text-[#6B8FC4]'>2002226000</span>
              </p>
              <p className='text-[#94A3B8] mt-3'># Search by address</p>
              <p>
                GET /api/search?q=<span className='text-[#6B8FC4]'>156 bellevue</span>
              </p>
              <p className='text-[#94A3B8] mt-3'># Street-level aggregate</p>
              <p>
                GET /api/street/<span className='text-[#6B8FC4]'>bellevue-st</span>
              </p>
              <p className='text-[#94A3B8] mt-3'># West Roxbury overview</p>
              <p>GET /api/overview</p>
            </div>
            <p className='text-sm text-[#475569]'>
              Full endpoint list and response formats are in the{' '}
              <a
                href='https://github.com/this-is-the-last-unicorn/west-roxbury-zoning#api-endpoints'
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-[#2E5090]'
              >
                README on GitHub
              </a>
              . Rate limited to 100 requests/minute for reads.
            </p>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* For AI & Developers */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              For AI &amp; Developers
            </p>
          </div>
          <div className='md:col-span-3 space-y-3 text-[#475569] leading-relaxed'>
            <p>
              We welcome AI agents, bots, and developers using our data. Our{' '}
              <code className='text-xs bg-[#F1F5F9] px-1.5 py-0.5 rounded font-mono text-[#0F172A]'>
                robots.txt
              </code>{' '}
              and{' '}
              <code className='text-xs bg-[#F1F5F9] px-1.5 py-0.5 rounded font-mono text-[#0F172A]'>
                llms.txt
              </code>{' '}
              files are available at the site root:
            </p>
            <div className='flex gap-3'>
              <a
                href='/robots.txt'
                className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-sm font-mono text-[#0F172A] hover:bg-[#E2E8F0] transition-colors'
              >
                /robots.txt
              </a>
              <a
                href='/llms.txt'
                className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-sm font-mono text-[#0F172A] hover:bg-[#E2E8F0] transition-colors'
              >
                /llms.txt
              </a>
            </div>
            <p className='text-sm'>
              If you build something with this data, we&apos;d love to hear about it —{' '}
              <a
                href='https://github.com/this-is-the-last-unicorn/west-roxbury-zoning/issues'
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-[#2E5090]'
              >
                open an issue on GitHub
              </a>
              .
            </p>
          </div>
        </section>

        <hr className='border-[#E2E8F0]' />

        {/* Privacy */}
        <section className='grid md:grid-cols-5 gap-8'>
          <div className='md:col-span-2'>
            <p className='text-xs font-semibold text-[#94A3B8] uppercase tracking-widest'>
              Privacy
            </p>
          </div>
          <div className='md:col-span-3 space-y-4'>
            <div className='flex flex-wrap gap-3'>
              {['No cookies', 'No trackers', 'No ads', 'No personal data collected'].map(item => (
                <span
                  key={item}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200'
                >
                  <svg
                    className='w-3.5 h-3.5'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <p className='text-sm text-[#475569]'>
              We use{' '}
              <a
                href='https://umami.is'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Umami
              </a>{' '}
              for basic analytics (page views only) — it&apos;s open source and doesn&apos;t use
              cookies or collect personal information. Read our full{' '}
              <Link href='/privacy' className='text-[#0F172A] underline font-medium'>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
