import { ReactElement, ReactNode } from "react"
import type { AppProps } from "next/app"
import type { NextPage } from "next"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import store from "../store"
import theme from "../theme"
import "../styles/globals.css"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>Mars Cloud</title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
