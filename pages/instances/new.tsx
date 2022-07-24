import { ReactElement } from 'react'
import Layout from '../../components/layout'
import { InstancesCreate } from '../../features/instances/create'
import type { NextPageWithLayout } from '../_app'

const NewInstancePage: NextPageWithLayout = () => {
  return <InstancesCreate />
}

NewInstancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NewInstancePage
