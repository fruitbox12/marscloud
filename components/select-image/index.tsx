import { FC, useCallback, useEffect } from "react"
import {
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  Center,
  Spinner,
} from "@chakra-ui/react"
import useSWR from "swr"
import fetcher from "../../infra/fetcher"
import { OSImage } from "../../types"
import Card from "./card"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { imageUpdated } from "../../store/ui/createInstance"

const SelectImage: FC = () => {
  const { data } = useSWR<OSImage[]>("/api/images", fetcher)
  const activeImage = useAppSelector((state) => state.ui.createInstance.image)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && data.length > 0) {
      const image = data[0]
      dispatch(imageUpdated({ id: image.id, version: image.versions[0] }))
    }
  }, [data])

  const handleCardClick = useCallback((image: OSImage) => {
    dispatch(imageUpdated({ id: image.id, version: image.versions[0] }))
  }, [])

  const handleVersionChange = useCallback(
    (image: OSImage, version?: string) => {
      dispatch(
        imageUpdated({ id: image.id, version: version || image.versions[0] })
      )
    },
    []
  )

  if (!data) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

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
              {data.map((image) => (
                <Card
                  key={image.name}
                  image={image}
                  version={
                    activeImage?.id === image.id
                      ? activeImage?.version
                      : undefined
                  }
                  isActive={activeImage?.id === image.id}
                  onClick={() => handleCardClick(image)}
                  onChange={handleVersionChange}
                />
              ))}
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
