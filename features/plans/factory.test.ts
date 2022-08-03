import { createPlans, CreatePlansOptions, IncreaseType } from './factory'
import { getHourlyPrice } from './pricing'
import { PlanGroupId } from './types'

const options: CreatePlansOptions = {
  groupId: PlanGroupId.Basic,
  size: 3,
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
}

describe('createPlans', () => {
  it('returns correct number of values', () => {
    const plans = createPlans(options)
    expect(plans).toHaveLength(3)
  })

  it('returns values with correct fields', () => {
    const plans = createPlans(options)

    const monthlyPrices = [5, 10, 20]
    plans.forEach((plan, index) => {
      expect(plan.id).toBe(`${options.groupId}-plan-${index + 1}`)
      expect(plan.group).toBe(options.groupId)
      expect(plan.cpu).toBeTruthy()
      expect(plan.memory).toBeTruthy()
      expect(plan.storage).toBeTruthy()
      expect(plan.transfer).toBeTruthy()
      expect(plan.monthlyPrice).toBe(monthlyPrices[index])
      expect(plan.hourlyPrice).toBe(getHourlyPrice(plan.monthlyPrice))
    })
  })
})
