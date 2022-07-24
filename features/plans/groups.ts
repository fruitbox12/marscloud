import { PlanGroup } from './types'
import { createBasicPlanGroup } from './flavors/basic'
import { createGeneralPurposePlanGroup } from './flavors/general-purpose'
import { createCpuOptimizedPlanGroup } from './flavors/cpu-optimized'
import { createMemoryOptimizedPlanGroup } from './flavors/memory-optimized'
import { createStorageOptimizedPlanGroup } from './flavors/storage-optimized'

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
