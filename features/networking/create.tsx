import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  useToast,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSWRConfig } from 'swr'
import * as Yup from 'yup'
import { Networking } from './types'

const CreateNetworking = () => {
  const toast = useToast()
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const NetworkingSchema = Yup.object().shape({
    name: Yup.string().required('Please provide the name for network'),
  })
  const handleSubmit = useCallback(
    async ({ name }, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      try {
        const response = await fetch('/api/networking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        })
        if (response.ok) {
          const network: Networking = await response.json()
          toast({
            title: `Network ${network.name} created`,
            description: 'The list will be refreshed automatically',
            status: 'success',
            isClosable: true,
          })
          mutate('/api/networking')
          router.push('/networking')
          resetForm()
        } else {
          toast({
            title: 'Failed to create network',
            description: 'Unexpected error',
            status: 'error',
            isClosable: true,
          })
        }
      } catch (e) {
        toast({
          title: 'Failed to create network',
          description: 'Please try later',
          status: 'error',
          isClosable: true,
        })
      } finally {
        setSubmitting(false)
      }
    },
    []
  )

  return (
    <Box maxWidth="600px">
      <Formik
        initialValues={{ name: '' }}
        validationSchema={NetworkingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <Field name="name">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  isRequired
                >
                  <FormLabel mb={5}>Network's name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Name"
                    isDisabled={isSubmitting}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={5}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Create Network
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default CreateNetworking
