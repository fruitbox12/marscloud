import { VscTerminalUbuntu } from "react-icons/vsc"
import { SiRancher, SiFedora, SiDebian, SiCentos } from "react-icons/si"
import { GiCompactDisc } from "react-icons/gi"

type Props = {
  value: string
  fontSize?: string
  color?: string
}

const Icon = ({ value, fontSize, color }: Props) => {
  let Component: any
  if (value.startsWith("ubuntu")) {
    Component = VscTerminalUbuntu
  } else if (value.startsWith("rancheros")) {
    Component = SiRancher
  } else if (value.startsWith("fedora")) {
    Component = SiFedora
  } else if (value.startsWith("debian")) {
    Component = SiDebian
  } else if (value.startsWith("centos")) {
    Component = SiCentos
  } else {
    Component = GiCompactDisc
  }
  return <Component fontSize={fontSize} color={color} />
}

export default Icon
