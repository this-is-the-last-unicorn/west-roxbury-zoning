import { Router } from 'express'
import { notifySlack } from '../lib/slack.js'

export const privacyRouter = Router()

privacyRouter.post('/', async (req, res) => {
  try {
    const { email, description } = req.body

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required for privacy requests' })
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Please describe your request' })
    }

    await notifySlack({
      text: `🔒 *[Privacy Request]*\n\n*From:* ${email.trim()}\n*Request:* ${description.trim()}`,
    })

    return res.status(201).json({ status: 'received' })
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to submit privacy request' })
  }
})
