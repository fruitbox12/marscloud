import React from 'react'
import { Button, Container, Grid, GridItem } from '@chakra-ui/react'
import Sidebar from './sidebar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Grid h="100vh" templateRows="70px 1fr" templateColumns="200px 1fr">
      <GridItem colSpan={1} rowSpan={2}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={1} placeSelf="center end">
        <Button as="a" href="/instances/new" colorScheme="green" mx={5}>
          Create Instance
        </Button>
      </GridItem>
      <GridItem colSpan={1} bg="gray.50">
        <Container maxW="1200px" py={10} px={4}>
          {children}
        </Container>
      </GridItem>
    </Grid>
  </>
)

export default Layout
