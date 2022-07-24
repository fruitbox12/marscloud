import { Plan, PlanGroup } from '../types'
import createPlans from '../create-plans'
import { IncreaseType } from '../spec'

export function createGeneralPurposePlanGroup(): PlanGroup {
  const id = 'general-purpose'
  return {
    id,
    name: 'General Purpose',
    description:
      'High performance virtual machines with a good balance of memory ' +
      'and dedicated hyper-threads from best in class Intel processors. ' +
      'A great choice for a wide range of mainstream, production workloads, ' +
      'like web app hosting, e-commerce sites, medium-sized databases, and enterprise applications.',
    plans: createGeneralPurposePlans(id),
  }
}

export function createGeneralPurposePlans(planGroupId: string): Plan[] {
  return createPlans({
    planGroupId,
    size: 6,
    cpu: {
      base: {
        value: 2,
      },
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
    memory: {
      base: {
        value: 8,
        unit: 'GB',
      },
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
    storage: {
      base: {
        value: 25,
        unit: 'GB',
        type: 'SSD Disk',
      },
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
    transfer: {
      base: {
        value: 4,
        unit: 'TB',
      },
      increase: {
        type: IncreaseType.Add,
        value: 1,
      },
    },
    monthlyPrice: {
      base: 60,
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
  })
}
