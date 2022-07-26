import { newId } from '../../infra/id'
import { List } from 'immutable'
import { Volume } from './types'

export type CreateVolumeOptions = {
  name: string
  size: string
}

let db = List<Volume>([])

export class VolumeNotFoundError extends Error {
  constructor() {
    super()
    this.message = 'Volume not found'
  }
}

export class VolumeService {
  create(options: CreateVolumeOptions): Volume {
    const volume = {
      id: newId(),
      name: options.name,
      size: options.size,
    }
    db = db.push(volume)
    return volume
  }

  delete(id: string) {
    if (db.find((volume) => volume.id !== id)) {
      throw new VolumeNotFoundError()
    }
    db = db.filter((volume) => volume.id !== id)
  }

  getById(id: string) {
    const volume = db.find((volume) => volume.id === id)
    if (!volume) {
      throw new VolumeNotFoundError()
    }
    return volume
  }

  getAll(): Volume[] {
    return db.toArray()
  }
}
