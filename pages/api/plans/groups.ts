import type { NextApiRequest, NextApiResponse } from 'next'
import { PlanService, PlanGroup } from '../../../features/plans'

const planService = new PlanService()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlanGroup[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(planService.getGroups())
  } else {
    res.status(404).send('' as any)
  }
}
