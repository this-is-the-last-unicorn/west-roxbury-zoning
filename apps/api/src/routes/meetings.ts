import { Router } from 'express'
import { prisma } from '@app/database'

export const meetingsRouter = Router()

meetingsRouter.get('/', async (_req, res) => {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: { date: 'desc' },
      select: {
        id: true,
        date: true,
        title: true,
        time: true,
        location: true,
        type: true,
        cityUrl: true,
        recordingUrl: true,
        materialsUrl: true,
        isPast: true,
      },
    })

    res.json(meetings)
  } catch (_err) {
    res.status(500).json({ error: 'Failed to fetch meetings' })
  }
})
