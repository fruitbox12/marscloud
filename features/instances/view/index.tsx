import useSWR from 'swr'
import { useRouter } from 'next/router'
import fetcher from '../../../infra/fetcher'
import {
  Text,
  Center,
  Spinner,
  Grid,
  Box,
  Select,
  Button,
} from '@chakra-ui/react'
import { Env } from '../types'
import { useCallback, useEffect } from 'react'
import { Network } from '../../networks/types'

const InstanceView = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/containers/${id}` : null,
    fetcher
  )
  const { data: networks, error: errorNetworks } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/networks` : null,
    fetcher
  )

  const handleConnectNetwork = useCallback(() => {
    //to do with formik
  }, [])

  useEffect(() => {
    console.log(networks)
  }, [networks])

  if (error) {
    return (
      <Center>
        <Text>Faild to load instance</Text>
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

  return (
    <>
      <Grid templateColumns="1fr 1fr" width="500px" gap={3}>
        <Text>Name: </Text>
        <Text>{data.name}</Text>
        <Text>Tag: </Text>
        <Text>{data.image.tag}</Text>
        <Text>Status: </Text>
        <Text>{data.status}</Text>
        <Text>Created: </Text>
        <Text>{data.image.createTime}</Text>
        <Text>Env: </Text>
        <Grid templateColumns="1fr" gap={2}>
          {data.env.map((item: Env, index: string) => (
            <Box key={index}>
              <Text>Key: {item.key}</Text>
              <Text>Value: {item.value}</Text>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Text>Connect Network</Text>
      {networks && (
        <Select placeholder="Select option">
          {networks.map((network: Network) => (
            <option value={network.id}>{network.name}</option>
          ))}
        </Select>
      )}

      <Button onClick={handleConnectNetwork}>Connect</Button>
    </>
  )
}

export default InstanceView
