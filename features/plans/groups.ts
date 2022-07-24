import { PlanGroup } from './types'
import { createBasicPlanGroup } from './basic'
import { createGeneralPurposePlanGroup } from './general-purpose'
import { createCpuOptimizedPlanGroup } from './cpu-optimized'
import { createMemoryOptimizedPlanGroup } from './memory-optimized'
import { createStorageOptimizedPlanGroup } from './storage-optimized'

export function getPlanGroups(): PlanGroup[] {
  const basic = createBasicPlanGroup()
  const generalPurpose = createGeneralPurposePlanGroup()
  const cpuOptimized = createCpuOptimizedPlanGroup()
  const memoryOptimized = createMemoryOptimizedPlanGroup()
  const storageOptimized = createStorageOptimizedPlanGroup()
  return [
    basic,
    generalPurpose,
    cpuOptimized,
    memoryOptimized,
    storageOptimized,
  ]
}
