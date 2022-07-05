import { FC, useState, useEffect } from "react"
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
} from "@chakra-ui/react"

const data = [
  {
    name: "Basic",
    description:
      "Basic virtual machines with a mix of memory and compute resources. Best for small projects that can handle variable levels of CPU performance, like blogs, web apps and dev/test environments.",
    plans: [
      {
        monthPrice: 6,
        hourPrice: 0.009,
        ram: "1 GB",
        processor: "1 Intel CPU",
        storage: "25 GB",
        memory: "NVMe SSDs",
        transfer: "1000 GB",
      },
      {
        monthPrice: 12,
        hourPrice: 0.018,
        ram: "2 GB",
        processor: "1 Intel CPU",
        storage: "50 GB",
        memory: "NVMe SSDs",
        transfer: "2 TB",
      },
      {
        monthPrice: 18,
        hourPrice: 0.027,
        ram: "2 GB",
        processor: "2 Intel CPU",
        storage: "60 GB",
        memory: "NVMe SSDs",
        transfer: "3 TB",
      },
      {
        monthPrice: 24,
        hourPrice: 0.036,
        ram: "4 GB",
        processor: "2 Intel CPU",
        storage: "80 GB",
        memory: "NVMe SSDs",
        transfer: "4 TB",
      },
      {
        monthPrice: 48,
        hourPrice: 0.071,
        ram: "8 GB",
        processor: "4 Intel CPU",
        storage: "160 GB",
        memory: "NVMe SSDs",
        transfer: "5 TB",
      },
      {
        monthPrice: 96,
        hourPrice: 0.143,
        ram: "16 GB",
        processor: "8 Intel CPU",
        storage: "320 GB",
        memory: "NVMe SSDs",
        transfer: "6 TB",
      },
    ],
  },
  {
    name: "Basic",
    description:
      "High performance virtual machines with a good balance of memory and dedicated hyper-threads from best in class Intel processors. A great choice for a wide range of mainstream, production workloads, like web app hosting, e-commerce sites, medium-sized databases, and enterprise applications.",
    plans: [
      {
        monthPrice: 60,
        hourPrice: 0.089,
        ram: "8 GB",
        processor: "2 CPUs",
        storage: "25 GB",
        memory: "SSD Disk",
        transfer: "4 GB",
      },
      {
        monthPrice: 120,
        hourPrice: 0.179,
        ram: "16 GB",
        processor: "4 CPUs",
        storage: "50 GB",
        memory: "SSD Disk",
        transfer: "5 TB",
      },
      {
        monthPrice: 240,
        hourPrice: 0.357,
        ram: "32 GB",
        processor: "8 CPUs",
        storage: "100 GB",
        memory: "SSD Disk",
        transfer: "6 TB",
      },
      {
        monthPrice: 480,
        hourPrice: 0.714,
        ram: "64 GB",
        processor: "16 CPUs",
        storage: "200 GB",
        memory: "SSD Disk",
        transfer: "7 TB",
      },
      {
        monthPrice: 960,
        hourPrice: 1.429,
        ram: "128 GB",
        processor: "32 CPUs",
        storage: "400 GB",
        memory: "SSD Disk",
        transfer: "8 TB",
      },
      {
        monthPrice: 1200,
        hourPrice: 1.786,
        ram: "160 GB",
        processor: "40 CPUs",
        storage: "500 GB",
        memory: "SSD Disk",
        transfer: "9 TB",
      },
    ],
  },
]

const SelectPlan: FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>()

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
          {data.map((item, index) => (
            <TabPanel key={index}>
              <Stack spacing={9}>
                <Text color="gray.600">{item.description}</Text>
                <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={6}>
                  {item.plans.map(
                    (
                      {
                        monthPrice,
                        hourPrice,
                        ram,
                        processor,
                        storage,
                        memory,
                        transfer,
                      },
                      index
                    ) => (
                      <Box
                        key={index}
                        border="1px solid"
                        borderColor={
                          index === selectedPlan ? "blue.500" : "gray.300"
                        }
                        fontSize="14px"
                        color="gray.600"
                        onClick={() => setSelectedPlan(index)}
                        cursor="pointer"
                      >
                        <VStack
                          py={3}
                          w="100%"
                          spacing={0}
                          bg={index === selectedPlan ? "blue.50" : "gray.50"}
                          borderBottom="1px"
                          borderColor={
                            index === selectedPlan ? "blue.500" : "gray.300"
                          }
                        >
                          <Text>
                            <Text
                              as="span"
                              color="gray.900"
                              fontSize="22px"
                              fontWeight="bold"
                            >
                              {monthPrice}
                            </Text>
                            $/mo
                          </Text>
                          <Text>
                            <Text as="span" color="gray.900">
                              {hourPrice}
                            </Text>
                            $/hour
                          </Text>
                        </VStack>
                        <VStack py={3} spacing={1}>
                          <Text>
                            {ram}/{processor}
                          </Text>
                          <Text>
                            {storage}/{memory}
                          </Text>
                          <Text>{transfer}/transfer</Text>
                        </VStack>
                      </Box>
                    )
                  )}
                </Grid>
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

export default SelectPlan
