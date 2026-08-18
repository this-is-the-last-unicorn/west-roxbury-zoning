import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'fs'
import { join } from 'path'

const API = process.env.API_URL || 'http://localhost:3001'

async function get(path: string) {
  const res = await fetch(`${API}${path}`)
  return { status: res.status, data: await res.json() }
}

// ---------------------------------------------------------------------------
// GeoJSON integrity
// ---------------------------------------------------------------------------
describe('GeoJSON parcels.geojson', () => {
  const geojsonPath = join(__dirname, '..', 'apps', 'web', 'public', 'parcels.geojson')
  let geojson: any

  it('file exists and parses', () => {
    const raw = readFileSync(geojsonPath, 'utf-8')
    geojson = JSON.parse(raw)
    expect(geojson.type).toBe('FeatureCollection')
  })

  it('has >9000 features', () => {
    expect(geojson.features.length).toBeGreaterThan(9000)
  })

  it('features have required properties', () => {
    const required = ['id', 'addr', 'cur', 'curDesc', 'propDesc']
    for (const feat of geojson.features.slice(0, 50)) {
      for (const key of required) {
        expect(feat.properties).toHaveProperty(key)
      }
      expect(feat.geometry).toBeDefined()
      expect(['Polygon', 'MultiPolygon']).toContain(feat.geometry.type)
    }
  })

  it('no features have RD-1 as proposed district', () => {
    const rd1 = geojson.features.filter((f: any) => f.properties.prop === 'RD-1')
    expect(rd1.length).toBe(0)
  })

  it('proposed districts are only valid values', () => {
    const valid = new Set(['RD-2', 'RD-3', 'RD-4', 'RG-15', 'RG-50', 'MFR', null])
    const propValues = new Set(geojson.features.map((f: any) => f.properties.prop))
    for (const v of propValues) {
      expect(valid.has(v)).toBe(true)
    }
  })

  it('feature count matches DB parcel count', async () => {
    const { data } = await get('/api/overview')
    expect(geojson.features.length).toBe(data.parcelCount)
  })
})

// ---------------------------------------------------------------------------
// DB data consistency
// ---------------------------------------------------------------------------
describe('Database consistency', () => {
  it('overview district counts sum to total parcels', async () => {
    const { data } = await get('/api/overview')
    const sum = data.districts.reduce((s: number, d: any) => s + d.count, 0)
    expect(sum).toBe(data.parcelCount)
  })

  it('RD-3 is the most common proposed district', async () => {
    const { data } = await get('/api/overview')
    const sorted = [...data.districts]
      .filter((d: any) => d.district !== null)
      .sort((a: any, b: any) => b.count - a.count)
    expect(sorted[0].district).toBe('RD-3')
  })

  it('total parcels is between 9000 and 11000', async () => {
    const { data } = await get('/api/overview')
    expect(data.parcelCount).toBeGreaterThan(9000)
    expect(data.parcelCount).toBeLessThan(11000)
  })
})

// ---------------------------------------------------------------------------
// Property data shape consistency
// ---------------------------------------------------------------------------
describe('Property data shape', () => {
  const SPOT_CHECKS = [
    {
      gisId: '2002226000',
      address: 'BELLEVUE',
      currentDistrict: '1F-6000',
      proposedDistrict: 'RD-3',
    },
  ]

  for (const check of SPOT_CHECKS) {
    it(`${check.gisId} has correct district mapping`, async () => {
      const { data } = await get(`/api/property/${check.gisId}`)
      expect(data.address.toUpperCase()).toContain(check.address)
      expect(data.currentDistrict).toBe(check.currentDistrict)
      expect(data.proposedDistrict).toBe(check.proposedDistrict)
    })
  }

  it('property has pipeline_version', async () => {
    const { data } = await get('/api/property/2002226000')
    expect(data.results.pipelineVersion).toBeDefined()
  })

  it('property comparison uses correct display format', async () => {
    const { data } = await get('/api/property/2002226000')
    const height = data.results.comparison.find((r: any) => r.metric === 'Height')
    expect(height.currentLaw).toMatch(/\d+ft/)
    expect(height.proposedLaw).toMatch(/\d+ft/)

    const parking = data.results.comparison.find((r: any) => r.metric === 'Off-Street Parking')
    expect(parking.currentLaw).toMatch(/\d+spaces/)

    const coverage = data.results.comparison.find((r: any) => r.metric === 'Lot Coverage')
    expect(coverage.currentLaw).toMatch(/\d+%/)
  })
})

// ---------------------------------------------------------------------------
// Street aggregate consistency
// ---------------------------------------------------------------------------
describe('Street aggregate data', () => {
  it('bellevue-st has 82 properties', async () => {
    const { data } = await get('/api/street/bellevue-st')
    expect(data.properties.length).toBe(82)
  })

  it('all properties on a street have addresses', async () => {
    const { data } = await get('/api/street/bellevue-st')
    for (const p of data.properties) {
      expect(p.address).toBeTruthy()
      expect(p.gisId).toBeTruthy()
    }
  })

  it('unit increase count is reasonable', async () => {
    const { data } = await get('/api/street/bellevue-st')
    expect(data.impact.totalPotentialNewUnits).toBeGreaterThan(50)
    expect(data.impact.totalPotentialNewUnits).toBeLessThan(500)
  })
})

// ---------------------------------------------------------------------------
// Meetings data accuracy
// ---------------------------------------------------------------------------
describe('Meetings data accuracy', () => {
  it('has at least 25 meetings', async () => {
    const { data } = await get('/api/meetings')
    expect(data.length).toBeGreaterThanOrEqual(25)
  })

  it('has both upcoming and past meetings', async () => {
    const { data } = await get('/api/meetings')
    const upcoming = data.filter((m: any) => !m.isPast)
    const past = data.filter((m: any) => m.isPast)
    expect(upcoming.length).toBeGreaterThan(0)
    expect(past.length).toBeGreaterThan(0)
  })

  it('has both public meetings and office hours', async () => {
    const { data } = await get('/api/meetings')
    const types = new Set(data.map((m: any) => m.type))
    expect(types.has('public_meeting')).toBe(true)
    expect(types.has('office_hours')).toBe(true)
  })

  it('public meetings have time and location', async () => {
    const { data } = await get('/api/meetings')
    const publicMeetings = data.filter((m: any) => m.type === 'public_meeting' && !m.isPast)
    for (const m of publicMeetings) {
      expect(m.time).toBeTruthy()
      expect(m.location).toBeTruthy()
    }
  })

  it('all cityUrls contain bostonplans.org', async () => {
    const { data } = await get('/api/meetings')
    for (const m of data) {
      if (m.cityUrl) {
        expect(m.cityUrl).toContain('bostonplans.org')
      }
    }
  })

  it('all cityUrls have UTM tracking', async () => {
    const { data } = await get('/api/meetings')
    for (const m of data) {
      if (m.cityUrl) {
        expect(m.cityUrl).toContain('utm_source=westroxburyzoning')
      }
    }
  })
})

// ---------------------------------------------------------------------------
// Static files
// ---------------------------------------------------------------------------
describe('Static files', () => {
  it('robots.txt is accessible', async () => {
    const res = await fetch('http://localhost:3000/robots.txt')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('Allow: /')
  })

  it('llms.txt is accessible', async () => {
    const res = await fetch('http://localhost:3000/llms.txt')
    expect(res.status).toBe(200)
    const text = await res.text()
    expect(text).toContain('West Roxbury')
  })
})
