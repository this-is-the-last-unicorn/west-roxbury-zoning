import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sources & Methodology',
  description: 'Data sources, calculation methodology, and known limitations.',
}

const sources = [
  {
    name: 'Boston Planning Department — Neighborhood Housing',
    url: 'https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=sources_top',
    description:
      "The city's official page for the Neighborhood Housing Zoning Initiative — meeting schedule, draft maps, comment submission, and contact information",
  },
  {
    name: 'Proposed Zoning Districts (City GIS Layer)',
    url: 'https://gis.bostonplans.org/hosting/rest/services/Neighborhood_Housing_Zoning_Subdistricts/FeatureServer/0',
    description:
      'Official proposed zoning polygon layer from Boston Planning — used to assign each parcel its proposed district (RD-2, RD-3, RD-4, etc.) via spatial join',
  },
  {
    name: 'Boston GIS Parcels',
    url: 'https://data.boston.gov/dataset/parcels-20231',
    description: 'Parcel boundaries, lot area, current zoning district assignments',
  },
  {
    name: 'City of Boston Assessor Data (FY2026)',
    url: 'https://data.boston.gov/dataset/property-assessment',
    description: 'Building type, year built, units, roof structure, living area',
  },
  {
    name: 'Draft Zoning Text — Neighborhood Housing',
    url: 'https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=sources_draft',
    description:
      'Proposed dimensional tables, district definitions, transition rules (July 2026 draft)',
  },
  {
    name: 'MassGIS Road Network',
    url: 'https://www.mass.gov/info-details/massgis-data-massachusetts-department-of-transportation-massdot-roads',
    description: 'Street centerlines used for block definition algorithm',
  },
  {
    name: 'Boston Rooftop & Building Footprint Data',
    url: 'https://data.boston.gov/dataset/boston-buildings-with-roof-breaks',
    description: 'Building footprints, roof elevation, highest point elevation',
  },
  {
    name: 'Current Zoning Code (Article 56)',
    url: 'https://codelibrary.amlegal.com/codes/boston/latest/boston_zoning/0-0-0-18508',
    description: 'Current West Roxbury Neighborhood District dimensional requirements (Table D)',
  },
]

export default function SourcesPage() {
  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-4'>Sources & Methodology</h1>
      <p className='text-[#475569] mb-8'>
        All data used in this analysis comes from publicly available government sources. Every link
        goes directly to the original dataset or document — you can verify anything we show.
      </p>

      <div className='space-y-4 mb-12'>
        {sources.map(s => (
          <div key={s.name} className='bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6'>
            <h2 className='font-semibold text-lg'>
              <a
                href={s.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#2E5090] hover:underline'
              >
                {s.name} ↗
              </a>
            </h2>
            <p className='text-[#475569] text-sm mt-1'>{s.description}</p>
            <p className='text-xs text-[#94A3B8] mt-2 break-all'>{s.url}</p>
          </div>
        ))}
      </div>

      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4'>Methodology</h2>
        <div className='text-[#475569] space-y-3'>
          <p>
            Each parcel is analyzed by joining{' '}
            <a
              href='https://data.boston.gov/dataset/parcels-20231'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              GIS boundary data
            </a>{' '}
            with{' '}
            <a
              href='https://data.boston.gov/dataset/property-assessment'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              assessor records
            </a>
            , applying current zoning rules from{' '}
            <a
              href='https://codelibrary.amlegal.com/codes/boston/latest/boston_zoning/0-0-0-18508'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              Article 56
            </a>
            , then computing proposed zoning outcomes based on the{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=sources'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              draft text
            </a>
            .
          </p>
          <p>
            Setback estimates are derived from building footprint position relative to parcel
            boundary — these are approximations, not survey-grade measurements.
          </p>
          <p>
            All 21 calculation formulas (B1–B21) are documented in the{' '}
            <a
              href='https://github.com/the-last-unicorn/west-roxbury-zoning'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              project repository
            </a>
            . The full pseudocode is available on GitHub.
          </p>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Official Resources</h2>
        <div className='text-[#475569] space-y-2 text-sm'>
          <p>
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=sources'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#2E5090] underline font-medium'
            >
              Boston Planning Department — Neighborhood Housing ↗
            </a>{' '}
            — the city&apos;s official page for the proposal, meetings, and public comment
          </p>
          <p>
            <a
              href='https://www.boston.gov/departments/neighborhood-development'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#2E5090] underline font-medium'
            >
              Boston Neighborhood Development ↗
            </a>{' '}
            — the department overseeing housing policy
          </p>
          <p>
            <a
              href='https://data.boston.gov'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#2E5090] underline font-medium'
            >
              Analyze Boston (data.boston.gov) ↗
            </a>{' '}
            — the city&apos;s open data portal
          </p>
        </div>
      </section>
    </div>
  )
}
