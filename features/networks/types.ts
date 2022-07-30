export interface Configs {
  subnet: string
  gateway: string
}

export interface Network {
  id: string
  name: string
  ipv6: number
  configs: Configs[]
  createTime: string
}
