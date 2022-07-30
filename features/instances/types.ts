import { Image } from '../images'
import { Plan } from '../plans'
import { Volume as VolumeType } from '../volumes/types'
import { Network } from '../networks/types'

export interface Env {
  key: string
  value: string
}

export interface Volume {
  path: string
  volume: VolumeType
}

export interface Instance {
  id: string
  name: string
  image: Image
  env: Env[]
  ports: []
  status: string
  user: string
  size: number
  sizePretty: string
  volumes: Volume[]
  networks: Network[]
  createTime: string
}
