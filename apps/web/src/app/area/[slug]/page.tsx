import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function getArea(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/area/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = await getArea(slug)
  return { title: area ? `${area.areaName} — Zoning Changes` : 'Area Not Found' }
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getArea(slug)
  if (!data) notFound()

  const districts: Record<string, number> = data.districts || {}
  const stats = data.stats || {}
  const streets: {
    slug: string
    streetName: string
    parcelCount: number | null
    districts: Record<string, number> | null
  }[] = data.streets || []
  const districtColors: Record<string, string> = {
    'RD-2': '#6B8FC4',
    'RD-3': '#2E5090',
    'RD-4': '#1B2A4A',
    'RG-15': '#8FB8DE',
    'RG-50': '#5A8BB5',
    MFR: '#7C3AED',
  }
  const total = Object.values(districts).reduce((s, n) => s + n, 0)
  const dominant = Object.entries(districts).sort(([, a], [, b]) => b - a)[0]

  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <Link
        href='/overview'
        className='text-sm text-[#64748B] hover:text-[#1B2A4A] mb-6 inline-block'
      >
        ← Back to overview
      </Link>

      <h1 className='text-3xl font-bold mb-1'>{data.areaName}</h1>
      <p className='text-[#475569] mb-8'>
        {data.parcelCount} residential parcels · Proposed zoning changes under the{' '}
        <a
          href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=area'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-[#2E5090]'
        >
          July 2026 draft
        </a>
      </p>

      {/* Impact cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Parcels</p>
          <p className='text-2xl font-bold mt-1'>{data.parcelCount || 0}</p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Dominant District</p>
          <p className='text-2xl font-bold mt-1'>{dominant?.[0] || '—'}</p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Streets</p>
          <p className='text-2xl font-bold mt-1'>{streets.length}</p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Median Lot</p>
          <p className='text-2xl font-bold mt-1'>
            {stats.median_lot_sf ? `${Math.round(stats.median_lot_sf).toLocaleString()} sf` : '—'}
          </p>
        </div>
      </div>

      {/* District bar */}
      {total > 0 && (
        <section className='mb-10'>
          <h2 className='text-lg font-semibold mb-3'>Proposed District Distribution</h2>
          <div className='flex rounded-full overflow-hidden h-3 mb-2'>
            {Object.entries(districts).map(([dist, count]) => (
              <div
                key={dist}
                className='h-full'
                style={{
                  width: `${(count / total) * 100}%`,
                  backgroundColor: districtColors[dist] || '#94A3B8',
                }}
              />
            ))}
          </div>
          <div className='flex flex-wrap gap-x-4 gap-y-1'>
            {Object.entries(districts).map(([dist, count]) => (
              <div key={dist} className='flex items-center gap-1.5 text-xs text-[#475569]'>
                <div
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ backgroundColor: districtColors[dist] || '#94A3B8' }}
                />
                <span className='font-medium'>{dist}</span>
                <span className='text-[#94A3B8]'>
                  {count} ({Math.round((count / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Streets table */}
      <section>
        <h2 className='text-lg font-semibold mb-3'>Browse Streets</h2>
        <div className='border border-[#E2E8F0] rounded-lg overflow-hidden'>
          <table className='w-full text-sm hidden md:table'>
            <thead>
              <tr className='bg-[#F8FAFC] border-b border-[#E2E8F0]'>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Street</th>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Properties</th>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Districts</th>
              </tr>
            </thead>
            <tbody>
              {streets
                .filter(s => (s.parcelCount || 0) > 0)
                .sort((a, b) => (b.parcelCount || 0) - (a.parcelCount || 0))
                .map((s, i) => (
                  <tr
                    key={s.slug}
                    className={`border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}
                  >
                    <td className='px-4 py-3'>
                      <Link
                        href={`/street/${s.slug}`}
                        className='text-[#2E5090] hover:underline font-medium'
                      >
                        {s.streetName}
                      </Link>
                    </td>
                    <td className='px-4 py-3 text-[#475569]'>{s.parcelCount || 0}</td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-1.5'>
                        {Object.entries(s.districts || {}).map(([dist, count]) => (
                          <span
                            key={dist}
                            className='text-xs px-2 py-0.5 rounded-full text-white'
                            style={{ backgroundColor: districtColors[dist] || '#94A3B8' }}
                          >
                            {dist}: {count as number}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className='md:hidden divide-y divide-[#E2E8F0]'>
            {streets
              .filter(s => (s.parcelCount || 0) > 0)
              .sort((a, b) => (b.parcelCount || 0) - (a.parcelCount || 0))
              .map(s => (
                <Link
                  key={s.slug}
                  href={`/street/${s.slug}`}
                  className='flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] transition-colors'
                >
                  <div>
                    <span className='font-medium text-[#0F172A]'>{s.streetName}</span>
                    <span className='text-xs text-[#94A3B8] ml-2'>{s.parcelCount} properties</span>
                  </div>
                  <div className='flex gap-1'>
                    {Object.entries(s.districts || {}).map(([dist, _count]) => (
                      <span
                        key={dist}
                        className='text-xs px-2 py-0.5 rounded-full text-white'
                        style={{ backgroundColor: districtColors[dist] || '#94A3B8' }}
                      >
                        {dist}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
