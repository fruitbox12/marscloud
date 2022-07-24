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
import { imageUpdated } from '../../slices/create-instance'
import { Image, ImageGroup } from '../../../../images'

const SelectImage = () => {
  const { data } = useSWR<ImageGroup[]>('/api/images/groups', fetcher)
  const activeImage = useAppSelector((state) => state.ui.createInstance.image)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && data.length > 0) {
      const group = data[0]
      dispatch(imageUpdated(group.images[0]))
    }
  }, [data])

  const handleGroupChange = useCallback((group: ImageGroup) => {
    dispatch(imageUpdated(group.images[0]))
  }, [])

  const handleImageChange = useCallback((group: ImageGroup, image?: Image) => {
    dispatch(imageUpdated(image || group.images[0]))
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
              {data.map((group) => (
                <ImageCard
                  key={group.id}
                  group={group}
                  image={
                    activeImage?.group === group.id ? activeImage : undefined
                  }
                  isActive={activeImage?.group === group.id}
                  onClick={() => handleGroupChange(group)}
                  onChange={handleImageChange}
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
