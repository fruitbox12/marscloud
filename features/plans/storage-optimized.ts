import { Plan, PlanGroup } from './types'
import createPlans from './create-plans'
import { IncreaseType } from './spec'

export function createStorageOptimizedPlanGroup(): PlanGroup {
  const id = 'storage-optimized'
  return {
    id,
    name: 'Storage-Optimized',
    description:
      'Instances with large amounts of super fast NVMe storage, suitable for large NoSQL databases ' +
      '(e.g. MongoDB, Elasticsearch), time series databases, and other data warehouses.',
    plans: createStorageOptimizedPlans(id),
  }
}

export function createStorageOptimizedPlans(planGroupId: string): Plan[] {
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
        value: 300,
        unit: 'GB',
        type: 'NVMe SSDs',
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
      base: 130,
      increase: {
        type: IncreaseType.Multiply,
        value: 2,
      },
    },
  })
}
