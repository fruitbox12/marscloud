import { FC, useState, useEffect } from "react";
import {
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  VStack,
  Grid,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
import { VscTerminalUbuntu } from "react-icons/vsc";
import { SiRancher, SiFedora, SiDebian, SiCentos } from "react-icons/si";

const data = [
  {
    name: "Ubuntu",
    icon: <VscTerminalUbuntu size="38px" />,
    versions: [
      "22.04 (LTS) x64",
      "21.10 x64",
      "20.04 (LTS) x64",
      "18.04 (LTS) x64",
    ],
  },
  {
    name: "RancherOs",
    icon: <SiRancher size="38px" />,
    versions: ["1.5.8 x64"],
  },
  {
    name: "Fedora",
    icon: <SiFedora size="38px" />,
    versions: ["36 x64", "35 x64", "34 x64"],
  },
  {
    name: "Debian",
    icon: <SiDebian size="38px" />,
    versions: ["11 x64", "10 x64", "9 x64"],
  },
  {
    name: "CentOs",
    icon: <SiCentos size="38px" />,
    versions: ["9 Stream x64", "8 Stream x64", "7 x64"],
  },
];

const SelectPlan: FC = () => {
  return (
    <Stack spacing={5}>
      <Heading size="lg" color="gray.700">
        Select an plan
      </Heading>
      <Tabs variant="selectPlan">
        <TabList>
          <Grid templateColumns="1fr 4fr" gap={6} w="100%">
            <Flex aria-element="wrap">
              <Text>Shared CPU</Text>
              <Grid templateColumns="repeat(1, 1fr)" w="100%">
                <Tab>Basic</Tab>
              </Grid>
            </Flex>
            <Flex aria-element="wrap">
              <Text>Dedicated CPU</Text>
              <Grid templateColumns="repeat(4, 1fr)" w="100%">
                <Tab>General Purpose</Tab>
                <Tab>CPU-Optimized</Tab>
                <Tab>Memory-Optimized</Tab>
                <Tab>Storage-Optimized</Tab>
              </Grid>
            </Flex>
          </Grid>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Basic!</p>
          </TabPanel>
          <TabPanel>
            <p>General Purpose!</p>
          </TabPanel>
          <TabPanel>
            <p>CPU-Optimized!</p>
          </TabPanel>
          <TabPanel>
            <p>Memory-Optimized!</p>
          </TabPanel>
          <TabPanel>
            <p>Storage-Optimized!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default SelectPlan;
