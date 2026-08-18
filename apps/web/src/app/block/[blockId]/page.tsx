import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Home, Car, Ruler, TreePine } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Change = { metric: string; text: string; magnitude: number }
type Property = {
  gisId: string
  address: string
  currentDistrict: string | null
  proposedDistrict: string | null
  lotSizeSf: number | null
  changes: Change[]
}

async function getBlock(blockId: string) {
  try {
    const res = await fetch(`${API_URL}/api/block/${blockId}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blockId: string }>
}): Promise<Metadata> {
  const { blockId } = await params
  const block = await getBlock(blockId)
  const title = block?.street ? `${block.street} Block` : 'Block Not Found'
  return { title }
}

function ChangeIcon({ metric }: { metric: string }) {
  const cls = 'w-3 h-3 inline-block mr-0.5'
  switch (metric) {
    case 'units':
      return <Home className={cls} />
    case 'parking':
      return <Car className={cls} />
    case 'front_setback':
    case 'rear_setback':
    case 'side_setback':
      return <Ruler className={cls} />
    case 'permeable':
      return <TreePine className={cls} />
    default:
      return <span className='inline-block w-1.5 h-1.5 rounded-full bg-current mr-0.5' />
  }
}

export default async function BlockPage({ params }: { params: Promise<{ blockId: string }> }) {
  const { blockId } = await params
  const data = await getBlock(blockId)
  if (!data) notFound()

  const districts: Record<string, number> = data.districts || {}
  const stats = data.stats || {}
  const properties: Property[] = data.properties || []
  const impact = data.impact || {}
  const districtColors: Record<string, string> = {
    'RD-2': '#6B8FC4',
    'RD-3': '#2E5090',
    'RD-4': '#1B2A4A',
    'RG-15': '#8FB8DE',
    'RG-50': '#5A8BB5',
    MFR: '#7C3AED',
  }
  const total = Object.values(districts).reduce((s, n) => s + n, 0)

  return (
    <div className='max-w-5xl mx-auto px-6 py-12'>
      <Link
        href='/overview'
        className='text-sm text-[#64748B] hover:text-[#1B2A4A] mb-6 inline-block'
      >
        ← Back to overview
      </Link>

      <h1 className='text-3xl font-bold mb-1'>{data.street || blockId}</h1>
      <p className='text-[#475569] mb-8'>
        {properties.length} properties on this block
        {data.boundsLabel ? ` · ${data.boundsLabel}` : ''}
      </p>

      {/* Impact cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Properties</p>
          <p className='text-2xl font-bold mt-1'>{properties.length}</p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Potential New Units</p>
          <p className='text-2xl font-bold mt-1 text-[#2E5090]'>
            +{impact.totalPotentialNewUnits || 0}
          </p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Median Lot</p>
          <p className='text-2xl font-bold mt-1'>
            {stats.median_lot_sf ? `${Math.round(stats.median_lot_sf).toLocaleString()} sf` : '—'}
          </p>
        </div>
        <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
          <p className='text-xs text-[#64748B] uppercase tracking-wide'>Lot Range</p>
          <p className='text-2xl font-bold mt-1'>
            {stats.min_lot_sf && stats.max_lot_sf
              ? `${Math.round(stats.min_lot_sf).toLocaleString()}–${Math.round(stats.max_lot_sf).toLocaleString()} sf`
              : '—'}
          </p>
        </div>
      </div>

      {/* District bar */}
      {total > 0 && (
        <section className='mb-10'>
          <h2 className='text-lg font-semibold mb-3'>Proposed Districts</h2>
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
                <span className='text-[#94A3B8]'>{count}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Property table */}
      <section>
        <h2 className='text-lg font-semibold mb-3'>Properties on This Block</h2>
        <div className='border border-[#E2E8F0] rounded-lg overflow-hidden'>
          <table className='w-full text-sm hidden md:table'>
            <thead>
              <tr className='bg-[#F8FAFC] border-b border-[#E2E8F0]'>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Address</th>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>District</th>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Lot Size</th>
                <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Key Changes</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr
                  key={p.gisId}
                  className={`border-b border-[#E2E8F0] last:border-0 hover:bg-[#F8FAFC] transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}
                >
                  <td className='px-4 py-3'>
                    <Link
                      href={`/property/${p.gisId}`}
                      className='text-[#2E5090] hover:underline font-medium'
                    >
                      {p.address}
                    </Link>
                  </td>
                  <td className='px-4 py-3'>
                    <span className='text-[#94A3B8]'>{p.currentDistrict}</span>
                    <span className='mx-1.5 text-[#CBD5E1]'>→</span>
                    <span className='font-medium'>{p.proposedDistrict}</span>
                  </td>
                  <td className='px-4 py-3 text-[#475569]'>
                    {p.lotSizeSf ? `${Math.round(p.lotSizeSf).toLocaleString()} sf` : '—'}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex flex-wrap gap-1'>
                      {(p.changes as Change[]).slice(0, 3).map((c, ci) => (
                        <span
                          key={ci}
                          className='text-xs px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1E40AF]'
                        >
                          <ChangeIcon metric={c.metric} />{' '}
                          {c.text.length > 40 ? c.text.slice(0, 37) + '…' : c.text}
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
            {properties.map(p => (
              <Link
                key={p.gisId}
                href={`/property/${p.gisId}`}
                className='block px-4 py-4 hover:bg-[#F8FAFC] transition-colors'
              >
                <div className='flex justify-between items-start mb-1'>
                  <span className='font-medium text-[#0F172A]'>{p.address}</span>
                  <span className='text-xs px-2 py-0.5 rounded-full bg-[#1B2A4A] text-white ml-2 shrink-0'>
                    {p.proposedDistrict}
                  </span>
                </div>
                <div className='text-xs text-[#64748B] mb-2'>
                  {p.currentDistrict} → {p.proposedDistrict}
                  {p.lotSizeSf ? ` · ${Math.round(p.lotSizeSf).toLocaleString()} sf` : ''}
                </div>
                <div className='flex flex-wrap gap-1'>
                  {(p.changes as Change[]).slice(0, 2).map((c, ci) => (
                    <span
                      key={ci}
                      className='text-xs px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1E40AF]'
                    >
                      <ChangeIcon metric={c.metric} />{' '}
                      {c.text.length > 35 ? c.text.slice(0, 32) + '…' : c.text}
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
