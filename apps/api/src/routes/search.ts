import { Router } from 'express'
import { prisma } from '@app/database'

export const searchRouter = Router()

searchRouter.get('/', async (req, res) => {
  try {
    const q = ((req.query.q as string) || '').trim()

    if (q.length < 2) {
      return res.json([])
    }

    // Use pg_trgm similarity for fuzzy matching + prefix boost.
    // Handles typos ("Centr" → "Centre"), partials ("156" → "156 Centre St"),
    // and out-of-order tokens ("centre 156" → "156 Centre St").
    // Falls back to ILIKE if pg_trgm isn't available.
    const results = await prisma.$queryRaw`
      SELECT
        "gis_id"          AS "gisId",
        "address",
        "proposed_district" AS "proposedDistrict",
        similarity("address", ${q}) AS score
      FROM "parcels"
      WHERE
        "address" % ${q}
        OR "address" ILIKE ${`%${q}%`}
      ORDER BY
        ("address" ILIKE ${`${q}%`}) DESC,
        similarity("address", ${q}) DESC,
        "address" ASC
      LIMIT 10
    `

    return res.json(results)
  } catch {
    try {
      const q = ((req.query.q as string) || '').trim()
      const results = await prisma.parcel.findMany({
        where: {
          address: { contains: q, mode: 'insensitive' },
        },
        select: {
          gisId: true,
          address: true,
          proposedDistrict: true,
        },
        take: 10,
        orderBy: { address: 'asc' },
      })
      return res.json(results)
    } catch (_err) {
      return res.status(500).json({ error: 'Search failed' })
    }
  }
})
