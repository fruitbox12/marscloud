import { FC } from "react"
import {
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
} from "@chakra-ui/react"
import SiderbarLink from "./sidebar-link"

const Sidebar: FC = () => {
  return (
    <Stack bg="purple.700" h="100%" pt={28}>
      <Accordion defaultIndex={[0, 1]} allowMultiple variant="sidebar">
        <Stack spacing={4}>
          <AccordionItem>
            <AccordionButton>
              <Box>Projects</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color="gray.200">
              <SiderbarLink href="/projects/new">New project</SiderbarLink>
            </AccordionPanel>
          </AccordionItem>
          <Divider color="gray.400" />
          <AccordionItem>
            <AccordionButton>
              <Box>Manage</Box>
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
