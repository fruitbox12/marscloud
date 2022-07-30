import useSWR from 'swr'
import { useRouter } from 'next/router'
import {
  Center,
  Spinner,
  Text,
  Flex,
  Box,
  Button,
  Image,
} from '@chakra-ui/react'
import fetcher from '../../../../infra/fetcher'
import NetworksTable from '../networks-table'
import illustration from './illustration.svg'

const NetworksList = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/networks`,
    fetcher
  )
  const router = useRouter()

  if (error) {
    return (
      <Center>
        <Text>Failed to fetch networks</Text>
      </Center>
    )
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
        <Text>Let's create your first network.</Text>
        <Button
          colorScheme="pink"
          onClick={() => router.push('/networks/new')}
          mt={10}
        >
          Create network
        </Button>
      </Flex>
    )
  } else {
    return <NetworksTable networks={data} />
  }
}

export default NetworksList
