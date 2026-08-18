'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const DISTRICT_COLORS: Record<string, string> = {
  'RD-2': '#6B8FC4',
  'RD-3': '#2E5090',
  'RD-4': '#1B2A4A',
  'RG-15': '#8FB8DE',
  'RG-50': '#5A8BB5',
  MFR: '#7C3AED',
}

const WR_CENTER: [number, number] = [-71.155, 42.278]

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const hoveredIdRef = useRef<string | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const [legendOpen, setLegendOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: WR_CENTER,
      zoom: 13.5,
      minZoom: 12,
      maxBounds: [
        [-71.22, 42.24],
        [-71.09, 42.32],
      ],
    })

    m.addControl(new mapboxgl.NavigationControl(), 'top-right')

    m.on('load', () => {
      m.addSource('parcels', {
        type: 'geojson',
        data: '/parcels.geojson',
        promoteId: 'id',
      })

      m.addLayer({
        id: 'parcels-fill',
        type: 'fill',
        source: 'parcels',
        paint: {
          'fill-color': [
            'match',
            ['get', 'prop'],
            'RD-2',
            DISTRICT_COLORS['RD-2'],
            'RD-3',
            DISTRICT_COLORS['RD-3'],
            'RD-4',
            DISTRICT_COLORS['RD-4'],
            'RG-15',
            DISTRICT_COLORS['RG-15'],
            'RG-50',
            DISTRICT_COLORS['RG-50'],
            'MFR',
            DISTRICT_COLORS['MFR'],
            '#94A3B8',
          ],
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.75, 0.45],
        },
      })

      m.addLayer({
        id: 'parcels-outline',
        type: 'line',
        source: 'parcels',
        paint: {
          'line-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#F59E0B',
            'rgba(255,255,255,0.5)',
          ],
          'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2.5, 0.3],
        },
      })

      function clearHover() {
        if (hoveredIdRef.current) {
          m.setFeatureState({ source: 'parcels', id: hoveredIdRef.current }, { hover: false })
          hoveredIdRef.current = null
        }
        if (popupRef.current) {
          popupRef.current.remove()
          popupRef.current = null
        }
      }

      m.on('mousemove', 'parcels-fill', e => {
        if (!e.features?.length) return
        const feat = e.features[0] as mapboxgl.GeoJSONFeature & {
          properties: Record<string, string>
        }
        const id = String(feat.properties?.id ?? '')
        if (!id) return

        if (hoveredIdRef.current === id) {
          popupRef.current?.setLngLat(e.lngLat)
          return
        }

        clearHover()

        m.setFeatureState({ source: 'parcels', id }, { hover: true })
        hoveredIdRef.current = id

        const addr = feat.properties?.addr || 'Unknown address'
        const propDesc = feat.properties?.propDesc || ''
        const curDesc = feat.properties?.curDesc || ''
        const prop = feat.properties?.prop || null

        const changeHtml = prop
          ? `<p style="font-size:12px;color:#1E40AF;font-weight:500;margin:6px 0 2px">What would change:</p>
             <p style="font-size:12px;color:#334155;margin:0">${propDesc}</p>`
          : `<p style="font-size:12px;color:#64748B;margin:6px 0 0">${propDesc}</p>`

        popupRef.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 12,
          maxWidth: '280px',
          className: 'parcel-popup',
        })
          .setLngLat(e.lngLat)
          .setHTML(
            `<div style="font-family:system-ui,sans-serif;line-height:1.4">
              <p style="font-weight:700;font-size:14px;margin:0;color:#0F172A">${addr}</p>
              <p style="font-size:11px;color:#94A3B8;margin:2px 0 0">${curDesc}</p>
              ${changeHtml}
              <p style="font-size:11px;color:#94A3B8;margin:8px 0 0;border-top:1px solid #E2E8F0;padding-top:6px">Click for full analysis →</p>
            </div>`
          )
          .addTo(m)

        m.getCanvas().style.cursor = 'pointer'
      })

      m.on('mouseleave', 'parcels-fill', () => {
        clearHover()
        m.getCanvas().style.cursor = ''
      })

      m.on('click', 'parcels-fill', e => {
        if (!e.features?.length) return
        const id = (
          e.features[0] as mapboxgl.GeoJSONFeature & { properties: Record<string, string> }
        ).properties?.id
        if (id) {
          router.push(`/property/${id}`)
        }
      })
    })

    mapRef.current = m

    return () => {
      m.remove()
      mapRef.current = null
    }
  }, [router])

  return (
    <div className='relative flex-1'>
      <div ref={mapContainer} className='w-full h-full' />

      {/* Legend */}
      <div className='absolute bottom-6 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-[#E2E8F0] z-10 w-72'>
        <button
          onClick={() => setLegendOpen(!legendOpen)}
          className='w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl transition-colors'
        >
          <span>What do the colors mean?</span>
          <span className='text-[#94A3B8]'>{legendOpen ? '▾' : '▸'}</span>
        </button>

        {legendOpen && (
          <div className='px-5 pb-4 space-y-4'>
            <p className='text-xs text-[#64748B] leading-relaxed'>
              Each color shows the <strong>proposed new zoning district</strong> a property would be
              placed in. This determines what could be built there.
            </p>

            <div className='space-y-3'>
              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: DISTRICT_COLORS['RG-15'] }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>RG-15 — Large lots, 1 unit</p>
                  <p className='text-xs text-[#64748B]'>Largest lots. Similar rules to today.</p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: DISTRICT_COLORS['RD-2'] }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>RD-2 — Up to 2 units</p>
                  <p className='text-xs text-[#64748B]'>
                    Could add a second unit (e.g. in-law apartment). Smaller setbacks. No parking
                    required.
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: DISTRICT_COLORS['RG-50'] }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>RG-50 — Up to 2 units</p>
                  <p className='text-xs text-[#64748B]'>
                    Moderate density. 1 parking space required.
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: DISTRICT_COLORS['RD-3'] }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>RD-3 — Up to 3 units</p>
                  <p className='text-xs text-[#64748B]'>
                    Could add up to 2 additional units. Smaller setbacks. No parking required.
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: DISTRICT_COLORS['RD-4'] }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>RD-4 — Up to 4 units</p>
                  <p className='text-xs text-[#64748B]'>
                    Could add up to 3 additional units. Smaller setbacks. No parking required.
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: DISTRICT_COLORS['MFR'] }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>MFR — Multifamily</p>
                  <p className='text-xs text-[#64748B]'>
                    Multifamily allowed. No unit cap. No parking required.
                  </p>
                </div>
              </div>

              <div className='flex gap-3'>
                <div
                  className='w-5 h-5 rounded mt-0.5 shrink-0 border border-white/50'
                  style={{ backgroundColor: '#94A3B8' }}
                />
                <div>
                  <p className='text-sm font-medium text-[#0F172A]'>Gray — Not affected</p>
                  <p className='text-xs text-[#64748B]'>
                    Commercial, institutional, open space, or other non-residential zoning.
                  </p>
                </div>
              </div>
            </div>

            <p className='text-xs text-[#94A3B8] italic pt-1 border-t border-[#E2E8F0]'>
              These are changes to what&apos;s <em>permitted</em> — no one is required to change
              their property.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
