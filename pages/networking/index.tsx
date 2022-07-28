import { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'
import NetworkingList from '../../features/networking/list'
import { Heading } from '@chakra-ui/react'

const NetworkingPage: NextPageWithLayout = () => (
  <>
    <Heading>Networking</Heading>
    <NetworkingList />
  </>
)

NetworkingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NetworkingPage
