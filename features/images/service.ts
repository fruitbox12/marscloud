import { List } from 'immutable'
import {
  getCentOsImages,
  getDebianImages,
  getFedoraImages,
  getRancherOSImages,
  getUbuntuImages,
} from './factory'
import { Image, ImageGroup, ImageGroupId } from './types'

let db = List<Image>()

getUbuntuImages().forEach((image) => (db = db.push(image)))
getRancherOSImages().forEach((image) => (db = db.push(image)))
getFedoraImages().forEach((image) => (db = db.push(image)))
getDebianImages().forEach((image) => (db = db.push(image)))
getCentOsImages().forEach((image) => (db = db.push(image)))

export class ImageNotFoundError extends Error {
  constructor() {
    super()
    this.message = 'Image not found'
  }
}

export class ImageService {
  getAll(): Image[] {
    return db.toArray()
  }

  getById(id: string): Image {
    const image = db.find((image) => image.id === id)
    if (!image) {
      throw new ImageNotFoundError()
    }
    return image
  }

  getGroups(): ImageGroup[] {
    return [
      {
        id: ImageGroupId.Ubuntu,
        name: 'Ubuntu',
        images: db
          .filter((image) => image.group === ImageGroupId.Ubuntu)
          .toArray(),
      },
      {
        id: ImageGroupId.RancherOS,
        name: 'Rancher OS',
        images: db
          .filter((image) => image.group === ImageGroupId.RancherOS)
          .toArray(),
      },
      {
        id: ImageGroupId.Fedora,
        name: 'Fedora',
        images: db
          .filter((image) => image.group === ImageGroupId.Fedora)
          .toArray(),
      },
      {
        id: ImageGroupId.Debian,
        name: 'Debian',
        images: db
          .filter((image) => image.group === ImageGroupId.Debian)
          .toArray(),
      },
      {
        id: ImageGroupId.CentOS,
        name: 'CentOS',
        images: db
          .filter((image) => image.group === ImageGroupId.CentOS)
          .toArray(),
      },
    ]
  }
}
