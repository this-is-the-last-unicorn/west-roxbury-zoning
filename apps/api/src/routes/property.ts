import { Router } from 'express'
import { prisma } from '@app/database'

export const propertyRouter = Router()

propertyRouter.get('/:gisId', async (req, res) => {
  try {
    const { gisId } = req.params

    const parcel = await prisma.parcel.findUnique({
      where: { gisId },
      include: { results: true },
    })

    if (!parcel) {
      return res.status(404).json({ error: 'Property not found' })
    }

    return res.json(parcel)
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to fetch property' })
  }
})
