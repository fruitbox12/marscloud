import { VscTerminalUbuntu } from 'react-icons/vsc'
import { SiRancher, SiFedora, SiDebian, SiCentos } from 'react-icons/si'
import { GiCompactDisc } from 'react-icons/gi'
import { ImageGroupId } from '../features/images'

type Props = {
  group: ImageGroupId
  fontSize?: string
  color?: string
}

const ImageIcon = ({ group, fontSize, color }: Props) => {
  let Component: any
  if (group === ImageGroupId.Ubuntu) {
    Component = VscTerminalUbuntu
  } else if (group === ImageGroupId.RancherOS) {
    Component = SiRancher
  } else if (group === ImageGroupId.Fedora) {
    Component = SiFedora
  } else if (group === ImageGroupId.Debian) {
    Component = SiDebian
  } else if (group === ImageGroupId.CentOS) {
    Component = SiCentos
  } else {
    Component = GiCompactDisc
  }
  return <Component fontSize={fontSize} color={color} />
}

export default ImageIcon
