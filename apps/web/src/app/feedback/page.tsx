'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FeedbackPage() {
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/corrections`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: description.trim(),
            contactEmail: email.trim() || undefined,
          }),
        }
      )

      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // silently fail for now
    }
  }

  if (submitted) {
    return (
      <div className='max-w-2xl mx-auto px-6 py-12 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Thank You</h1>
        <p className='text-[#475569] mb-6'>
          Your feedback has been submitted. We review all submissions and will update the site if a
          correction is needed.
        </p>
        <Link href='/' className='text-[#1B2A4A] underline font-medium'>
          Back to search
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-4'>Submit a Correction</h1>
      <p className='text-[#475569] mb-8'>
        See something wrong? Let us know and we&apos;ll review it. For feedback on the actual zoning
        proposal, visit{' '}
        <a
          href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=feedback'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#1B2A4A] underline'
        >
          bostonplans.org
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='description' className='block text-sm font-medium mb-1'>
            What needs to be corrected? *
          </label>
          <textarea
            id='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={5}
            required
            className='w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] focus:border-transparent'
            placeholder='Describe the issue...'
          />
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            Email (optional, for follow-up)
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full p-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A] focus:border-transparent'
            placeholder='your@email.com'
          />
        </div>

        <button
          type='submit'
          className='px-6 py-3 bg-[#1B2A4A] text-white font-semibold rounded-lg hover:bg-[#2D4A7A] transition-colors'
        >
          Submit Correction
        </button>
      </form>
    </div>
  )
}
