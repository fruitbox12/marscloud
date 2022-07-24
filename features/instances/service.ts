import { newId } from '../../infra/id'
import { Instance } from './types'
import { List } from 'immutable'
import { Image } from '../images'
import { Plan } from '../plans'

export type CreateInstanceOptions = {
  name: string
  image: Image
  plan: Plan
}

let db = List<Instance>([])

export class InstanceNotFoundError extends Error {
  constructor() {
    super()
    this.message = 'Instance not found'
  }
}

export class InstanceService {
  create(options: CreateInstanceOptions): Instance {
    const instance: Instance = {
      id: newId(),
      name: options.name,
      image: options.image,
      plan: options.plan,
    }
    db = db.push(instance)
    return instance
  }

  delete(id: string) {
    if (!db.find((instance) => instance.id === id)) {
      throw new InstanceNotFoundError()
    }
    db = db.filter((instance) => instance.id !== id)
  }

  getById(id: string): Instance {
    const instance = db.find((instance) => instance.id === id)
    if (!instance) {
      throw new InstanceNotFoundError()
    }
    return instance
  }

  getAll(): Instance[] {
    return db.toArray()
  }
}
