import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
    case 'GET':
        const entries = await prisma.entry.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
            })
        
        res.status(200).json(entries)
        break
    default:
        res.status(405).end(`Method ${method} Not Allowed`)
    }
    }

