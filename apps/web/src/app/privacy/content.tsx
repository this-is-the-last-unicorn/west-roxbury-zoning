'use client'

import { useState } from 'react'

export function PrivacyContent() {
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !description.trim()) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/privacy`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            description: description.trim(),
          }),
        }
      )

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

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

        <section id='data-deletion'>
          <h2 className='text-xl font-semibold text-[#0F172A] mb-2'>Data Deletion</h2>
          <p className='mb-4'>
            To request deletion of any correction or feedback you&apos;ve submitted, use the form
            below. We&apos;ll process your request and confirm via email.
          </p>

          {submitted ? (
            <div className='p-4 bg-[#EFF6FF] rounded-lg border border-[#6B8FC4]'>
              <p className='font-medium text-[#1B2A4A]'>Request received.</p>
              <p className='text-sm mt-1'>
                We&apos;ll review your request and follow up at the email you provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-3'>
              <div>
                <label htmlFor='privacy-email' className='block text-sm font-medium mb-1'>
                  Your email *
                </label>
                <input
                  id='privacy-email'
                  type='email'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] focus:border-transparent'
                  placeholder='your@email.com'
                />
              </div>
              <div>
                <label htmlFor='privacy-description' className='block text-sm font-medium mb-1'>
                  What would you like us to delete or change? *
                </label>
                <textarea
                  id='privacy-description'
                  required
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] focus:border-transparent'
                  placeholder='e.g. Please delete the correction I submitted for 123 Main St.'
                />
              </div>
              {error && <p className='text-red-600 text-sm'>{error}</p>}
              <button
                type='submit'
                className='px-6 py-2 bg-[#1B2A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2D4A7A] transition-colors'
              >
                Submit Privacy Request
              </button>
            </form>
          )}
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
