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
} from "@chakra-ui/react"
import { VscTerminalUbuntu } from "react-icons/vsc"
import { SiRancher, SiFedora, SiDebian, SiCentos } from "react-icons/si"

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
]

const SelectImage: FC = () => {
  const [name, setName] = useState("Ubuntu")
  const [version, setVersion] = useState("Select version")
  const handleClick = (name: string) => {
    setName(name)
  }

  const handleButton = (item: any) => {
    setVersion(item)
  }

  useEffect(() => {}, [name, version])
  return (
    <Stack spacing={5}>
      <Heading size="lg" color="gray.700">
        Select an image
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Distributions</Tab>
          <Tab>Marketplace</Tab>
          <Tab>Custom images</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {data.map((item, index) => {
                let ver = false
                if (name === item.name) {
                  const found = item.versions.find(
                    (element) => element === version
                  )
                  ver = found ? true : false
                }

                return (
                  <Box key={index} bg="white">
                    <Flex
                      direction="column"
                      alignItems="center"
                      onClick={() => handleClick(item.name)}
                      border="1px"
                      borderColor={name === item.name ? "blue.500" : "gray.300"}
                      pt={3}
                      color={name === item.name ? "blue.500" : "gray.400"}
                    >
                      {item.icon}
                      <Box my={4}>{item.name}</Box>
                      <Menu>
                        <MenuButton w="100%" as={Button}>
                          {ver ? version : "Select version"}
                        </MenuButton>
                        <MenuList>
                          {item.versions.map((item, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => handleButton(item)}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Box>
                )
              })}
            </Grid>
          </TabPanel>
          <TabPanel>
            <p>Coming soon...</p>
          </TabPanel>
          <TabPanel>
            <p>Coming soon...</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

export default SelectImage
