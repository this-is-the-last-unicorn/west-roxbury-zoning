import { Router } from 'express'
import { prisma } from '@app/database'

export const areaRouter = Router()

areaRouter.get('/:slug', async (req, res) => {
  try {
    const area = await prisma.areaStat.findUnique({
      where: { slug: req.params.slug },
    })

    if (!area) {
      return res.status(404).json({ error: 'Area not found' })
    }

    const streetStats = await prisma.streetStat.findMany({
      orderBy: { streetName: 'asc' },
    })

    const streets = streetStats.map(s => ({
      slug: s.slug,
      streetName: s.streetName,
      parcelCount: s.parcelCount,
      districts: s.districts,
    }))

    return res.json({
      ...area,
      streets,
    })
  } catch (err) {
    void err
    return res.status(500).json({ error: 'Failed to fetch area' })
  }
})
