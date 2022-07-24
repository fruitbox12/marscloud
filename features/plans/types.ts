export type PlanGroup = {
  id: string
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
  cpu: Spec
  memory: Spec
  storage: Spec
  transfer: Spec
  monthlyPrice: number
  hourlyPrice: number
}
