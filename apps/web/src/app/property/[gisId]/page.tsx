import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageSquare, CalendarDays, HelpCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type Change = { metric: string; text: string; magnitude: number }
type CompRow = { metric: string; currentLaw: string; proposedLaw: string; change: string | null }

type Parcel = {
  gisId: string
  address: string
  stName: string | null
  proposedDistrict: string | null
  currentDistrict: string | null
  lotSizeSf: number | null
  lotTier: string | null
  applicableTable: string | null
  isNonResidential: boolean
  isCondo: boolean
  results: {
    summary: Change[] | null
    comparison: CompRow[] | null
    outcomes: {
      existing_height: number | null
      existing_units: number | null
      yr_built: number | null
      building_footprint: number | null
      roof_structure: string | null
      bldg_type: string | null
      lu_desc: string | null
      lot_coverage_pct: number | null
    } | null
    blockId: string | null
  } | null
}

const DISTRICT_PLAIN: Record<string, string> = {
  'RD-2': 'Up to 2 units per lot',
  'RD-3': 'Up to 3 units per lot',
  'RD-4': 'Up to 4 units per lot',
  'RG-15': 'Large lots, 1 unit',
  'RG-50': 'Up to 2 units per lot',
  MFR: 'Multifamily, no unit cap',
}

const CURRENT_PLAIN: Record<string, string> = {
  '1F-6000': 'Single-family only (6,000 sf min lot)',
  '1F-8000': 'Single-family only (8,000 sf min lot)',
  '2F-5000': 'Two-family allowed (5,000 sf min lot)',
  MFR: 'Multi-family residential',
}

function humanizeChange(c: Change): { heading: string; detail: string } {
  switch (c.metric) {
    case 'units':
      return {
        heading: `You could have up to ${c.magnitude + 1} units on your lot`,
        detail:
          'Today this property only allows a single-family dwelling. Under the proposal, you could choose to add an in-law suite, a rental unit, or convert to a multi-family — up to ' +
          (c.magnitude + 1) +
          ' units total. No one is required to change anything.',
      }
    case 'front_setback': {
      const match = c.text.match(/from (\d+).* to (\d+)/)
      return {
        heading: 'Future buildings could sit closer to the street',
        detail: match
          ? `The minimum distance between your building and the street ("front setback") would go from ${match[1]} feet to ${match[2]} feet. Your existing structure is not affected — this only applies to new construction or major additions.`
          : `The front setback requirement would be reduced. Your existing structure is not affected.`,
      }
    }
    case 'rear_setback': {
      const match = c.text.match(/from (\d+).* to (\d+)/)
      return {
        heading: 'Future buildings could be closer to the back property line',
        detail: match
          ? `The minimum distance from the rear of a building to the back of your lot ("rear setback") would go from ${match[1]} feet to ${match[2]} feet. Existing structures are unaffected.`
          : `The rear setback requirement would be reduced. Existing structures are unaffected.`,
      }
    }
    case 'parking':
      return {
        heading: 'Off-street parking would no longer be required',
        detail:
          "Today, zoning requires off-street parking spaces. The proposal removes that requirement. Your existing driveway doesn't change — this just means future projects wouldn't be forced to include parking.",
      }
    case 'permeable':
      return {
        heading: 'A new green space requirement would be added',
        detail:
          "The proposal adds a minimum percentage of your lot that must remain unpaved (grass, garden, permeable pavers). This is a new rule that doesn't exist today.",
      }
    default:
      return { heading: c.text, detail: '' }
  }
}

const METRIC_EXPLAIN: Record<string, string> = {
  Height: 'Maximum building height allowed',
  Stories: 'How many floors a building can have',
  'Dwelling Units': 'How many separate units can be on this lot',
  'Front Setback': 'Minimum distance from house to street',
  'Side Yard (cumul.)': 'Combined minimum distance from house to both side property lines',
  'Rear Setback': 'Minimum distance from house to back property line',
  'Lot Coverage': 'Maximum % of lot that can be covered by buildings',
  'Off-Street Parking': 'Required off-street parking spaces',
  'Permeable Area': 'Minimum % of lot that must be unpaved (grass, garden, etc.)',
}

