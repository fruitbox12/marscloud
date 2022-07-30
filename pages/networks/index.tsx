import { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'
import NetworksList from '../../features/networks/list/network-list'
import { Heading } from '@chakra-ui/react'

const NetworksPage: NextPageWithLayout = () => (
  <>
    <Heading>Networks</Heading>
    <NetworksList />
  </>
)

NetworksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NetworksPage
