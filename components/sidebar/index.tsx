import { FC } from "react";
import NextLink from "next/link";
import {
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Divider,
  Link,
} from "@chakra-ui/react";

const Sidebar: FC = () => {
  return (
    <Stack bg="blue.800" h="100%" pt={28}>
      <Accordion defaultIndex={[0, 1]} allowMultiple variant="sidebar">
        <Stack spacing={4}>
          <AccordionItem>
            <AccordionButton>
              <Box>Projects</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color="gray.200">
              <NextLink href="/projects/new" passHref>
                <Link>New project</Link>
              </NextLink>
            </AccordionPanel>
          </AccordionItem>
          <Divider color="gray.400" />
          <AccordionItem>
            <AccordionButton>
              <Box>Manage</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} color="gray.200">
              <Stack>
                <NextLink href="/instances" passHref>
                  <Link>Instances</Link>
                </NextLink>
                <NextLink href="/volumes" passHref>
                  <Link>Volumes</Link>
                </NextLink>
                <NextLink href="/images" passHref>
                  <Link>Images</Link>
                </NextLink>
                <NextLink href="/networking" passHref>
                  <Link>Networking</Link>
                </NextLink>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Stack>
      </Accordion>
    </Stack>
  );
};

export default Sidebar;
