import { ReactElement } from 'react'
import CreateVolumes from '../../features/volumes/create'
import Layout from '../../components/layout'
import type { NextPageWithLayout } from '../_app'

const NewVolumePage: NextPageWithLayout = () => <CreateVolumes />

NewVolumePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NewVolumePage
