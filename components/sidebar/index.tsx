import { Stack } from '@chakra-ui/react'
import {
  IoGitNetworkOutline,
  IoImagesOutline,
  IoLeafOutline,
  IoRocketOutline,
} from 'react-icons/io5'
import SidebarItem from './sidebar-item'

const Sidebar = () => {
  return (
    <Stack bg="" h="100%" pt={28} borderRight="1px" borderColor="gray.100">
      <Stack p={3}>
        <SidebarItem icon={<IoRocketOutline />} href="/instances">
          Instances
        </SidebarItem>
        <SidebarItem icon={<IoLeafOutline />} href="/volumes">
          Volumes
        </SidebarItem>
        <SidebarItem icon={<IoImagesOutline />} href="/images">
          Images
        </SidebarItem>
        <SidebarItem icon={<IoGitNetworkOutline />} href="/networking">
          Networking
        </SidebarItem>
      </Stack>
    </Stack>
  )
}

export default Sidebar
