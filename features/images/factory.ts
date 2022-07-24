import { Image, ImageGroupId } from './types'

export function getUbuntuImages(): Image[] {
  return [
    {
      id: 'ubuntu/22.04-lts-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '22.04 (LTS) x64',
    },
    {
      id: 'ubuntu/21.10-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '21.10 x64',
    },
    {
      id: 'ubuntu/20.04-lts-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '20.04 (LTS) x64',
    },
    {
      id: 'ubuntu/18.04-lts-x64',
      group: ImageGroupId.Ubuntu,
      name: 'Ubuntu',
      version: '18.04 (LTS) x64',
    },
  ]
}

export function getRancherOSImages(): Image[] {
  return [
    {
      id: 'rancher-os/1.5.8-x64',
      group: ImageGroupId.RancherOS,
      name: 'Rancher OS',
      version: '1.5.8 x64',
    },
  ]
}

export function getFedoraImages(): Image[] {
  return [
    {
      id: 'fedora/36-x64',
      group: ImageGroupId.Fedora,
      name: 'Fedora',
      version: '36 x64',
    },
    {
      id: 'fedora/35-x64',
      group: ImageGroupId.Fedora,
      name: 'Fedora',
      version: '35 x64',
    },
    {
      id: 'fedora/34-x64',
      group: ImageGroupId.Fedora,
      name: 'Fedora',
      version: '34 x64',
    },
  ]
}

export function getDebianImages(): Image[] {
  return [
    {
      id: 'debian/11-x64',
      group: ImageGroupId.Debian,
      name: 'Debian',
      version: '11 x64',
    },
    {
      id: 'debian/10-x64',
      group: ImageGroupId.Debian,
      name: 'Debian',
      version: '10 x64',
    },
    {
      id: 'debian/9-x64',
      group: ImageGroupId.Debian,
      name: 'Debian',
      version: '9 x64',
    },
  ]
}

export function getCentOsImages(): Image[] {
  return [
    {
      id: 'centos/9-stream-x64',
      group: ImageGroupId.CentOS,
      name: 'CentOS',
      version: '9 Stream x64',
    },
    {
      id: 'centos/8-stream-x64',
      group: ImageGroupId.CentOS,
      name: 'CentOS',
      version: '8 Stream x64',
    },
    {
      id: 'centos/7-x64',
      group: ImageGroupId.CentOS,
      name: 'CentOS',
      version: '7 x64',
    },
  ]
}
