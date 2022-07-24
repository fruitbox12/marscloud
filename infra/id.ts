import { v4 as uuidv4 } from 'uuid'
import hashids from 'hashids'

export function newId(): string {
  return new hashids(uuidv4()).encode(Date.now())
}
