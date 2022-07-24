import type { NextApiRequest, NextApiResponse } from 'next'
import {
  InstanceNotFoundError,
  InstanceService,
} from '../../../features/instances/service'
import { Instance } from '../../../features/instances/types'
import { ErrorResponse } from '../../../infra/errors'

const instanceService = new InstanceService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Instance | ErrorResponse>
) {
  if (req.method === 'GET') {
    try {
      const instance = instanceService.getById(req.query.id as string)
      res.status(200).json(instance)
    } catch (e) {
      if (e instanceof InstanceNotFoundError) {
        res.status(404).send({ errors: [e.message] })
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      instanceService.delete(req.query.id as string)
      res.status(204).send('' as any)
    } catch (e) {
      if (e instanceof InstanceNotFoundError) {
        res.status(404).send({ errors: [e.message] })
      }
    }
  } else {
    res.status(404).send('' as any)
  }
}
