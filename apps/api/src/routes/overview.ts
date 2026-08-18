import { Router } from 'express'
import { prisma } from '@app/database'

export const overviewRouter = Router()

overviewRouter.get('/', async (_req, res) => {
  try {
    const [parcelCount, districts] = await Promise.all([
      prisma.parcel.count(),
      prisma.parcel.groupBy({
        by: ['proposedDistrict'],
        _count: true,
        orderBy: { proposedDistrict: 'asc' },
      }),
    ])

    res.json({
      parcelCount,
      districts: districts.map(d => ({
        district: d.proposedDistrict,
        count: d._count,
      })),
    })
  } catch (_err) {
    res.status(500).json({ error: 'Failed to fetch overview' })
  }
})
