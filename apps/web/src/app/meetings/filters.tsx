'use client'

import { useState } from 'react'
import { Calendar, MapPin, Video, ExternalLink, Clock, Star } from 'lucide-react'

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

type Filter = 'all' | 'public_meeting' | 'office_hours'

const TABS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Events' },
  { id: 'public_meeting', label: 'Public Meetings' },
  { id: 'office_hours', label: 'Office Hours' },
]

function EventCard({ m, variant }: { m: Meeting; variant: 'upcoming' | 'past' }) {
  const isUpcoming = variant === 'upcoming'
  const isVirtual = m.location?.toLowerCase().includes('virtual')
  const isSpanish = m.title.includes('hispanohablantes') || m.title.includes('Vivienda')
  const isPublicMeeting = m.type === 'public_meeting'
  const isOfficeHours = m.type === 'office_hours'

  const dateStr = new Date(m.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className={`rounded-lg p-5 ${
        isUpcoming && isPublicMeeting
          ? 'bg-[#EFF6FF] border-2 border-[#93C5FD]'
          : isUpcoming
            ? 'bg-[#F8FAFC] border border-[#E2E8F0]'
            : 'bg-white border border-[#E2E8F0]'
      }`}
    >
      <div className='flex items-start gap-4'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 flex-wrap mb-1'>
            {isUpcoming && isPublicMeeting && (
              <Star className='w-4 h-4 text-[#2E5090] fill-[#2E5090] shrink-0' />
            )}
            <p className={`font-semibold ${isUpcoming ? 'text-[#1E3A5F]' : 'text-[#334155]'}`}>
              {m.title}
            </p>
          </div>

          <div className='flex items-center gap-2 flex-wrap mt-1'>
            {isPublicMeeting && (
              <span className='inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#DBEAFE] text-[#1E40AF] uppercase tracking-wide'>
                Public Meeting
              </span>
            )}
            {isOfficeHours && (
              <span className='inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] uppercase tracking-wide'>
                Office Hours
              </span>
            )}
            {isSpanish && (
              <span className='inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#E0E7FF] text-[#3730A3]'>
                Bilingual — Spanish
              </span>
            )}
          </div>

          <div className='flex items-center gap-4 mt-2.5 flex-wrap'>
            <span
              className={`flex items-center gap-1.5 text-sm ${isUpcoming ? 'text-[#2E5090]' : 'text-[#64748B]'}`}
            >
              <Calendar className='w-3.5 h-3.5 shrink-0' />
              {dateStr}
            </span>
            {m.time && (
              <span
                className={`flex items-center gap-1.5 text-sm ${isUpcoming ? 'text-[#2E5090]' : 'text-[#64748B]'}`}
              >
                <Clock className='w-3.5 h-3.5 shrink-0' />
                {m.time}
              </span>
            )}
            {!m.time && isOfficeHours && (
              <span className='text-xs text-[#94A3B8] italic'>No specific time listed by city</span>
            )}
          </div>

          {m.location && (
            <p
              className={`flex items-center gap-1.5 text-sm mt-1.5 ${isUpcoming ? 'text-[#475569]' : 'text-[#94A3B8]'}`}
            >
              {isVirtual ? (
                <Video className='w-3.5 h-3.5 shrink-0' />
              ) : (
                <MapPin className='w-3.5 h-3.5 shrink-0' />
              )}
              {m.location}
            </p>
          )}

          <div className='flex items-center gap-3 mt-3'>
            {m.cityUrl && (
              <a
                href={m.cityUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-xs font-medium text-[#2E5090] hover:underline'
              >
                {isPublicMeeting ? 'Event details on city site' : 'View full schedule on city site'}{' '}
                <ExternalLink className='w-3 h-3' />
              </a>
            )}
            {m.recordingUrl && (
              <a
                href={m.recordingUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-xs font-medium text-[#2E5090] hover:underline'
              >
                Watch recording <ExternalLink className='w-3 h-3' />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MeetingFilters({
  upcomingPublic,
  upcomingOffice,
  pastPublic,
  pastOffice,
}: {
  upcomingPublic: Meeting[]
  upcomingOffice: Meeting[]
  pastPublic: Meeting[]
  pastOffice: Meeting[]
}) {
  const [filter, setFilter] = useState<Filter>('all')

  const upcoming =
    filter === 'public_meeting'
      ? upcomingPublic
      : filter === 'office_hours'
        ? upcomingOffice
        : [...upcomingPublic, ...upcomingOffice].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )

  const past =
    filter === 'public_meeting'
      ? pastPublic
      : filter === 'office_hours'
        ? pastOffice
        : [...pastPublic, ...pastOffice].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )

  const totalPublic = upcomingPublic.length + pastPublic.length
  const totalOffice = upcomingOffice.length + pastOffice.length

  return (
    <>
      <div className='flex gap-2 mb-6 flex-wrap'>
        {TABS.map(tab => {
          const count =
            tab.id === 'all'
              ? totalPublic + totalOffice
              : tab.id === 'public_meeting'
                ? totalPublic
                : totalOffice
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === tab.id
                  ? 'bg-[#2E5090] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {tab.label} <span className='text-xs opacity-70'>({count})</span>
            </button>
          )
        })}
      </div>

      {upcoming.length > 0 && (
        <section className='mb-10'>
          <h2 className='text-xl font-semibold mb-4'>Upcoming</h2>
          <div className='space-y-3'>
            {upcoming.map(m => (
              <EventCard key={m.id} m={m} variant='upcoming' />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className='mb-10'>
          <h2 className='text-xl font-semibold mb-4'>Past</h2>
          <div className='space-y-3'>
            {past.map(m => (
              <EventCard key={m.id} m={m} variant='past' />
            ))}
          </div>
        </section>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 text-center'>
          <p className='text-[#94A3B8]'>No events found for this filter.</p>
        </div>
      )}
    </>
  )
}
