import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'
import CreateNetworking from '../../features/networking/create'
import { Heading } from '@chakra-ui/react'

const NewNetworkingPage: NextPageWithLayout = () => (
  <>
    <Heading>Create Network</Heading>
    <CreateNetworking />
  </>
)

NewNetworkingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NewNetworkingPage
