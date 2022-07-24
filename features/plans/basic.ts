import { Plan, PlanGroup } from './types'
import createPlans from './create-plans'
import { IncreaseType } from './spec'

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
      increment: {
        type: IncreaseType.Multiply,
        value: 2,
        frequence: 3,
      },
    },
    memory: {
      base: {
        value: 0.5,
        unit: 'GB',
      },
      increment: {
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
      increment: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
    transfer: {
      base: {
        value: 1,
        unit: 'TB',
      },
      increment: {
        type: IncreaseType.Add,
        value: 1,
      },
    },
    monthlyPrice: {
      base: 5,
      increment: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
  })
}
