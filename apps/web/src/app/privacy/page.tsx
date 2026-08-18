import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy practices for West Roxbury Zoning Analysis.',
}

export default function PrivacyPage() {
  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-4'>Privacy Policy</h1>
      <p className='text-[#475569] mb-8'>Last updated: August 2026</p>

      <div className='space-y-6 text-[#475569]'>
        <section>
          <h2 className='text-xl font-semibold text-[#0F172A] mb-2'>What We Don&apos;t Do</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>No cookies</li>
            <li>No advertising trackers</li>
            <li>No personal data collection</li>
            <li>No third-party analytics that track individuals</li>
            <li>No data sold or shared with third parties</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-[#0F172A] mb-2'>What We Do Collect</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              <strong>Anonymous usage analytics</strong> via Umami (open source, self-hosted). This
              tracks page views and referrers without cookies or personal data.
            </li>
            <li>
              <strong>Corrections</strong> — if you submit a data correction, we store the
              description and optional email you provide.
            </li>
            <li>
              <strong>Feedback</strong> — if you submit feedback, we store the reactions and
              optional free text. No identifying information is required.
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-[#0F172A] mb-2'>
            Global Privacy Control (GPC)
          </h2>
          <p>
            We respect the Global Privacy Control signal. If your browser sends a GPC signal, we
            honor it as a valid opt-out request under CCPA.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-[#0F172A] mb-2'>Data Deletion</h2>
          <p>
            To request deletion of any correction or feedback you&apos;ve submitted, email{' '}
            <a href='mailto:privacy@westroxburyzoning.org' className='text-[#1B2A4A] underline'>
              privacy@westroxburyzoning.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-[#0F172A] mb-2'>Third-Party Services</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              <strong>Mapbox</strong> — map tiles. Subject to Mapbox&apos;s privacy policy.
            </li>
            <li>
              <strong>Render</strong> — hosting. Subject to Render&apos;s privacy policy.
            </li>
            <li>
              <strong>Cloudflare</strong> — DNS and CDN. Subject to Cloudflare&apos;s privacy
              policy.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
