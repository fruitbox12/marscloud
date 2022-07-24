import type { NextApiRequest, NextApiResponse } from 'next'
import { getImages, Image } from '../../features/image'

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<Image[]>
) {
  res.status(200).json(getImages())
}
