import { Router } from 'express'
import { prisma } from '@app/database'
import { notifySlack } from '../lib/slack.js'

export const feedbackRouter = Router()

feedbackRouter.post('/', async (req, res) => {
  try {
    const { gisId, reactions, freeText, sessionId } = req.body

    if (!reactions && !freeText) {
      return res.status(400).json({ error: 'Reactions or free text required' })
    }

    const feedback = await prisma.feedback.create({
      data: {
        gisId: gisId || null,
        reactions: reactions || null,
        freeText: freeText?.trim() || null,
        sessionId: sessionId || null,
      },
    })

    if (freeText) {
      await notifySlack({
        text: `💬 *[Feedback]* #${feedback.id}\n\n${freeText.trim()}${gisId ? `\n*Property:* <https://westroxburyzoning.org/property/${gisId}|${gisId}>` : ''}${reactions ? `\n*Reactions:* ${reactions}` : ''}`,
      })
    }

    return res.status(201).json({ id: feedback.id })
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to submit feedback' })
  }
})
