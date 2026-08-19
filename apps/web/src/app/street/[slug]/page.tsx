import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Change = { metric: string; text: string; magnitude: number }
type ComparisonRow = {
  metric: string
  currentLaw: string
  proposedLaw: string
  change: string | null
}
type Property = {
  gisId: string
  address: string
  currentDistrict: string | null
  proposedDistrict: string | null
  lotSizeSf: number | null
  changes: Change[]
  comparison: ComparisonRow[]
  blockId: string | null
}

async function getStreet(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/street/${slug}`, { cache: 'no-store' })
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
  const street = await getStreet(slug)
  return { title: street ? `${street.streetName} — Zoning Changes` : 'Street Not Found' }
}

const DISTRICT_COLORS: Record<string, string> = {
  'RD-2': '#6B8FC4',
  'RD-3': '#2E5090',
  'RD-4': '#1B2A4A',
  'RG-15': '#8FB8DE',
  'RG-50': '#5A8BB5',
  MFR: '#7C3AED',
}

const DISTRICT_EXPLAIN: Record<string, string> = {
  'RD-2': 'up to 2 units, no parking required',
  'RD-3': 'up to 3 units, no parking required',
  'RD-4': 'up to 4 units, no parking required',
  'RG-15': 'large lots, 1 unit',
  'RG-50': 'up to 2 units',
  MFR: 'multifamily, no unit cap',
}

const CURRENT_EXPLAIN: Record<string, string> = {
  '1F-6000': 'single-family only',
  '1F-8000': 'single-family only (larger lots)',
  '2F-5000': 'one- or two-family',
  MFR: 'multifamily',
}

function getDominantOutcome(properties: Property[]): {
  prop: string
  count: number
  properties: Property[]
  currentDistricts: { district: string; count: number }[]
} | null {
  const groups: Record<string, Property[]> = {}
  for (const p of properties) {
    if (!p.proposedDistrict) continue
    if (!groups[p.proposedDistrict]) groups[p.proposedDistrict] = []
    groups[p.proposedDistrict].push(p)
  }
  const entries = Object.entries(groups).sort(([, a], [, b]) => b.length - a.length)
  if (!entries.length) return null
  const [prop, props] = entries[0]

  const curCounts: Record<string, number> = {}
  for (const p of props) {
    const c = p.currentDistrict || 'Unknown'
    curCounts[c] = (curCounts[c] || 0) + 1
  }
  const currentDistricts = Object.entries(curCounts)
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count)

  return { prop, count: props.length, properties: props, currentDistricts }
}

function buildComparisonForGroup(properties: Property[]): ComparisonRow[] {
  const withComp = properties.filter(p => p.comparison?.length > 0)
  if (!withComp.length) return []
  const rep = withComp[0].comparison
  return rep
}

function computeChangeSummary(properties: Property[], streetName: string) {
  const residential = properties.filter(p => p.proposedDistrict)
  if (!residential.length) return []

  const metrics: Record<string, { count: number; texts: string[] }> = {}
  for (const p of residential) {
    for (const c of p.changes) {
      if (!metrics[c.metric]) metrics[c.metric] = { count: 0, texts: [] }
      metrics[c.metric].count++
      if (!metrics[c.metric].texts.includes(c.text)) metrics[c.metric].texts.push(c.text)
    }
  }

  const lines: { heading: string; detail: string }[] = []

  if (metrics.units) {
    const maxUnits = metrics.units.texts.some(t => t.includes('to 4'))
      ? 4
      : metrics.units.texts.some(t => t.includes('to 3'))
        ? 3
        : 2
    const unitCount = metrics.units.count
    const potentialNew = residential.reduce((sum, p) => {
      const uc = p.changes.find(c => c.metric === 'units')
      return sum + (uc?.magnitude || 0)
    }, 0)

    lines.push({
      heading: `Each property owner could choose to add units — up to ${maxUnits} total per lot`,
      detail: `${unitCount} of ${properties.length} properties on ${streetName} could go from single-family to up to ${maxUnits} units. If every eligible owner chose to maximize, that's ${potentialNew} additional units — but this is an upper bound, not a prediction. No one is required to add anything. Today, most of these lots allow only a single-family dwelling.`,
    })
  }

  if (metrics.parking) {
    const parkingCount = metrics.parking.count
    const curParking = parkingCount * 2

    lines.push({
      heading: `Off-street parking would no longer be required for ${parkingCount} properties`,
      detail: `Today, these ${parkingCount} properties must provide ${curParking} off-street parking spaces (2 each). The proposal removes this requirement — but it does NOT mean driveways disappear. Property owners can keep their existing parking; they just wouldn't need to provide spaces for any new construction. Street parking is a separate city policy and is not affected.`,
    })
  }

  if (metrics.front_setback || metrics.rear_setback) {
    const parts: string[] = []
    if (metrics.front_setback) {
      const match = metrics.front_setback.texts[0].match(/from (\d+).*to (\d+)/)
      if (match) parts.push(`front setback from ${match[1]}' to ${match[2]}'`)
    }
    if (metrics.rear_setback) {
      const match = metrics.rear_setback.texts[0].match(/from (\d+).*to (\d+)/)
      if (match) parts.push(`rear setback from ${match[1]}' to ${match[2]}'`)
    }
    if (parts.length) {
      lines.push({
        heading: 'Buildings could be placed closer to property lines',
        detail: `The ${parts.join(' and ')} would change. This means future construction could use more of the lot. Existing buildings that already meet today's rules are unaffected — this only applies to new construction or major renovations.`,
      })
    }
  }

  if (metrics.permeable) {
    lines.push({
      heading: 'A new minimum for green/permeable space is being introduced',
      detail:
        'The proposal adds a rule that a percentage of each lot must remain unpaved (grass, garden, permeable pavers, etc.). This is a new requirement — no such rule exists today.',
    })
  }

  return lines
}

