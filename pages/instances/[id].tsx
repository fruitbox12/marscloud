import { ReactElement } from 'react'
import { Heading, Stack } from '@chakra-ui/react'
import Layout from '../../components/layout'
import type { NextPageWithLayout } from '../_app'
import InstanceView from '../../features/instances/view'

const InstancePage: NextPageWithLayout = () => {
  return (
    <Stack spacing={10}>
      <Heading as="h1">Instance</Heading>
      <InstanceView />
    </Stack>
  )
}

InstancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default InstancePage
