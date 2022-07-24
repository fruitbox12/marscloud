import { List } from 'immutable'
import {
  createBasicPlans,
  createCpuOptimizedPlans,
  createGeneralPurposePlans,
  createMemoryOptimizedPlans,
  createStorageOptimizedPlans,
} from './factory'
import { Plan, PlanGroup, PlanGroupId } from './types'

let db = List<Plan>()

createBasicPlans().forEach((plan) => (db = db.push(plan)))
createCpuOptimizedPlans().forEach((plan) => (db = db.push(plan)))
createGeneralPurposePlans().forEach((plan) => (db = db.push(plan)))
createMemoryOptimizedPlans().forEach((plan) => (db = db.push(plan)))
createStorageOptimizedPlans().forEach((plan) => (db = db.push(plan)))

export class PlanNotFoundError extends Error {
  constructor() {
    super()
    this.message = 'Plan not found'
  }
}

export class PlanService {
  getAll(): Plan[] {
    return db.toArray()
  }

  getById(id: string): Plan {
    const plan = db.find((plan) => plan.id === id)
    if (!plan) {
      throw new PlanNotFoundError()
    }
    return plan
  }

  getGroups(): PlanGroup[] {
    return [
      {
        id: PlanGroupId.Basic,
        name: 'Basic',
        description:
          'Basic virtual machines with a mix of memory and compute resources.' +
          ' Best for small projects that can handle variable levels of CPU performance, ' +
          'like blogs, web apps and dev/test environments.',
        plans: db.filter((plan) => plan.group === PlanGroupId.Basic).toArray(),
      },
      {
        id: PlanGroupId.CpuOptimized,
        name: 'CPU-Optimized',
        description:
          'Compute-optimized virtual machines with dedicated hyper-threads from best in class Intel processors. ' +
          'Best for CPU-intensive applications like CI/CD, video encoding and transcoding, machine learning, ad serving, ' +
          'batch processing, and active front-end web and application servers.',
        plans: db
          .filter((plan) => plan.group === PlanGroupId.CpuOptimized)
          .toArray(),
      },
      {
        id: PlanGroupId.GeneralPurpose,
        name: 'General Purpose',
        description:
          'High performance virtual machines with a good balance of memory ' +
          'and dedicated hyper-threads from best in class Intel processors. ' +
          'A great choice for a wide range of mainstream, production workloads, ' +
          'like web app hosting, e-commerce sites, medium-sized databases, and enterprise applications.',
        plans: db
          .filter((plan) => plan.group === PlanGroupId.GeneralPurpose)
          .toArray(),
      },
      {
        id: PlanGroupId.MemoryOptimized,
        name: 'Memory optimized',
        description:
          'Memory-rich virtual machines with 8GB of RAM per vCPU and dedicated hyper-threads from best-in-class Intel processors. ' +
          'Ideal for RAM-intensive applications like high-performance databases, ' +
          'web scale in-memory caches, and real-time big data processing.',
        plans: db
          .filter((plan) => plan.group === PlanGroupId.MemoryOptimized)
          .toArray(),
      },
      {
        id: PlanGroupId.StorageOptimized,
        name: 'Storage-Optimized',
        description:
          'Instances with large amounts of super fast NVMe storage, suitable for large NoSQL databases ' +
          '(e.g. MongoDB, Elasticsearch), time series databases, and other data warehouses.',
        plans: db
          .filter((plan) => plan.group === PlanGroupId.StorageOptimized)
          .toArray(),
      },
    ]
  }
}
