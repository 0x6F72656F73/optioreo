import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

import type { Entry } from '@prisma/client'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req


    switch (method) {
        case 'PATCH':

            // get the id, title, and content from the request body
            var { id, title, content, marked } : Entry = req.body

            // use prisma to update the existing entry using that data
            const entry = await prisma.entry.update({
                where: {
                    id: Number(id)
                },
                data: {
                title,
                content,
                updatedAt: new Date().toISOString(),
                marked
                }
            })
            
            // send the updated entry object back to the client
            res.status(200).json(entry)
            break
        
        case 'DELETE':

            // get the id from the link in format /api/entry/[id]
            const entry_id = req.query.id

            
            // use prisma to delete the existing entry using that data. discard the result
                await prisma.entry.delete({
                    where: {
                        id: Number(entry_id)
                    }
                })

                // send success back to the client
                res.status(200).json({ success: true })

            break
                
            default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
