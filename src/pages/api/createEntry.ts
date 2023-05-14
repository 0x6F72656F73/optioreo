import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      // get the title and content from the request body
      const { title, content } = req.body
      // use prisma to create a new post using that data
      const entry = await prisma.entry.create({
        data: {
          title,
          content
        }
      })
      // send the post object back to the client
      res.status(201).json(entry)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}