import type { NextApiRequest, NextApiResponse } from 'next'
import {
  VolumeService,
  VolumeNotFoundError,
} from '../../../features/volumes/service'
import { Volume } from '../../../features/volumes/types'
import { ErrorResponse } from '../../../infra/errors'

const volumeService = new VolumeService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Volume | ErrorResponse>
) {
  if (req.method === 'GET') {
    try {
      const volume = volumeService.getById(req.query.id as string)
      res.status(200).json(volume)
    } catch (e) {
      if (e instanceof VolumeNotFoundError) {
        res.status(404).send({ errors: [e.message] })
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      volumeService.delete(req.query.id as string)
      res.status(204).send('' as any)
    } catch (e) {
      if (e instanceof VolumeNotFoundError) {
        res.status(404).send({ errors: [e.message] })
      }
    }
  } else {
    res.status(404).send('' as any)
  }
}
