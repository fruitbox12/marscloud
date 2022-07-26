import type { NextApiRequest, NextApiResponse } from 'next'
import { VolumeService } from '../../../features/volumes/service'
import { Volume } from '../../../features/volumes/types'
import { ErrorResponse } from '../../../infra/errors'

const volumeService = new VolumeService()
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Volume[] | Volume>
) {
  if (req.method === 'GET') {
    res.status(200).json(volumeService.getAll())
  } else if (req.method === 'POST') {
    const errors: string[] = []
    try {
      const volume = volumeService.create({
        name: req.body.name,
        size: req.body.size,
      })
      res.status(200).json(volume)
    } catch (e) {
      if (typeof e === 'string') {
        errors.push(e)
      }
    }
  } else {
    res.status(404).json('' as any)
  }
}
