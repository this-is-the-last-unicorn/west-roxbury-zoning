import { describe, it, expect, beforeAll } from 'bun:test'

const API = process.env.API_URL || 'http://localhost:3001'

async function get(path: string) {
  const res = await fetch(`${API}${path}`)
  return { status: res.status, data: await res.json() }
}

async function post(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { status: res.status, data: await res.json() }
}

// ------------------------------------------------------------------
// Health
// ------------------------------------------------------------------
describe('GET /api/health', () => {
  it('returns healthy status', async () => {
    const { status, data } = await get('/api/health')
    expect(status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.status).toBe('healthy')
    expect(data.data.version).toBe('1.0.0')
  })
})

// ------------------------------------------------------------------
// Property
// ------------------------------------------------------------------
describe('GET /api/property/:gisId', () => {
  it('returns property for 156 Bellevue (2002226000)', async () => {
    const { status, data } = await get('/api/property/2002226000')
    expect(status).toBe(200)
    expect(data.gisId).toBe('2002226000')
    expect(data.address.toUpperCase()).toContain('BELLEVUE')
    expect(data.currentDistrict).toBe('1F-6000')
    expect(data.proposedDistrict).toBe('RD-3')
    expect(data.lotSizeSf).toBeGreaterThan(0)
    expect(data.results).toBeDefined()
    expect(data.results.summary).toBeInstanceOf(Array)
    expect(data.results.comparison).toBeInstanceOf(Array)
  })

  it('returns 404 for nonexistent property', async () => {
    const { status } = await get('/api/property/0000000000')
    expect(status).toBe(404)
  })

  it('comparison has all required metrics', async () => {
    const { data } = await get('/api/property/2002226000')
    const metrics = data.results.comparison.map((r: any) => r.metric)
    const required = [
      'Height',
      'Stories',
      'Dwelling Units',
      'Front Setback',
      'Rear Setback',
      'Lot Coverage',
      'Off-Street Parking',
      'Permeable Area',
    ]
    // Side yard metric was renamed; accept either old or new name
    const hasSideYard =
      metrics.includes('Side Yards (combined)') || metrics.includes('Side Yard (cumul.)')
    expect(hasSideYard).toBe(true)
    for (const m of required) {
      expect(metrics).toContain(m)
    }
  })

  it('comparison rows have correct structure', async () => {
    const { data } = await get('/api/property/2002226000')
    for (const row of data.results.comparison) {
      expect(row).toHaveProperty('metric')
      expect(row).toHaveProperty('currentLaw')
      expect(row).toHaveProperty('proposedLaw')
      expect(row).toHaveProperty('change')
      expect([null, 'increase', 'decrease']).toContain(row.change)
    }
  })
})

// ------------------------------------------------------------------
// Search
// ------------------------------------------------------------------
describe('GET /api/search', () => {
  it('returns results for "bellevue"', async () => {
    const { status, data } = await get('/api/search?q=bellevue')
    expect(status).toBe(200)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('gisId')
    expect(data[0]).toHaveProperty('address')
  })

  it('returns results for partial address "156"', async () => {
    const { data } = await get('/api/search?q=156')
    expect(data.length).toBeGreaterThan(0)
  })

  it('returns empty array for very short query', async () => {
    const { data } = await get('/api/search?q=a')
    expect(data).toEqual([])
  })

  it('limits to 10 results', async () => {
    const { data } = await get('/api/search?q=st')
    expect(data.length).toBeLessThanOrEqual(10)
  })
})

// ------------------------------------------------------------------
// Street
// ------------------------------------------------------------------
describe('GET /api/street/:slug', () => {
  it('returns bellevue-st with properties', async () => {
    const { status, data } = await get('/api/street/bellevue-st')
    expect(status).toBe(200)
    expect(data.streetName).toBe('BELLEVUE ST')
    expect(data.slug).toBe('bellevue-st')
    expect(data.properties).toBeInstanceOf(Array)
    expect(data.properties.length).toBeGreaterThan(20)
  })

  it('each property has required fields', async () => {
    const { data } = await get('/api/street/bellevue-st')
    for (const p of data.properties.slice(0, 5)) {
      expect(p).toHaveProperty('gisId')
      expect(p).toHaveProperty('address')
      expect(p).toHaveProperty('currentDistrict')
      expect(p).toHaveProperty('changes')
      expect(p).toHaveProperty('comparison')
    }
  })

  it('includes impact aggregation', async () => {
    const { data } = await get('/api/street/bellevue-st')
    expect(data.impact).toBeDefined()
    expect(data.impact.totalParcels).toBeGreaterThan(0)
    expect(typeof data.impact.totalPotentialNewUnits).toBe('number')
    expect(typeof data.impact.parkingEliminatedCount).toBe('number')
  })

  it('returns 404 for nonexistent street', async () => {
    const { status } = await get('/api/street/fake-street-99')
    expect(status).toBe(404)
  })
})

