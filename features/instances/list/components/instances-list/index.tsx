import {
  Text,
  Button,
  Image,
  Box,
  Flex,
  Center,
  Spinner,
} from '@chakra-ui/react'
import useSWR from 'swr'
import fetcher from '../../../../../infra/fetcher'
import InstancesTable from '../instances-table'
import illustration from './illustration.svg'

const InstancesList = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/containers`,
    fetcher,
    {
      refreshInterval: 2500,
    }
  )

  if (error) {
    return (
      <Center>
        <Text>Failed to fetch instances</Text>
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
          <Image src={illustration.src} alt="create instance" />
        </Box>
        <Text>Looks like you don't have any instances.</Text>
        <Button href="/instances/new" as="a" colorScheme="pink" mt={10}>
          Create instance
        </Button>
      </Flex>
    )
  } else {
    return <InstancesTable instances={data} />
  }
}

export default InstancesList
