import { Router } from 'express'

export const healthRouter = Router()

// Health check endpoint
healthRouter.get('/', (req, res) => {
  res.json({
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    },
    success: true,
    meta: {
      timestamp: new Date().toISOString(),
    },
  })
})
