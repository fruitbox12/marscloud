import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout'
import CreateNetwork from '../../features/networks/create'
import { Heading } from '@chakra-ui/react'

const NewNetworksPage: NextPageWithLayout = () => (
  <>
    <Heading>Create Network</Heading>
    <CreateNetwork />
  </>
)

NewNetworksPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NewNetworksPage
