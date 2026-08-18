import type { Metadata } from 'next'
import { MapView } from '@/components/map-view'

export const metadata: Metadata = {
  title: 'Browse Map',
  description: 'Explore proposed zoning changes across West Roxbury on an interactive map.',
}

export default function MapPage() {
  return (
    <div className='flex flex-col h-[calc(100vh-64px)]'>
      <MapView />
    </div>
  )
}
