import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { Formik, Form, Field, FormikProps, FieldProps } from 'formik'
import * as Yup from 'yup'
import {
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { Volume } from './types'

type FormValues = {
  name: string
}

const CreateVolumes = () => {
  const toast = useToast()
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const initialValues = {
    name: '',
  }

  const VolumeSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
  })

  const handleSubmit = useCallback(
    async ({ name }, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/volumes`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
            }),
          }
        )
        if (response.ok) {
          const volume: Volume = await response.json()
          toast({
            title: `Volume ${volume.name} created`,
            description: 'The list will be refreshed automatically.',
            status: 'success',
            isClosable: true,
          })
          mutate('/api/volumes')
          resetForm()
          router.push('/volumes')
        } else {
          const result = await response.json()
          if (result) {
            toast({
              title: 'Failed to create instance.',
              description: result.errors.join('\n'),
              status: 'error',
              isClosable: true,
            })
          } else {
            toast({
              title: 'Failed to create instance.',
              description: 'Unspecified error',
              status: 'error',
              isClosable: true,
            })
          }
        }
      } catch (e) {
        toast({
          title: 'Failed to create instance.',
          description: 'Please try again later.',
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
    <Stack spacing={10}>
      <Heading>Create Volume</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VolumeSchema}
      >
        {({ isSubmitting }: FormikProps<FormValues>) => (
          <Form noValidate>
            <Stack spacing={8} maxW="350px">
              <Field name="name">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      form.errors.name && form.touched.name ? true : false
                    }
                  >
                    <FormLabel>Volume's name</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Name"
                      isDisabled={isSubmitting}
                    />
                    <FormErrorMessage>
                      {form.errors.name as string}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                Create Volume
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  )
}

export default CreateVolumes
