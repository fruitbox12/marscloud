import type { NextApiRequest, NextApiResponse } from 'next'
import { ImageService, ImageGroup } from '../../../features/images'

const imageService = new ImageService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageGroup[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(imageService.getGroups())
  } else {
    res.status(404).send('' as any)
  }
}
