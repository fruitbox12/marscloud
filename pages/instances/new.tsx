import { ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'
import Layout from '../../components/layout'
import type { NextPageWithLayout } from '../_app'
import { SelectOSImage, SelectPlan } from '../../features/instances/create'

const NewInstancePage: NextPageWithLayout = () => {
  return (
    <Stack spacing={16}>
      <SelectOSImage />
      <SelectPlan />
    </Stack>
  )
}

NewInstancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default NewInstancePage
