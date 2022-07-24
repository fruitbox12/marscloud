import type { NextApiRequest, NextApiResponse } from 'next'
import { getImages, Image } from '../../features/images'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Image[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(getImages())
  } else {
    res.status(404).send('' as any)
  }
}
