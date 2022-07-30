export enum ImageGroupId {
  Ubuntu = 'ubuntu',
  RancherOS = 'rancher-os',
  Fedora = 'fedora',
  Debian = 'debian',
  CentOS = 'centos',
  Redis = 'redis',
  Postgres = 'postgres',
}

export interface Image {
  id: string
  name: string | ImageGroupId
  tag: string
  size: number
  sizePretty: string
  inUse: boolean
  createTime: string
}

export interface ImageGroup {
  name: string
  images: Image[]
}
