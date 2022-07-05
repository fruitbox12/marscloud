import { ReactElement } from "react"
import {
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react"
import Layout from "../../components/layout"
import type { NextPageWithLayout } from "../_app"
import createImage from "../../public/create-instance.jpg"

const InstancesPage: NextPageWithLayout = () => {
  return (
    <Stack spacing={10}>
      <Heading as="h1">Instances</Heading>
      <Flex direction="column" alignItems="center">
        <Box boxSize="sm">
          <Image src={createImage.src} alt="create instance" />
        </Box>
        <Text>Looks like you don’t have any Droplets.</Text>
        <Button href="/instances/new" as="a" colorScheme="pink" mt={10}>
          Create instance
        </Button>
      </Flex>
    </Stack>
  )
}

InstancesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default InstancesPage
