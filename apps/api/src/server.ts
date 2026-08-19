import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { logger, initializeSentry, captureException } from '@app/logger'
import { requestIdMiddleware } from './middleware/request-id'

initializeSentry('api')
import { healthRouter } from './routes/health'
import { propertyRouter } from './routes/property'
import { searchRouter } from './routes/search'
import { blockRouter } from './routes/block'
import { streetRouter } from './routes/street'
import { areaRouter } from './routes/area'
import { overviewRouter } from './routes/overview'
import { meetingsRouter } from './routes/meetings'
import { correctionsRouter } from './routes/corrections'
import { feedbackRouter } from './routes/feedback'
import { privacyRouter } from './routes/privacy'
import { readLimiter, writeLimiter } from './middleware/rate-limit'

const app = express()
const PORT = process.env.API_PORT || process.env.PORT || 3001

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
)
app.use(requestIdMiddleware)
app.use(express.json())

// Read routes (rate limited: 100/min per IP)
app.use('/api/health', healthRouter)
app.use('/api/property', readLimiter, propertyRouter)
app.use('/api/search', readLimiter, searchRouter)
app.use('/api/block', readLimiter, blockRouter)
app.use('/api/street', readLimiter, streetRouter)
app.use('/api/area', readLimiter, areaRouter)
app.use('/api/overview', readLimiter, overviewRouter)
app.use('/api/meetings', readLimiter, meetingsRouter)

// Write routes (tighter limits)
app.use('/api/corrections', writeLimiter, correctionsRouter)
app.use('/api/feedback', writeLimiter, feedbackRouter)
app.use('/api/privacy', writeLimiter, privacyRouter)

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  captureException(err, { method: req.method, url: req.url })
  logger.error('Unhandled error', {
    error: err.message,
    method: req.method,
    url: req.url,
  })
  res.status(500).json({ error: 'Internal server error' })
})

app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  logger.info('API server started', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    url: `http://localhost:${PORT}`,
  })
})
