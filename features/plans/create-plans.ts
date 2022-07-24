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
  increase: IncreaseOptions
}

export type CreatePriceOptions = {
  base: number
  increase: IncreaseOptions
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
    cpu = increaseSpec(cpu, i, options.cpu.increase)
    memory = increaseSpec(memory, i, options.memory.increase)
    storage = increaseSpec(storage, i, options.storage.increase)
    transfer = increaseSpec(transfer, i, options.transfer.increase)
    monthlyPrice = increaseSpec(monthlyPrice, i, options.monthlyPrice.increase)
  }
  return plans
}
