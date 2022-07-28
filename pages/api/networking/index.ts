import type { NextApiRequest, NextApiResponse } from 'next'
import { NetworkingService } from '../../../features/networking/service'
import { Networking } from '../../../features/networking/types'

const networkingService = new NetworkingService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Networking[] | Networking>
) {
  if (req.method === 'GET') {
    res.status(200).json(networkingService.getAll())
  } else if (req.method === 'POST') {
    const errors: string[] = []
    try {
      const networking = networkingService.create({
        name: req.body.name,
      })
      res.status(200).json(networking)
    } catch (e) {
      if (typeof e === 'string') {
        errors.push(e)
      }
    }
  } else {
    res.status(404).json('' as any)
  }
}
