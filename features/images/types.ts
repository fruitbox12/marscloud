export enum ImageGroupId {
  Ubuntu = 'ubuntu',
  RancherOS = 'rancher-os',
  Fedora = 'fedora',
  Debian = 'debian',
  CentOS = 'centos',
}

export interface Image {
  id: string
  group: ImageGroupId
  name: string
  version: string
}

export interface ImageGroup {
  id: ImageGroupId
  name: string
  images: Image[]
}
