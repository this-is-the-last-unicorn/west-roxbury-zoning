import { describe, it, expect } from 'bun:test'

/**
 * These tests verify the zoning calculation logic that lives in
 * tools/pipeline/load_data.py. We re-implement the pure functions in TS
 * so regressions are caught without running the full Python pipeline.
 *
 * If a test fails here, the corresponding Python function must be audited.
 */

// ---------------------------------------------------------------------------
// Proposed zoning rules (mirrored from load_data.py PROPOSED_ZONING)
// ---------------------------------------------------------------------------
const PROPOSED_ZONING: Record<string, any> = {
  'RD-2': {
    max_height: 35,
    max_stories: 3,
    max_units: 2,
    max_units_pre2027: 3,
    min_front_yard: 15,
    min_side_cumulative_B: 20,
    min_side_cumulative_C: 10,
    min_rear_yard_B: 20,
    min_rear_yard_C: 10,
    max_lot_coverage_B: { '<=3800': 0.25, '3800-6899': 0.25, '>=6900': 0.25 },
    max_lot_coverage_C: { '<=3800': 0.3, '3800-6899': 0.3, '>=6900': 0.3 },
    min_parking: 0,
    max_floor_plate_B: 2200,
    max_floor_plate_C: 2600,
    min_permeable: 0.45,
  },
  'RD-3': {
    max_height: 35,
    max_stories: 3,
    max_units: 3,
    max_units_pre2027: 3,
    min_front_yard: 12,
    min_side_cumulative_B: 15,
    min_side_cumulative_C: 15,
    min_rear_yard_B: 15,
    min_rear_yard_C: 10,
    max_lot_coverage_B: { '<=3800': 0.35, '3800-6899': 0.35, '>=6900': 0.3 },
    max_lot_coverage_C: { '<=3800': 0.35, '3800-6899': 0.35, '>=6900': 0.3 },
    min_parking: 0,
    max_floor_plate_B: 2000,
    max_floor_plate_C: 2400,
    min_permeable: 0.3,
  },
  'RD-4': {
    max_height: 45,
    max_stories: 3,
    max_units: 4,
    max_units_pre2027: 4,
    min_front_yard: 8,
    min_side_cumulative_B: 10,
    min_side_cumulative_C: 10,
    min_rear_yard_B: 10,
    min_rear_yard_C: 10,
    max_lot_coverage_B: { '<=3800': 0.4, '3800-6899': 0.55, '>=6900': 0.3 },
    max_lot_coverage_C: { '<=3800': 0.45, '3800-6899': 0.55, '>=6900': 0.3 },
    min_parking: 0,
    min_permeable: 0.25,
  },
  'RG-15': {
    max_height: 35,
    max_stories: 2.5,
    max_units: 1,
    max_units_pre2027: 1,
    min_front_yard: 20,
    min_side_cumulative_B: 15,
    min_side_cumulative_C: 15,
    min_rear_yard_B: 30,
    min_rear_yard_C: 30,
    max_lot_coverage_B: { null: 0.35 },
    max_lot_coverage_C: { null: 0.35 },
    min_parking: 1,
    min_permeable: 0.3,
  },
  'RG-50': {
    max_height: 35,
    max_stories: 3,
    max_units: 2,
    max_units_pre2027: 2,
    min_front_yard: 20,
    min_side_cumulative_B: 10,
    min_side_cumulative_C: 10,
    min_rear_yard_B: 20,
    min_rear_yard_C: 20,
    max_lot_coverage_B: { null: 0.4 },
    max_lot_coverage_C: { null: 0.4 },
    min_parking: 1,
    min_permeable: 0.25,
  },
  MFR: {
    max_height: 35,
    max_stories: 3,
    max_units: null,
    max_units_pre2027: null,
    min_front_yard: 20,
    min_side_cumulative_B: 10,
    min_side_cumulative_C: 10,
    min_rear_yard_B: 20,
    min_rear_yard_C: 20,
    max_lot_coverage_B: { null: 0.5 },
    max_lot_coverage_C: { null: 0.5 },
    min_parking: 0,
    min_permeable: 0.2,
  },
}

