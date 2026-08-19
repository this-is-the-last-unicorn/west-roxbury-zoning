import { Router } from 'express'
import { prisma } from '@app/database'
import { notifySlack } from '../lib/slack.js'

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

    await notifySlack({
      text: `📝 *[Correction]* #${correction.id}\n\n${description.trim()}${gisId ? `\n*Property:* <https://westroxburyzoning.org/property/${gisId}|${gisId}>` : ''}${contactEmail ? `\n*Contact:* ${contactEmail.trim()}` : '\n_No contact email provided_'}`,
    })

    return res.status(201).json({ id: correction.id, status: 'pending' })
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to submit correction' })
  }
})
