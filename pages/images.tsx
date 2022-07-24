import { ReactElement } from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app'

const ImagesPage: NextPageWithLayout = () => {
  return <p>Images</p>
}

ImagesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ImagesPage
