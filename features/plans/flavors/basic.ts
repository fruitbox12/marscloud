import { Plan, PlanGroup } from '../types'
import createPlans from '../create-plans'
import { IncreaseType } from '../spec'

export function createBasicPlanGroup(): PlanGroup {
  const id = 'basic'
  return {
    id,
    name: 'Basic',
    description:
      'Basic virtual machines with a mix of memory and compute resources.' +
      ' Best for small projects that can handle variable levels of CPU performance, ' +
      'like blogs, web apps and dev/test environments.',
    plans: createBasicPlans(id),
  }
}

export function createBasicPlans(planGroupId: string): Plan[] {
  return createPlans({
    planGroupId,
    size: 6,
    cpu: {
      base: {
        value: 1,
        type: 'AMD',
      },
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
        frequency: 2,
      },
    },
    memory: {
      base: {
        value: 0.5,
        unit: 'GB',
      },
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
    storage: {
      base: {
        value: 10,
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
        value: 1,
        unit: 'TB',
      },
      increase: {
        type: IncreaseType.Add,
        value: 1,
      },
    },
    monthlyPrice: {
      base: 5,
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
  })
}
