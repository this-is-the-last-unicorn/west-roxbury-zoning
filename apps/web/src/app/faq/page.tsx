import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about the proposed zoning changes in West Roxbury.',
}

export default function FaqPage() {
  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-4'>Frequently Asked Questions</h1>
      <p className='text-[#475569] mb-8'>
        Common questions about the proposed zoning changes and how this site works.
      </p>

      <div className='space-y-6'>
        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>What is this site?</h2>
          <p className='text-[#475569]'>
            An independent civic-data tool that analyzes Boston&apos;s{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=faq'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              proposed zoning changes
            </a>{' '}
            for every residential parcel in West Roxbury. It translates the draft zoning text into
            plain-language, property-specific information.
          </p>
        </div>

        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>
            Is this affiliated with the City of Boston?
          </h2>
          <p className='text-[#475569]'>
            No. This is an independent project. We use publicly available City data from{' '}
            <a
              href='https://data.boston.gov'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              Analyze Boston
            </a>{' '}
            and the draft zoning text, but we are not affiliated with, endorsed by, or funded by the
            City of Boston or the{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=faq'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              Boston Planning Department
            </a>
            .
          </p>
        </div>

        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>What data does this site use?</h2>
          <p className='text-[#475569]'>
            <a
              href='https://data.boston.gov/dataset/parcels-20231'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              Boston GIS parcel data
            </a>
            ,{' '}
            <a
              href='https://data.boston.gov/dataset/property-assessment'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              City assessor records
            </a>
            , the{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=faq_data'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              July 2026 draft zoning text
            </a>
            , and{' '}
            <a
              href='https://www.mass.gov/info-details/massgis-data-massachusetts-department-of-transportation-massdot-roads'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              MassGIS road network data
            </a>
            . All sources are listed on our{' '}
            <Link href='/sources' className='underline text-[#2E5090]'>
              Sources page
            </Link>
            .
          </p>
        </div>

        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>How accurate is the analysis?</h2>
          <p className='text-[#475569]'>
            The analysis is based on the best available public data and the draft zoning text. Some
            values (like setback estimates) are approximations. All limitations are clearly noted on
            each property page. You can review the{' '}
            <a
              href='https://github.com/this-is-the-last-unicorn/west-roxbury-zoning'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              full methodology on GitHub
            </a>
            .
          </p>
        </div>

        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>Is this open source?</h2>
          <p className='text-[#475569]'>
            Yes. The full codebase is available at{' '}
            <a
              href='https://github.com/this-is-the-last-unicorn/west-roxbury-zoning'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              github.com/this-is-the-last-unicorn/west-roxbury-zoning
            </a>{' '}
            under the{' '}
            <a
              href='https://opensource.org/licenses/MIT'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              MIT license
            </a>
            . All data sources, calculations, and methodology are documented.
          </p>
        </div>

        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>Who built this?</h2>
          <p className='text-[#475569]'>
            Created by Emily Gamble, prepared by The Last Unicorn, LLC.{' '}
            <Link href='/about' className='underline text-[#2E5090]'>
              Learn more about the project
            </Link>
            .
          </p>
        </div>

        <div className='border-b border-[#E2E8F0] pb-6'>
          <h2 className='text-lg font-semibold mb-2'>
            How can I provide feedback on the actual zoning proposal?
          </h2>
          <p className='text-[#475569]'>
            Visit{' '}
            <a
              href='https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=faq_feedback'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              bostonplans.org/neighborhood-housing
            </a>{' '}
            to submit official feedback to the Boston Planning Department, or email{' '}
            <a href='mailto:Will.Cohen@boston.gov' className='underline text-[#2E5090]'>
              Will.Cohen@boston.gov
            </a>
            . You can also{' '}
            <Link href='/meetings' className='underline text-[#2E5090]'>
              attend an upcoming meeting
            </Link>
            .
          </p>
        </div>

        <div className='pb-6'>
          <h2 className='text-lg font-semibold mb-2'>What does this site use for analytics?</h2>
          <p className='text-[#475569]'>
            We use{' '}
            <a
              href='https://umami.is'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-[#2E5090]'
            >
              Umami
            </a>{' '}
            — an open-source analytics tool that doesn&apos;t use cookies or collect personal
            information. We only see aggregate page views. Read our full{' '}
            <Link href='/privacy' className='underline text-[#2E5090]'>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
