import { useRouter } from 'next/router'
import {
  Text,
  Spinner,
  Center,
  Box,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react'
import VolumesTable from '../volumes-table'
import useSWR from 'swr'
import fetcher from '../../../../../infra/fetcher'
import illustration from './illustration.svg'

const VolumesList = () => {
  const router = useRouter()
  const { data, error } = useSWR('/api/volumes', fetcher, {
    refreshInterval: 2500,
  })

  if (error) {
    return <Text>Failed to fetch volumes</Text>
  }

  if (!data) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  if (data.length === 0) {
    return (
      <Flex direction="column" alignItems="center">
        <Box boxSize="sm">
          <Image src={illustration.src} alt="create volume" />
        </Box>
        <Text>Let's create your first volume.</Text>
        <Button
          colorScheme="pink"
          onClick={() => router.push('/volumes/new')}
          mt={10}
        >
          Create volume
        </Button>
      </Flex>
    )
  } else {
    return <VolumesTable volumes={data} />
  }
}

export default VolumesList
