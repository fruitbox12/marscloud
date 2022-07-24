import { useCallback, useEffect } from 'react'
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
} from '@chakra-ui/react'
import useSWR from 'swr'
import fetcher from '../../../../../infra/fetcher'
import ImageCard from './image-card'
import { useAppDispatch, useAppSelector } from '../../../../../store/hook'
import { osImageUpdated } from '../../store/ui/create-instance'
import { Image } from '../../../../image'

const SelectImage = () => {
  const { data } = useSWR<Image[]>('/api/images', fetcher)
  const activeImage = useAppSelector((state) => state.ui.createInstance.image)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && data.length > 0) {
      const image = data[0]
      dispatch(osImageUpdated({ id: image.id, version: image.versions[0] }))
    }
  }, [data])

  const handleCardClick = useCallback((image: Image) => {
    dispatch(osImageUpdated({ id: image.id, version: image.versions[0] }))
  }, [])

  const handleVersionChange = useCallback((image: Image, version?: string) => {
    dispatch(
      osImageUpdated({ id: image.id, version: version || image.versions[0] })
    )
  }, [])

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
                <ImageCard
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
