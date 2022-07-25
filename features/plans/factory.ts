import { Spec, Plan, PlanGroupId } from './types'
import { getHourlyPrice } from './pricing'

export type CreatePlansOptions = {
  groupId: PlanGroupId
  size: number
  cpu: CreateSpecOptions
  memory: CreateSpecOptions
  storage: CreateSpecOptions
  transfer: CreateSpecOptions
  monthlyPrice: CreatePriceOptions
}

export type CreateSpecOptions = {
  base: Spec
  increase: IncreaseOptions
}

export type CreatePriceOptions = {
  base: number
  increase: IncreaseOptions
}

export function createPlans(options: CreatePlansOptions): Plan[] {
  const plans: Plan[] = []
  let cpu: number = options.cpu.base.value
  let memory: number = options.memory.base.value
  let storage: number = options.storage.base.value
  let transfer: number = options.transfer.base.value
  let monthlyPrice: number = options.monthlyPrice.base
  for (let i = 1; i <= options.size; i++) {
    plans.push({
      id: `${options.groupId}-plan-${i}`,
      group: options.groupId,
      cpu: {
        ...options.cpu.base,
        value: cpu,
        unit: cpu > 1 ? 'CPUs' : 'CPU',
      },
      memory: {
        ...options.memory.base,
        value: memory,
      },
      storage: {
        ...options.storage.base,
        value: storage,
      },
      transfer: {
        ...options.transfer.base,
        value: transfer,
      },
      monthlyPrice,
      hourlyPrice: getHourlyPrice(monthlyPrice),
    })
    cpu = increaseSpec(cpu, i, options.cpu.increase)
    memory = increaseSpec(memory, i, options.memory.increase)
    storage = increaseSpec(storage, i, options.storage.increase)
    transfer = increaseSpec(transfer, i, options.transfer.increase)
    monthlyPrice = increaseSpec(monthlyPrice, i, options.monthlyPrice.increase)
  }
  return plans
}

export enum IncreaseType {
  Add,
  Multiply,
}

export type IncreaseOptions = {
  type: IncreaseType
  value: number
  frequency?: number
}

export class InvalidIncreaseTypeError extends Error {}

export function increaseSpec(
  currentValue: number,
  index: number,
  options: IncreaseOptions
): number {
  const frequency = options.frequency || 1
  if (index % frequency !== 0) {
    return currentValue
  }
  if (options.type === IncreaseType.Add) {
    return currentValue + options.value
  } else if (options.type === IncreaseType.Multiply) {
    return currentValue * options.value
  } else {
    throw new InvalidIncreaseTypeError()
  }
}

export function createBasicPlans(): Plan[] {
  return createPlans({
    groupId: PlanGroupId.Basic,
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

export function createCpuOptimizedPlans(): Plan[] {
  return createPlans({
    groupId: PlanGroupId.CpuOptimized,
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

export function createGeneralPurposePlans(): Plan[] {
  return createPlans({
    groupId: PlanGroupId.GeneralPurpose,
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

export function createMemoryOptimizedPlans(): Plan[] {
  return createPlans({
    groupId: PlanGroupId.MemoryOptimized,
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

export function createStorageOptimizedPlans(): Plan[] {
  return createPlans({
    groupId: PlanGroupId.StorageOptimized,
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
