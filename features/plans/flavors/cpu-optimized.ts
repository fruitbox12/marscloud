import { Plan, PlanGroup } from '../types'
import createPlans from '../create-plans'
import { IncreaseType } from '../spec'

export function createCpuOptimizedPlanGroup(): PlanGroup {
  const id = 'cpu-optimized'
  return {
    id,
    name: 'CPU-Optimized',
    description:
      'Compute-optimized virtual machines with dedicated hyper-threads from best in class Intel processors. ' +
      'Best for CPU-intensive applications like CI/CD, video encoding and transcoding, machine learning, ad serving, ' +
      'batch processing, and active front-end web and application servers.',
    plans: createCpuOptimizedPlans(id),
  }
}

export function createCpuOptimizedPlans(planGroupId: string): Plan[] {
  return createPlans({
    planGroupId,
    size: 5,
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
        value: 4,
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
      base: 40,
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
  })
}
