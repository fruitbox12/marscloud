import { Plan, PlanGroup } from '../types'
import createPlans from '../create-plans'
import { IncreaseType } from '../spec'

export function createMemoryOptimizedPlanGroup(): PlanGroup {
  const id = 'memory-optimized'
  return {
    id,
    name: 'Memory optimized',
    description:
      'Memory-rich virtual machines with 8GB of RAM per vCPU and dedicated hyper-threads from best-in-class Intel processors. ' +
      'Ideal for RAM-intensive applications like high-performance databases, ' +
      'web scale in-memory caches, and real-time big data processing.',
    plans: createMemoryOptimizedPlans(id),
  }
}

export function createMemoryOptimizedPlans(planGroupId: string): Plan[] {
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
        value: 16,
        unit: 'GB',
      },
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
    storage: {
      base: {
        value: 50,
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
      base: 80,
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
  })
}
