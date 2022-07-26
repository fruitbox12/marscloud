import { ReactElement } from 'react'
import Layout from '../../components/layout'
import type { NextPageWithLayout } from '../_app'
import { Stack, Heading } from '@chakra-ui/react'
import VolumesList from '../../features/volumes/list/components/volumes-list'

const VolumesPage: NextPageWithLayout = () => {
  return (
    <Stack spacing={10}>
      <Heading as="h1">Volumes</Heading>
      <VolumesList />
    </Stack>
  )
}

VolumesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default VolumesPage
