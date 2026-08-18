import { Router } from 'express'
import { prisma } from '@app/database'

export const streetRouter = Router()

streetRouter.get('/:slug', async (req, res) => {
  try {
    const street = await prisma.streetStat.findUnique({
      where: { slug: req.params.slug },
    })

    if (!street) {
      return res.status(404).json({ error: 'Street not found' })
    }

    const parcels = await prisma.parcel.findMany({
      where: { stName: { equals: street.streetName, mode: 'insensitive' } },
      include: { results: { select: { summary: true, comparison: true, blockId: true } } },
      orderBy: { stNum: 'asc' },
    })

    const properties = parcels.map(p => ({
      gisId: p.gisId,
      address: p.address,
      currentDistrict: p.currentDistrict,
      proposedDistrict: p.proposedDistrict,
      lotSizeSf: p.lotSizeSf,
      changes: p.results?.summary || [],
      comparison: p.results?.comparison || [],
      blockId: p.results?.blockId || null,
    }))

    type ChangeSummary = { metric: string; magnitude?: number }

    const totalUnitIncrease = properties.reduce((sum, p) => {
      const unitChange = (p.changes as ChangeSummary[]).find(c => c.metric === 'units')
      return sum + (unitChange?.magnitude || 0)
    }, 0)

    const parkingEliminated = properties.filter(p =>
      (p.changes as ChangeSummary[]).some(c => c.metric === 'parking')
    ).length

    return res.json({
      ...street,
      properties,
      impact: {
        totalParcels: properties.length,
        totalPotentialNewUnits: totalUnitIncrease,
        parkingEliminatedCount: parkingEliminated,
      },
    })
  } catch (err) {
    void err
    return res.status(500).json({ error: 'Failed to fetch street' })
  }
})