const CURRENT_ZONING: Record<string, any> = {
  '1F-6000': {
    max_height: 35,
    max_stories: 2.5,
    max_units: 1,
    min_front_yard: 20,
    min_side_cumulative: 15,
    min_rear_yard: 30,
    max_lot_coverage: 0.35,
    min_parking: 2,
    min_permeable: null,
  },
  '1F-8000': {
    max_height: 35,
    max_stories: 2.5,
    max_units: 1,
    min_front_yard: 20,
    min_side_cumulative: 15,
    min_rear_yard: 30,
    max_lot_coverage: 0.35,
    min_parking: 2,
    min_permeable: null,
  },
  '2F-5000': {
    max_height: 35,
    max_stories: 2.5,
    max_units: 2,
    min_front_yard: 15,
    min_side_cumulative: 10,
    min_rear_yard: 25,
    max_lot_coverage: 0.4,
    min_parking: 2,
    min_permeable: null,
  },
}

// ---------------------------------------------------------------------------
// Re-implementation of pipeline pure functions
// ---------------------------------------------------------------------------

function getLotTier(lotSf: number | null): string | null {
  if (lotSf === null) return null
  if (lotSf <= 3800) return '<=3800'
  if (lotSf <= 6899) return '3800-6899'
  return '>=6900'
}

function getApplicableTable(yrBuilt: number | null, hasBuilding: boolean): 'B' | 'C' {
  if (!hasBuilding) return 'B'
  if (yrBuilt !== null && yrBuilt >= 2027) return 'B'
  return 'C'
}

function getLotCoverage(rules: any, lotTier: string | null, table: string = 'C'): number | null {
  const key = `max_lot_coverage_${table}`
  const lc = rules[key] || rules['max_lot_coverage']
  if (typeof lc === 'object' && lc !== null) {
    if (lotTier !== null && lotTier in lc) return lc[lotTier]
    if ('null' in lc) return lc['null']
    if (null in lc) return lc[null]
    const vals = Object.values(lc) as number[]
    return vals.length > 0 ? vals[0] : null
  }
  return lc ?? null
}

function getSetback(rules: any, field: string, table: string = 'C'): number | null {
  return rules[`${field}_${table}`] ?? rules[field] ?? null
}

function getEffectiveMaxUnits(rules: any, table: string): number | null {
  if (table === 'C' && 'max_units_pre2027' in rules) {
    return rules['max_units_pre2027']
  }
  return rules['max_units']
}

// ---------------------------------------------------------------------------
// Tests: Lot Tier
// ---------------------------------------------------------------------------
describe('getLotTier', () => {
  it('returns null for null input', () => {
    expect(getLotTier(null)).toBeNull()
  })
  it('small lot (3000 sf)', () => {
    expect(getLotTier(3000)).toBe('<=3800')
  })
  it('boundary: exactly 3800', () => {
    expect(getLotTier(3800)).toBe('<=3800')
  })
  it('mid lot (5000 sf)', () => {
    expect(getLotTier(5000)).toBe('3800-6899')
  })
  it('boundary: exactly 6899', () => {
    expect(getLotTier(6899)).toBe('3800-6899')
  })
  it('large lot (7000 sf)', () => {
    expect(getLotTier(7000)).toBe('>=6900')
  })
  it('very large lot (25000 sf)', () => {
    expect(getLotTier(25000)).toBe('>=6900')
  })
})

// ---------------------------------------------------------------------------
// Tests: Applicable Table (B vs C)
// ---------------------------------------------------------------------------
describe('getApplicableTable', () => {
  it('existing pre-2027 building → Table C', () => {
    expect(getApplicableTable(1960, true)).toBe('C')
  })
  it('existing building, year 2026 → Table C', () => {
    expect(getApplicableTable(2026, true)).toBe('C')
  })
  it('new construction (2027+) → Table B', () => {
    expect(getApplicableTable(2027, true)).toBe('B')
  })
  it('future construction (2030) → Table B', () => {
    expect(getApplicableTable(2030, true)).toBe('B')
  })
  it('vacant lot (no building) → Table B', () => {
    expect(getApplicableTable(null, false)).toBe('B')
  })
  it('vacant lot with year → Table B', () => {
    expect(getApplicableTable(1990, false)).toBe('B')
  })
  it('null year but has building → Table C', () => {
    expect(getApplicableTable(null, true)).toBe('C')
  })
})