// ------------------------------------------------------------------
// Block
// ------------------------------------------------------------------
describe('GET /api/block/:blockId', () => {
  let validBlockId: string

  beforeAll(async () => {
    const { data } = await get('/api/street/bellevue-st')
    const propWithBlock = data.properties.find((p: any) => p.blockId)
    validBlockId = propWithBlock?.blockId || 'bellevue-st'
  })

  it('returns block data with properties', async () => {
    const { status, data } = await get(`/api/block/${validBlockId}`)
    expect(status).toBe(200)
    expect(data.blockId).toBe(validBlockId)
    expect(data.properties).toBeInstanceOf(Array)
    expect(data.properties.length).toBeGreaterThan(0)
  })

  it('returns 404 for nonexistent block', async () => {
    const { status } = await get('/api/block/fake-block-99')
    expect(status).toBe(404)
  })
})

// ------------------------------------------------------------------
// Area
// ------------------------------------------------------------------
describe('GET /api/area/:slug', () => {
  it('returns area data with streets', async () => {
    const { status, data } = await get('/api/area/bellevue-hill')
    expect(status).toBe(200)
    expect(data.slug).toBe('bellevue-hill')
    expect(data.streets).toBeInstanceOf(Array)
    expect(data.streets.length).toBeGreaterThan(0)
  })

  it('returns 404 for nonexistent area', async () => {
    const { status } = await get('/api/area/atlantis')
    expect(status).toBe(404)
  })
})

// ------------------------------------------------------------------
// Overview
// ------------------------------------------------------------------
describe('GET /api/overview', () => {
  it('returns parcel count and district breakdown', async () => {
    const { status, data } = await get('/api/overview')
    expect(status).toBe(200)
    expect(data.parcelCount).toBeGreaterThan(9000)
    expect(data.districts).toBeInstanceOf(Array)
    expect(data.districts.length).toBeGreaterThan(3)
  })

  it('district counts sum to total', async () => {
    const { data } = await get('/api/overview')
    const sum = data.districts.reduce((s: number, d: any) => s + d.count, 0)
    expect(sum).toBe(data.parcelCount)
  })

  it('has no RD-1 district', async () => {
    const { data } = await get('/api/overview')
    const districtNames = data.districts.map((d: any) => d.district)
    expect(districtNames).not.toContain('RD-1')
  })
})

// ------------------------------------------------------------------
// Meetings
// ------------------------------------------------------------------
describe('GET /api/meetings', () => {
  it('returns meetings array', async () => {
    const { status, data } = await get('/api/meetings')
    expect(status).toBe(200)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThanOrEqual(20)
  })

  it('meetings have required fields', async () => {
    const { data } = await get('/api/meetings')
    for (const m of data.slice(0, 5)) {
      expect(m).toHaveProperty('id')
      expect(m).toHaveProperty('date')
      expect(m).toHaveProperty('title')
      expect(m).toHaveProperty('type')
      expect(m).toHaveProperty('isPast')
      expect(m).toHaveProperty('cityUrl')
    }
  })

  it('every meeting has a cityUrl', async () => {
    const { data } = await get('/api/meetings')
    for (const m of data) {
      expect(m.cityUrl).toBeTruthy()
      expect(m.cityUrl).toContain('bostonplans.org')
    }
  })

  it('types are only public_meeting or office_hours', async () => {
    const { data } = await get('/api/meetings')
    const types = new Set(data.map((m: any) => m.type))
    for (const t of types) {
      expect(['public_meeting', 'office_hours']).toContain(t)
    }
  })
})

// ------------------------------------------------------------------
// Corrections (POST-only)
// ------------------------------------------------------------------
describe('POST /api/corrections', () => {
  it('rejects empty body', async () => {
    const { status } = await post('/api/corrections', {})
    expect(status).toBe(400)
  })

  it('rejects missing description', async () => {
    const { status } = await post('/api/corrections', { gisId: '2002226000' })
    expect(status).toBe(400)
  })

  it('accepts valid correction', async () => {
    const { status, data } = await post('/api/corrections', {
      description: 'Test correction from unit test',
      gisId: '2002226000',
    })
    expect(status).toBe(201)
    expect(data.id).toBeDefined()
    expect(data.status).toBe('pending')
  })
})

// ------------------------------------------------------------------
// Feedback (POST-only)
// ------------------------------------------------------------------
describe('POST /api/feedback', () => {
  it('rejects empty body', async () => {
    const { status } = await post('/api/feedback', {})
    expect(status).toBe(400)
  })

  it('accepts valid feedback', async () => {
    const { status, data } = await post('/api/feedback', {
      freeText: 'Test feedback from unit test',
    })
    expect(status).toBe(201)
    expect(data.id).toBeDefined()
  })
})

// ------------------------------------------------------------------
// 404 for unknown routes
// ------------------------------------------------------------------
describe('Unknown routes', () => {
  it('returns 404 JSON for unknown API path', async () => {
    const { status, data } = await get('/api/nonexistent')
    expect(status).toBe(404)
    expect(data.error).toBe('Route not found')
  })
})
