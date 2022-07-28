import { List } from 'immutable'
import { newId } from '../../infra/id'
import { Networking } from './types'

export type CreateNetworkingOptions = {
  name: string
}

let db = List<Networking>([])

export class NetworkingService {
  create(options: CreateNetworkingOptions): Networking {
    const networking = {
      id: newId(),
      name: options.name,
    }
    db = db.push(networking)
    return networking
  }
  getAll(): Networking[] {
    return db.toArray()
  }
}
