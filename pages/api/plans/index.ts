import type { NextApiRequest, NextApiResponse } from 'next'
import { PlanService, Plan } from '../../../features/plans'

const planService = new PlanService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plan[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(planService.getAll())
  } else {
    res.status(404).send('' as any)
  }
}