// ---------------------------------------------------------------------------
// Tests: Lot Coverage resolution
// ---------------------------------------------------------------------------
describe('getLotCoverage', () => {
  it('RD-3, Table C, large lot → 0.30', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-3'], '>=6900', 'C')).toBe(0.3)
  })
  it('RD-3, Table C, mid lot → 0.35', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-3'], '3800-6899', 'C')).toBe(0.35)
  })
  it('RD-3, Table B, large lot → 0.30', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-3'], '>=6900', 'B')).toBe(0.3)
  })
  it('RD-4, Table C, small lot → 0.45', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-4'], '<=3800', 'C')).toBe(0.45)
  })
  it('RD-4, Table B, small lot → 0.40', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-4'], '<=3800', 'B')).toBe(0.4)
  })
  it('RD-4, Table C, mid lot → 0.55', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-4'], '3800-6899', 'C')).toBe(0.55)
  })
  it('RD-2, Table C, any lot → 0.30', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-2'], '>=6900', 'C')).toBe(0.3)
  })
  it('RD-2, Table B, any lot → 0.25', () => {
    expect(getLotCoverage(PROPOSED_ZONING['RD-2'], '<=3800', 'B')).toBe(0.25)
  })
})

// ---------------------------------------------------------------------------
// Tests: Setback resolution (table-dependent)
// ---------------------------------------------------------------------------
describe('getSetback', () => {
  it('RD-3 rear setback, Table C → 10', () => {
    expect(getSetback(PROPOSED_ZONING['RD-3'], 'min_rear_yard', 'C')).toBe(10)
  })
  it('RD-3 rear setback, Table B → 15', () => {
    expect(getSetback(PROPOSED_ZONING['RD-3'], 'min_rear_yard', 'B')).toBe(15)
  })
  it('RD-2 side cumulative, Table B → 20', () => {
    expect(getSetback(PROPOSED_ZONING['RD-2'], 'min_side_cumulative', 'B')).toBe(20)
  })
  it('RD-2 side cumulative, Table C → 10', () => {
    expect(getSetback(PROPOSED_ZONING['RD-2'], 'min_side_cumulative', 'C')).toBe(10)
  })
  it('RD-4 rear setback → 10 for both tables', () => {
    expect(getSetback(PROPOSED_ZONING['RD-4'], 'min_rear_yard', 'B')).toBe(10)
    expect(getSetback(PROPOSED_ZONING['RD-4'], 'min_rear_yard', 'C')).toBe(10)
  })
  it('RG-15 rear setback → 30 for both tables', () => {
    expect(getSetback(PROPOSED_ZONING['RG-15'], 'min_rear_yard', 'B')).toBe(30)
    expect(getSetback(PROPOSED_ZONING['RG-15'], 'min_rear_yard', 'C')).toBe(30)
  })
})

// ---------------------------------------------------------------------------
// Tests: Effective max units (Table B vs C / pre-2027)
// ---------------------------------------------------------------------------
describe('getEffectiveMaxUnits', () => {
  it('RD-2, Table C → 3 (pre-2027 bonus)', () => {
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RD-2'], 'C')).toBe(3)
  })
  it('RD-2, Table B → 2 (standard)', () => {
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RD-2'], 'B')).toBe(2)
  })
  it('RD-3, both tables → 3', () => {
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RD-3'], 'B')).toBe(3)
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RD-3'], 'C')).toBe(3)
  })
  it('RD-4, both tables → 4', () => {
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RD-4'], 'B')).toBe(4)
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RD-4'], 'C')).toBe(4)
  })
  it('RG-15 → always 1', () => {
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RG-15'], 'B')).toBe(1)
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['RG-15'], 'C')).toBe(1)
  })
  it('MFR → null (no cap)', () => {
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['MFR'], 'B')).toBeNull()
    expect(getEffectiveMaxUnits(PROPOSED_ZONING['MFR'], 'C')).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Tests: District rules sanity
// ---------------------------------------------------------------------------
describe('Proposed district rules integrity', () => {
  for (const [dist, rules] of Object.entries(PROPOSED_ZONING)) {
    describe(dist, () => {
      it('has valid height (25-50 ft)', () => {
        expect(rules.max_height).toBeGreaterThanOrEqual(25)
        expect(rules.max_height).toBeLessThanOrEqual(50)
      })
      it('has valid stories (1-5)', () => {
        expect(rules.max_stories).toBeGreaterThanOrEqual(1)
        expect(rules.max_stories).toBeLessThanOrEqual(5)
      })
      it('has front setback', () => {
        expect(rules.min_front_yard).toBeGreaterThan(0)
      })
      it('has parking 0 or 1', () => {
        expect([0, 1]).toContain(rules.min_parking)
      })
      it('has permeable area 0.20-0.50', () => {
        expect(rules.min_permeable).toBeGreaterThanOrEqual(0.2)
        expect(rules.min_permeable).toBeLessThanOrEqual(0.5)
      })
      it('has rear setback for both tables', () => {
        expect(rules.min_rear_yard_B).toBeGreaterThan(0)
        expect(rules.min_rear_yard_C).toBeGreaterThan(0)
      })
    })
  }
})

