export enum PlanGroupId {
  Basic = 'basic',
  CpuOptimized = 'cpu-optimized',
  GeneralPurpose = 'general-purpose',
  MemoryOptimized = 'memory-optimized',
  StorageOptimized = 'storage-optimized',
}

export type PlanGroup = {
  id: PlanGroupId
  name: string
  description: string
  plans: Plan[]
}

export type Spec = {
  value: number
  unit?: string
  type?: string
}

export type Plan = {
  id: string
  group: PlanGroupId
  cpu: Spec
  memory: Spec
  storage: Spec
  transfer: Spec
  monthlyPrice: number
  hourlyPrice: number
}
