import type { Metadata } from 'next'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const metadata: Metadata = {
  title: 'West Roxbury Overview',
  description: 'Community-wide summary of proposed zoning changes across all of West Roxbury.',
}

async function getOverview() {
  try {
    const res = await fetch(`${API_URL}/api/overview`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getAreas() {
  try {
    const slugs = [
      'bellevue-hill',
      'centre-street-village',
      'lagrange',
      'the-parkway',
      'holy-name',
      'spring-street-baker',
    ]
    const results = await Promise.all(
      slugs.map(async slug => {
        const res = await fetch(`${API_URL}/api/area/${slug}`, { cache: 'no-store' })
        if (!res.ok) return null
        return res.json()
      })
    )
    return results.filter(Boolean)
  } catch {
    return []
  }
}

export default async function OverviewPage() {
  const [overview, areas] = await Promise.all([getOverview(), getAreas()])

  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-4'>West Roxbury Overview</h1>
      <p className='text-[#475569] mb-8'>Community-wide summary of proposed zoning changes.</p>

      <div className='grid md:grid-cols-3 gap-4 mb-12'>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 text-center'>
          <p className='text-sm text-[#64748B]'>Total Parcels</p>
          <p className='text-3xl font-bold mt-1'>
            {overview?.parcelCount?.toLocaleString() || '—'}
          </p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 text-center'>
          <p className='text-sm text-[#64748B]'>Proposed Districts</p>
          <p className='text-3xl font-bold mt-1'>{overview?.districts?.length || '—'}</p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 text-center'>
          <p className='text-sm text-[#64748B]'>Sub-Neighborhoods</p>
          <p className='text-3xl font-bold mt-1'>{areas.length || '—'}</p>
        </div>
      </div>

      {/* District breakdown */}
      {overview?.districts && overview.districts.length > 0 && (
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>By Proposed District</h2>
          <div className='space-y-2'>
            {overview.districts.map((d: { district: string | null; count: number }) => {
              const pct = overview.parcelCount
                ? Math.round((d.count / overview.parcelCount) * 100)
                : 0
              return (
                <div key={d.district || 'none'} className='flex items-center gap-3'>
                  <span className='w-20 text-sm font-medium text-[#334155]'>
                    {d.district || 'None'}
                  </span>
                  <div className='flex-1 bg-[#E2E8F0] rounded-full h-4'>
                    <div className='bg-[#1B2A4A] rounded-full h-4' style={{ width: `${pct}%` }} />
                  </div>
                  <span className='text-sm text-[#64748B] w-28 text-right'>
                    {d.count.toLocaleString()} ({pct}%)
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Sub-neighborhoods */}
      <h2 className='text-2xl font-semibold mb-4'>Browse by Sub-Neighborhood</h2>
      <div className='grid md:grid-cols-2 gap-4'>
        {areas.map(
          (area: {
            slug: string
            areaName: string
            parcelCount: number
            districts: Record<string, number>
          }) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 hover:border-[#1B2A4A] transition-colors'
            >
              <h3 className='font-semibold text-lg'>{area.areaName}</h3>
              <p className='text-sm text-[#475569] mt-1'>
                {area.parcelCount?.toLocaleString()} parcels
              </p>
              {area.districts && (
                <div className='flex flex-wrap gap-1 mt-2'>
                  {Object.entries(area.districts).map(([d, c]) => (
                    <span
                      key={d}
                      className='text-xs px-2 py-0.5 bg-[#E2E8F0] rounded-full text-[#475569]'
                    >
                      {d}: {c as number}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
