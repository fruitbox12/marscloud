import type { NextApiRequest, NextApiResponse } from 'next'
import { ImageService, Image } from '../../../features/images'

const imageService = new ImageService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Image[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(imageService.getAll())
  } else {
    res.status(404).send('' as any)
  }
}
