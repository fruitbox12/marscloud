import {
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
} from '@chakra-ui/react'
import SiderbarLink from './sidebar-link'
import { BiAddToQueue, BiBarChartAlt2 } from 'react-icons/bi'

const Sidebar = () => {
  return (
    <Stack bg="white" h="100%" pt={28} borderRight="1px" borderColor="gray.100">
      <Accordion defaultIndex={[0, 1]} allowMultiple variant="sidebar">
        <Stack spacing={4}>
          <AccordionItem>
            <AccordionButton>
              <BiAddToQueue />
              <Box ml={2}>Projects</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color="gray.200">
              <SiderbarLink href="/projects/new">New project</SiderbarLink>
            </AccordionPanel>
          </AccordionItem>
          <Divider color="gray.100" />
          <AccordionItem>
            <AccordionButton>
              <BiBarChartAlt2 />
              <Box ml={2}>Manage</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color="gray.200">
              <SiderbarLink href="/instances">Instances</SiderbarLink>
              <SiderbarLink href="/volumes">Volumes</SiderbarLink>
              <SiderbarLink href="/images">Images</SiderbarLink>
              <SiderbarLink href="/networking">Networking</SiderbarLink>
            </AccordionPanel>
          </AccordionItem>
        </Stack>
      </Accordion>
    </Stack>
  )
}

export default Sidebar
