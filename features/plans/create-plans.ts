import { Spec, Plan } from './types'
import increaseSpec, { IncreaseOptions } from './spec'
import { getHourlyPrice } from './pricing'

export type CreatePlansOptions = {
  planGroupId: string
  size: number
  cpu: CreateSpecOptions
  memory: CreateSpecOptions
  storage: CreateSpecOptions
  transfer: CreateSpecOptions
  monthlyPrice: CreatePriceOptions
}

export type CreateSpecOptions = {
  base: Spec
  increment: IncreaseOptions
}

export type CreatePriceOptions = {
  base: number
  increment: IncreaseOptions
}

export default function createPlans(options: CreatePlansOptions): Plan[] {
  const plans: Plan[] = []
  let cpu: number = options.cpu.base.value
  let memory: number = options.memory.base.value
  let storage: number = options.storage.base.value
  let transfer: number = options.transfer.base.value
  let monthlyPrice: number = options.monthlyPrice.base
  for (let i = 1; i <= options.size; i++) {
    plans.push({
      id: `${options.planGroupId}-plan-${i}`,
      cpu: {
        ...options.cpu.base,
        value: cpu,
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
    cpu = increaseSpec(cpu, i, options.cpu.increment)
    memory = increaseSpec(memory, i, options.memory.increment)
    storage = increaseSpec(storage, i, options.storage.increment)
    transfer = increaseSpec(transfer, i, options.transfer.increment)
    monthlyPrice = increaseSpec(monthlyPrice, i, options.monthlyPrice.increment)
  }
  return plans
}