async function getProperty(gisId: string): Promise<Parcel | null> {
  try {
    const res = await fetch(`${API_URL}/api/property/${gisId}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gisId: string }>
}): Promise<Metadata> {
  const { gisId } = await params
  const parcel = await getProperty(gisId)
  return { title: parcel ? `${parcel.address} — Zoning Analysis` : 'Property Not Found' }
}

export default async function PropertyPage({ params }: { params: Promise<{ gisId: string }> }) {
  const { gisId } = await params
  const parcel = await getProperty(gisId)
  if (!parcel) notFound()

  const { results } = parcel
  const summary = (results?.summary || []) as Change[]
  const comparison = (results?.comparison || []) as CompRow[]
  const outcomes = results?.outcomes
  const streetSlug = parcel.stName?.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '') || ''

  const curPlain = CURRENT_PLAIN[parcel.currentDistrict || ''] || parcel.currentDistrict || ''
  const propPlain = DISTRICT_PLAIN[parcel.proposedDistrict || ''] || parcel.proposedDistrict || ''

  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <Link href='/' className='text-sm text-[#64748B] hover:text-[#1B2A4A] mb-6 inline-block'>
        ← Back to search
      </Link>

      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>{parcel.address}</h1>
        <p className='text-[#475569] mt-2'>
          {curPlain}
          {parcel.lotSizeSf ? ` · ${Math.round(parcel.lotSizeSf).toLocaleString()} sq ft lot` : ''}
        </p>
        {parcel.proposedDistrict && (
          <p className='mt-1 text-sm text-[#2E5090] font-medium'>Proposed change: {propPlain}</p>
        )}
      </div>

      {/* Condo note */}
      {parcel.isCondo && (
        <div className='border-l-4 border-[#3B82F6] bg-[#EFF6FF] px-6 py-4 rounded-r-lg mb-6'>
          <p className='text-sm text-[#1E40AF] font-medium'>This is a condo unit</p>
          <p className='text-sm text-[#475569] mt-1'>
            Zoning applies to the whole building/lot, not individual units. Any changes would
            require the condo association or building owner to act. The analysis below covers the
            entire property.
          </p>
        </div>
      )}

      {/* Non-residential */}
      {parcel.isNonResidential ? (
        <div className='border-l-4 border-[#94A3B8] bg-[#F8FAFC] px-6 py-4 rounded-r-lg mb-6'>
          <p className='text-sm text-[#475569]'>
            This property is zoned <strong>{parcel.currentDistrict}</strong> (non-residential). The
            proposed changes only apply to residential zoning districts, so this property is not
            directly affected.
          </p>
          <div className='mt-3 flex gap-4 text-sm'>
            <Link href='/map' className='text-[#1B2A4A] underline'>
              View on map
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Reassurance */}
          <div className='border-l-4 border-teal-500 bg-teal-50 px-6 py-4 rounded-r-lg mb-8'>
            <p className='text-sm font-medium text-teal-800'>
              Your existing property can stay exactly as it is.
            </p>
            <p className='text-sm text-teal-700 mt-1'>
              This proposal changes what <em>could</em> be built here in the future. It does not
              require you to change, sell, or alter your property in any way.
            </p>
          </div>

          {/* What changes — human readable cards */}
          {summary.length > 0 && (
            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>What would change for your property?</h2>
              <div className='space-y-4'>
                {summary.map((s, i) => {
                  const h = humanizeChange(s)
                  return (
                    <div key={i} className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-5'>
                      <h3 className='font-semibold text-[#0F172A] mb-2'>{h.heading}</h3>
                      {h.detail && (
                        <p className='text-sm text-[#475569] leading-relaxed'>{h.detail}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {summary.length === 0 && parcel.proposedDistrict && (
            <section className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 mb-8'>
              <h2 className='text-xl font-semibold mb-2'>What would change?</h2>
              <p className='text-[#475569]'>
                The proposal makes little or no material change to what is permitted on your
                property.
              </p>
            </section>
          )}

          {/* Your property today */}
          {outcomes && (
            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-4'>Your Property Today</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {outcomes.yr_built && (
                  <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4'>
                    <p className='text-xs text-[#64748B] uppercase tracking-wide'>Built</p>
                    <p className='text-xl font-bold mt-1'>{outcomes.yr_built}</p>
                  </div>
                )}
                {outcomes.lu_desc && (
                  <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4'>
                    <p className='text-xs text-[#64748B] uppercase tracking-wide'>Type</p>
                    <p className='text-sm font-semibold mt-1 capitalize'>
                      {outcomes.lu_desc.toLowerCase().replace('dwelling', '').trim()}
                    </p>
                  </div>
                )}
                {outcomes.existing_units != null && outcomes.existing_units > 0 && (
                  <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4'>
                    <p className='text-xs text-[#64748B] uppercase tracking-wide'>Current Units</p>
                    <p className='text-xl font-bold mt-1'>{outcomes.existing_units}</p>
                  </div>
                )}
                {outcomes.existing_height != null && (
                  <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4'>
                    <p className='text-xs text-[#64748B] uppercase tracking-wide'>Height</p>
                    <p className='text-xl font-bold mt-1'>
                      {Math.round(outcomes.existing_height)} ft
                    </p>
                  </div>
                )}
                {outcomes.building_footprint != null && outcomes.building_footprint > 0 && (
                  <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4'>
                    <p className='text-xs text-[#64748B] uppercase tracking-wide'>Footprint</p>
                    <p className='text-xl font-bold mt-1'>
                      {Math.round(outcomes.building_footprint).toLocaleString()} sf
                    </p>
                    {outcomes.lot_coverage_pct != null && (
                      <p className='text-xs text-[#94A3B8] mt-0.5'>
                        {Math.round(outcomes.lot_coverage_pct)}% of lot
                      </p>
                    )}
                  </div>
                )}
                {outcomes.roof_structure && (
                  <div className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-4'>
                    <p className='text-xs text-[#64748B] uppercase tracking-wide'>Roof Style</p>
                    <p className='text-sm font-semibold mt-1'>
                      {outcomes.roof_structure.replace(/^[A-Z] - /, '')}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Side-by-side comparison */}
          {comparison.length > 0 && (
            <section className='mb-8'>
              <h2 className='text-xl font-semibold mb-2'>Side-by-Side: Today vs. Proposed</h2>
              <p className='text-sm text-[#64748B] mb-4'>
                What the zoning rules allow now, and what they would allow under the proposal.
              </p>
              <div className='border border-[#E2E8F0] rounded-lg overflow-hidden'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='bg-[#1B2A4A] text-white'>
                      <th className='text-left py-3 px-4 font-medium'>Rule</th>
                      <th className='text-left py-3 px-4 font-medium'>Today</th>
                      <th className='text-left py-3 px-4 font-medium'>Proposed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => {
                      const explain = METRIC_EXPLAIN[row.metric]
                      const changed = row.change != null
                      return (
                        <tr
                          key={i}
                          className={`border-b border-[#E2E8F0] ${changed ? 'bg-[#EFF6FF]' : ''}`}
                        >
                          <td className='py-3 px-4'>
                            <span className='font-medium text-[#334155]'>{row.metric}</span>
                            {explain && (
                              <span className='block text-xs text-[#94A3B8] mt-0.5'>{explain}</span>
                            )}
                          </td>
                          <td className='py-3 px-4 text-[#475569]'>{row.currentLaw}</td>
                          <td className='py-3 px-4'>
                            <span
                              className={
                                changed ? 'font-semibold text-[#0F172A]' : 'text-[#475569]'
                              }
                            >
                              {row.proposedLaw}
                            </span>
                            {row.change === 'increase' && (
                              <span className='ml-1 text-[#2E5090]'>↑</span>
                            )}
                            {row.change === 'decrease' && (
                              <span className='ml-1 text-[#6B8FC4]'>↓</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className='text-xs text-[#94A3B8] mt-2 italic'>
                Highlighted rows indicate a change. ↑ = allows more, ↓ = allows less.
              </p>
            </section>
          )}

          {/* Neighbors */}
          {parcel.stName && (
            <section className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 mb-6'>
              <h2 className='text-xl font-semibold mb-2'>What about your neighbors?</h2>
              <p className='text-sm text-[#475569] mb-4'>
                See how the proposal affects other properties on your street and nearby.
              </p>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href={`/street/${streetSlug}?from=${parcel.gisId}`}
                  className='px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium hover:border-[#1B2A4A] transition-colors'
                >
                  View all of {parcel.stName}
                </Link>
                <Link
                  href='/map'
                  className='px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium hover:border-[#1B2A4A] transition-colors'
                >
                  Browse the map
                </Link>
              </div>
            </section>
          )}

          {/* Next Steps */}
          <section className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-3'>Want to weigh in?</h2>
            <ul className='space-y-3 text-sm text-[#475569]'>
              <li className='flex items-start gap-3'>
                <MessageSquare className='w-4 h-4 text-[#2E5090] mt-0.5 shrink-0' />
                <span>
                  <a
                    href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=property'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#1B2A4A] underline font-medium'
                  >
                    Submit feedback to Boston Planning
                  </a>{' '}
                  — the city wants to hear from residents like you
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <CalendarDays className='w-4 h-4 text-[#2E5090] mt-0.5 shrink-0' />
                <span>
                  <Link href='/meetings' className='text-[#1B2A4A] underline font-medium'>
                    Attend an upcoming meeting
                  </Link>{' '}
                  — ask questions in person or online
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <HelpCircle className='w-4 h-4 text-[#2E5090] mt-0.5 shrink-0' />
                <span>
                  <Link href='/faq' className='text-[#1B2A4A] underline font-medium'>
                    Read the FAQ
                  </Link>{' '}
                  — common questions answered in plain English
                </span>
              </li>
            </ul>
          </section>

          {/* Feedback */}
          <section className='border border-[#E2E8F0] rounded-lg p-6 mb-6 text-center'>
            <p className='text-[#475569] mb-3'>See something wrong? We want to get this right.</p>
            <Link
              href={`/feedback?gisId=${parcel.gisId}`}
              className='px-6 py-2 bg-[#1B2A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2D4A7A] transition-colors inline-block'
            >
              Submit a Correction
            </Link>
          </section>

          {/* Sources */}
          <section className='text-sm text-[#94A3B8] space-y-1'>
            <p>
              Data:{' '}
              <a
                href='https://data.boston.gov/dataset/parcels-20231'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Boston GIS parcels
              </a>
              ,{' '}
              <a
                href='https://data.boston.gov/dataset/property-assessment'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                City assessor FY2026
              </a>
              ,{' '}
              <a
                href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=property_sources'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                draft zoning text (July 2026)
              </a>
              .
            </p>
            <p>
              <Link href='/sources' className='underline'>
                Full sources & methodology
              </Link>
            </p>
          </section>
        </>
      )}
    </div>
  )
}
