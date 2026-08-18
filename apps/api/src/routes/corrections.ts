import { Router } from 'express'
import { prisma } from '@app/database'

export const correctionsRouter = Router()

correctionsRouter.post('/', async (req, res) => {
  try {
    const { gisId, description, contactEmail } = req.body

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ error: 'Description is required' })
    }

    const correction = await prisma.correction.create({
      data: {
        gisId: gisId || null,
        description: description.trim(),
        contactEmail: contactEmail?.trim() || null,
      },
    })

    // TODO: Send email/Slack notification to Emily

    return res.status(201).json({ id: correction.id, status: 'pending' })
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to submit correction' })
  }
})
