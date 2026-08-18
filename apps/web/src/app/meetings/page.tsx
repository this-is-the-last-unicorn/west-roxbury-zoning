import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { MeetingFilters } from './filters'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const metadata: Metadata = {
  title: 'Meetings & Deadlines',
  description: 'Upcoming and past meetings related to the West Roxbury zoning proposal.',
}

type Meeting = {
  id: number
  date: string
  title: string
  time: string | null
  location: string | null
  type: string | null
  cityUrl: string | null
  recordingUrl: string | null
  isPast: boolean
}

async function getMeetings(): Promise<Meeting[]> {
  try {
    const res = await fetch(`${API_URL}/api/meetings`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const CITY_BASE = 'https://www.bostonplans.org/neighborhood-housing'
const utm = (medium: string) =>
  `${CITY_BASE}?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=${medium}`

export default async function MeetingsPage() {
  const meetings = await getMeetings()

  const upcoming = meetings.filter(m => !m.isPast).reverse()
  const past = meetings.filter(m => m.isPast)

  const upcomingPublic = upcoming.filter(m => m.type === 'public_meeting')
  const upcomingOffice = upcoming.filter(m => m.type === 'office_hours')
  const pastPublic = past.filter(m => m.type === 'public_meeting')
  const pastOffice = past.filter(m => m.type === 'office_hours')

  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-2'>Meetings & Deadlines</h1>
      <p className='text-[#475569] mb-2'>
        All events below are hosted by the{' '}
        <a
          href={utm('meetings-intro')}
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-[#2E5090]'
        >
          Boston Planning Department
        </a>{' '}
        as part of the Neighborhood Housing zoning initiative.
      </p>
      <p className='text-sm text-[#94A3B8] mb-8'>
        Have feedback for the city?{' '}
        <a
          href={utm('meetings-survey')}
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-[#2E5090]'
        >
          Take the city&apos;s survey
        </a>
      </p>

      {meetings.length > 0 ? (
        <MeetingFilters
          upcomingPublic={upcomingPublic}
          upcomingOffice={upcomingOffice}
          pastPublic={pastPublic}
          pastOffice={pastOffice}
        />
      ) : (
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 text-center'>
          <p className='text-[#94A3B8]'>No meetings data available yet.</p>
        </div>
      )}

      <div className='mt-8 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg'>
        <p className='text-sm text-[#475569]'>
          <strong>Where do these events come from?</strong> All meetings and office hours are
          sourced directly from the{' '}
          <a
            href={utm('meetings-source')}
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-[#2E5090]'
          >
            Boston Planning Department&apos;s Neighborhood Housing page
          </a>
          . <Star className='w-3 h-3 inline text-[#2E5090] fill-[#2E5090] -mt-0.5' /> Public
          meetings have formal agendas and presentations. Office hours are informal drop-in sessions
          — the city lists dates but not always specific times or addresses. Spanish-language
          sessions (&quot;Vivienda de Barrio&quot;) are real city events, not duplicates.
        </p>
      </div>
    </div>
  )
}