export default async function StreetPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}) {
  const { slug } = await params
  const { from } = await searchParams
  const data = await getStreet(slug)
  if (!data) notFound()

  const districts: Record<string, number> = data.districts || {}
  const properties: Property[] = data.properties || []

  const fromProperty = from ? properties.find(p => p.gisId === from) : null
  const dominant = getDominantOutcome(properties)
  const changeSummary = computeChangeSummary(properties, data.streetName)

  const comparisonRows = dominant ? buildComparisonForGroup(dominant.properties) : []

  const otherOutcomes: { prop: string; count: number; properties: Property[] }[] = (() => {
    const groups: Record<string, Property[]> = {}
    for (const p of properties) {
      if (!p.proposedDistrict) continue
      if (dominant && p.proposedDistrict === dominant.prop) continue
      if (!groups[p.proposedDistrict]) groups[p.proposedDistrict] = []
      groups[p.proposedDistrict].push(p)
    }
    return Object.entries(groups)
      .map(([prop, props]) => ({ prop, count: props.length, properties: props }))
      .sort((a, b) => b.count - a.count)
  })()

  const noChangeProperties = properties.filter(p => !p.proposedDistrict)

  const dominantPct = dominant ? Math.round((dominant.count / properties.length) * 100) : 0

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      {fromProperty ? (
        <Link
          href={`/property/${from}`}
          className='text-sm text-[#64748B] hover:text-[#1B2A4A] mb-6 inline-block'
        >
          ← Back to {fromProperty.address}
        </Link>
      ) : (
        <Link
          href='/overview'
          className='text-sm text-[#64748B] hover:text-[#1B2A4A] mb-6 inline-block'
        >
          ← Back to overview
        </Link>
      )}

      <h1 className='text-3xl font-bold mb-1'>{data.streetName}</h1>
      <p className='text-[#475569] mb-8'>
        {properties.length} properties · Proposed zoning changes under the{' '}
        <a
          href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=street'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-[#2E5090]'
        >
          July 2026 draft
        </a>
      </p>

      {/* Context bar when coming from a property */}
      {fromProperty && (
        <div className='bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-5 mb-8'>
          <p className='text-sm font-semibold text-[#1E40AF] mb-1'>
            Your property: {fromProperty.address}
          </p>
          <p className='text-sm text-[#475569]'>
            {fromProperty.currentDistrict} →{' '}
            <span className='font-medium'>{fromProperty.proposedDistrict}</span>
            {fromProperty.lotSizeSf
              ? ` · ${Math.round(fromProperty.lotSizeSf).toLocaleString()} sf lot`
              : ''}
            {' · '}
            <Link href={`/property/${from}`} className='text-[#2E5090] underline'>
              View full analysis
            </Link>
          </p>
        </div>
      )}

      {/* District overview — what's happening at a glance */}
      {dominant && (
        <section className='mb-10'>
          <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6'>
            <p className='text-sm text-[#64748B] uppercase tracking-wide mb-2'>The big picture</p>
            <p className='text-lg text-[#0F172A] leading-relaxed'>
              {dominantPct === 100 ? 'Every' : `${dominantPct}% of`} propert
              {dominantPct === 100 ? 'y' : 'ies'} on {data.streetName}
              {dominantPct < 100 && ` (${dominant.count} of ${properties.length})`} would be rezoned
              to allow{' '}
              <span className='font-semibold text-[#2E5090]'>
                {DISTRICT_EXPLAIN[dominant.prop] || dominant.prop}
              </span>
              .
            </p>
            {dominant.currentDistricts.length > 1 && (
              <p className='text-sm text-[#64748B] mt-2'>
                These {dominant.count} properties currently have different zoning (
                {dominant.currentDistricts
                  .map(d => `${d.count} are ${CURRENT_EXPLAIN[d.district] || d.district}`)
                  .join(', ')}
                ) but would all move to the same proposed rules.
              </p>
            )}
            {otherOutcomes.length > 0 && (
              <p className='text-sm text-[#64748B] mt-2'>
                {otherOutcomes
                  .map(
                    o =>
                      `${o.count} propert${o.count === 1 ? 'y' : 'ies'} would be rezoned to ${DISTRICT_EXPLAIN[o.prop] || o.prop}`
                  )
                  .join('. ')}
                .
              </p>
            )}
            {noChangeProperties.length > 0 && (
              <p className='text-sm text-[#94A3B8] mt-1'>
                {noChangeProperties.length} propert
                {noChangeProperties.length === 1 ? 'y is' : 'ies are'} non-residential and not
                affected.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Comparison table for the dominant transition */}
      {comparisonRows.length > 0 && dominant && (
        <section className='mb-10'>
          <h2 className='text-xl font-semibold mb-2'>Current Rules vs. Proposed</h2>
          <p className='text-sm text-[#64748B] mb-4'>
            Side-by-side comparison of what&apos;s allowed today vs. what would be allowed under the
            proposal.
            {dominantPct < 100 &&
              ` Showing rules for the ${dominant.count} properties being rezoned to ${DISTRICT_EXPLAIN[dominant.prop] || dominant.prop}.`}
          </p>
          <div className='border border-[#E2E8F0] rounded-lg overflow-hidden'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-[#F8FAFC] border-b border-[#E2E8F0]'>
                  <th className='px-4 py-3 text-left font-medium text-[#64748B]'>Rule</th>
                  <th className='px-4 py-3 text-right font-medium text-[#64748B]'>Today</th>
                  <th className='px-4 py-3 text-right font-medium text-[#2E5090]'>Proposed</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(row => (
                  <tr
                    key={row.metric}
                    className={`border-b border-[#E2E8F0] last:border-0 ${row.change ? 'bg-[#EFF6FF]' : ''}`}
                  >
                    <td className='px-4 py-3 font-medium text-[#0F172A]'>{row.metric}</td>
                    <td className='px-4 py-3 text-right text-[#475569]'>{row.currentLaw}</td>
                    <td className='px-4 py-3 text-right font-medium text-[#0F172A]'>
                      {row.proposedLaw}
                      {row.change === 'increase' && (
                        <span className='ml-1.5 text-xs text-[#2E5090]'>↑</span>
                      )}
                      {row.change === 'decrease' && (
                        <span className='ml-1.5 text-xs text-[#6B8FC4]'>↓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* What does this mean — narrative with full context */}
      {changeSummary.length > 0 && (
        <section className='mb-10'>
          <h2 className='text-xl font-semibold mb-5'>What does this actually mean?</h2>
          <div className='space-y-4'>
            {changeSummary.map((item, i) => (
              <div key={i} className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
                <h3 className='font-semibold text-[#0F172A] mb-2'>{item.heading}</h3>
                <p className='text-sm text-[#475569] leading-relaxed'>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* District distribution bar */}
      {Object.keys(districts).length > 1 && (
        <section className='mb-10'>
          <h2 className='text-lg font-semibold mb-3'>District Distribution</h2>
          <div>
            <div className='flex rounded-full overflow-hidden h-3 mb-2'>
              {Object.entries(districts).map(([dist, count]) => {
                const total = Object.values(districts).reduce((s, n) => s + n, 0)
                return (
                  <div
                    key={dist}
                    className='h-full'
                    style={{
                      width: `${(count / total) * 100}%`,
                      backgroundColor: DISTRICT_COLORS[dist] || '#94A3B8',
                    }}
                  />
                )
              })}
            </div>
            <div className='flex flex-wrap gap-x-4 gap-y-1'>
              {Object.entries(districts).map(([dist, count]) => {
                const total = Object.values(districts).reduce((s, n) => s + n, 0)
                return (
                  <div key={dist} className='flex items-center gap-1.5 text-xs text-[#475569]'>
                    <div
                      className='w-2.5 h-2.5 rounded-full'
                      style={{ backgroundColor: DISTRICT_COLORS[dist] || '#94A3B8' }}
                    />
                    <span className='font-medium'>{dist}</span>
                    <span className='text-[#94A3B8]'>
                      {count} ({Math.round((count / total) * 100)}%)
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All properties — collapsed */}
      <section>
        <h2 className='text-lg font-semibold mb-2'>All {properties.length} Properties</h2>
        <p className='text-sm text-[#64748B] mb-4'>
          Click to expand a group and see individual addresses.
        </p>

        {(() => {
          const groups: { label: string; key: string; props: Property[] }[] = []

          if (dominant) {
            groups.push({
              key: dominant.prop,
              label: `${dominant.count} rezoned to ${DISTRICT_EXPLAIN[dominant.prop] || dominant.prop} (${dominant.prop})`,
              props: dominant.properties,
            })
          }
          for (const o of otherOutcomes) {
            groups.push({
              key: o.prop,
              label: `${o.count} rezoned to ${DISTRICT_EXPLAIN[o.prop] || o.prop} (${o.prop})`,
              props: o.properties,
            })
          }
          if (noChangeProperties.length) {
            groups.push({
              key: 'none',
              label: `${noChangeProperties.length} not affected (non-residential)`,
              props: noChangeProperties,
            })
          }

          return groups.map(g => (
            <details key={g.key} className='group mb-4'>
              <summary className='cursor-pointer list-none'>
                <div className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#F8FAFC] transition-colors'>
                  <span className='text-sm text-[#475569]'>{g.label}</span>
                  <ChevronDown className='w-4 h-4 text-[#94A3B8] ml-auto transition-transform group-open:rotate-180' />
                </div>
              </summary>
              <div className='border border-[#E2E8F0] rounded-lg overflow-hidden mt-2 ml-3'>
                <div className='divide-y divide-[#E2E8F0]'>
                  {g.props.map(p => {
                    const isYou = p.gisId === from
                    return (
                      <Link
                        key={p.gisId}
                        href={`/property/${p.gisId}`}
                        className={`flex items-center justify-between px-4 py-2.5 transition-colors ${isYou ? 'bg-[#EFF6FF] hover:bg-[#DBEAFE]' : 'hover:bg-[#F8FAFC]'}`}
                      >
                        <div className='flex items-center gap-2'>
                          <span className='font-medium text-sm text-[#0F172A]'>{p.address}</span>
                          {isYou && (
                            <span className='text-xs px-1.5 py-0.5 rounded bg-[#1E40AF] text-white'>
                              You
                            </span>
                          )}
                        </div>
                        <span className='text-xs text-[#94A3B8]'>
                          {p.lotSizeSf ? `${Math.round(p.lotSizeSf).toLocaleString()} sf` : ''}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </details>
          ))
        })()}
      </section>
    </div>
  )
}
