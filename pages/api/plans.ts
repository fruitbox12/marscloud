import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlanGroups, PlanGroup } from '../../features/plans'

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<PlanGroup[]>
) {
  res.status(200).json(getPlanGroups())
}