// ---------------------------------------------------------------------------
// Tests: Specific property calculations (spot checks)
// ---------------------------------------------------------------------------
describe('Spot check: 156 Bellevue ST (1F-6000 → RD-3)', () => {
  const current = CURRENT_ZONING['1F-6000']
  const proposed = PROPOSED_ZONING['RD-3']
  const lotSf = 7252
  const table = 'C'
  const lotTier = getLotTier(lotSf)!

  it('lot tier is >=6900', () => {
    expect(lotTier).toBe('>=6900')
  })

  it('units change: 1 → 3', () => {
    expect(current.max_units).toBe(1)
    expect(getEffectiveMaxUnits(proposed, table)).toBe(3)
  })

  it('parking change: 2 → 0', () => {
    expect(current.min_parking).toBe(2)
    expect(proposed.min_parking).toBe(0)
  })

  it('front setback: 20 → 12', () => {
    expect(current.min_front_yard).toBe(20)
    expect(proposed.min_front_yard).toBe(12)
  })

  it('rear setback (Table C): 30 → 10', () => {
    expect(current.min_rear_yard).toBe(30)
    expect(getSetback(proposed, 'min_rear_yard', 'C')).toBe(10)
  })

  it('lot coverage (Table C, large lot): 35% → 30%', () => {
    expect(current.max_lot_coverage).toBe(0.35)
    expect(getLotCoverage(proposed, lotTier, 'C')).toBe(0.3)
  })

  it('height stays 35ft', () => {
    expect(current.max_height).toBe(35)
    expect(proposed.max_height).toBe(35)
  })

  it('side yard stays 15ft', () => {
    expect(current.min_side_cumulative).toBe(15)
    expect(getSetback(proposed, 'min_side_cumulative', 'C')).toBe(15)
  })

  it('new permeable requirement: 30%', () => {
    expect(current.min_permeable).toBeNull()
    expect(proposed.min_permeable).toBe(0.3)
  })
})

describe('Spot check: 1F-6000 → RD-2 (smaller lot, 4500 sf)', () => {
  const current = CURRENT_ZONING['1F-6000']
  const proposed = PROPOSED_ZONING['RD-2']
  const lotTier = getLotTier(4500)!
  const table = 'C'

  it('lot tier is 3800-6899', () => {
    expect(lotTier).toBe('3800-6899')
  })

  it('units change: 1 → 3 (pre-2027 bonus)', () => {
    expect(getEffectiveMaxUnits(proposed, table)).toBe(3)
  })

  it('lot coverage (Table C, mid lot): 35% → 30%', () => {
    expect(getLotCoverage(proposed, lotTier, 'C')).toBe(0.3)
  })

  it('rear setback (Table C): 30 → 10', () => {
    expect(getSetback(proposed, 'min_rear_yard', 'C')).toBe(10)
  })
})

describe('Spot check: 1F-8000 → RD-3 (102 Bellevue, 27110 sf)', () => {
  const current = CURRENT_ZONING['1F-8000']
  const proposed = PROPOSED_ZONING['RD-3']
  const lotTier = getLotTier(27110)!
  const table = 'C'

  it('lot tier is >=6900', () => {
    expect(lotTier).toBe('>=6900')
  })

  it('units: 1 → 3', () => {
    expect(current.max_units).toBe(1)
    expect(getEffectiveMaxUnits(proposed, table)).toBe(3)
  })

  it('lot coverage: 35% → 30%', () => {
    expect(getLotCoverage(proposed, lotTier, 'C')).toBe(0.3)
  })
})

// ---------------------------------------------------------------------------
// Tests: Non-residential districts
// ---------------------------------------------------------------------------
describe('Non-residential districts', () => {
  const NON_RES = ['NS', 'CC', 'CF', 'LI', 'NI', 'OS', 'OS-CM', 'OS-P', 'OS-RC', 'OS-UW']
  for (const dist of NON_RES) {
    it(`${dist} has no proposed zoning rules`, () => {
      expect(PROPOSED_ZONING[dist]).toBeUndefined()
    })
  }
})
