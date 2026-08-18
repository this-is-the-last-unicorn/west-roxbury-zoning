import { Router } from 'express'
import { prisma } from '@app/database'

export const blockRouter = Router()

blockRouter.get('/:blockId', async (req, res) => {
  try {
    const block = await prisma.blockStat.findUnique({
      where: { blockId: req.params.blockId },
    })

    if (!block) {
      return res.status(404).json({ error: 'Block not found' })
    }

    const gisIds = (block.propertyList as string[]) || []

    const parcels = await prisma.parcel.findMany({
      where: { gisId: { in: gisIds } },
      include: { results: { select: { summary: true } } },
      orderBy: { stNum: 'asc' },
    })

    const properties = parcels.map(p => ({
      gisId: p.gisId,
      address: p.address,
      currentDistrict: p.currentDistrict,
      proposedDistrict: p.proposedDistrict,
      lotSizeSf: p.lotSizeSf,
      changes: p.results?.summary || [],
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
      ...block,
      properties,
      impact: {
        totalParcels: properties.length,
        totalPotentialNewUnits: totalUnitIncrease,
        parkingEliminatedCount: parkingEliminated,
      },
    })
  } catch (err) {
    void err
    return res.status(500).json({ error: 'Failed to fetch block' })
  }
})
