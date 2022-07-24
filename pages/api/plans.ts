import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlanGroups, PlanGroup } from '../../features/plans'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlanGroup[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(getPlanGroups())
  } else {
    res.status(404).send('' as any)
  }
}
