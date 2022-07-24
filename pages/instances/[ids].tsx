import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Heading } from '@chakra-ui/react'
import Layout from '../../components/layout'
import type { NextPageWithLayout } from '../_app'

const InstancePage: NextPageWithLayout = () => {
  const router = useRouter()
  const { ids } = router.query

  return (
    <>
      <Heading>Instance {ids}</Heading>
    </>
  )
}

InstancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default InstancePage
