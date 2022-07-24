import type { NextApiRequest, NextApiResponse } from 'next'
import { ImageNotFoundError, ImageService } from '../../../features/images'
import { InstanceService } from '../../../features/instances/service'
import { Instance } from '../../../features/instances/types'
import { PlanNotFoundError, PlanService } from '../../../features/plans'
import { ErrorResponse } from '../../../infra/errors'

const instanceService = new InstanceService()
const planService = new PlanService()
const imageService = new ImageService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Instance[] | Instance | ErrorResponse>
) {
  if (req.method === 'GET') {
    res.status(200).json(instanceService.getAll())
  } else if (req.method === 'POST') {
    const errors: string[] = []
    try {
      let plan = planService.getById(req.body.plan)
      let image = imageService.getById(req.body.image)
      const instance = instanceService.create({
        name: req.body.name,
        image,
        plan,
      })
      res.status(200).json(instance)
    } catch (e) {
      if (e instanceof PlanNotFoundError) {
        errors.push(e.message)
      }
      if (e instanceof ImageNotFoundError) {
        errors.push(e.message)
      }
    }
    if (errors.length > 0) {
      res.status(400).json({ errors })
    }
  } else {
    res.status(404).send('' as any)
  }
}
