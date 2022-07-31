import { Button, Stack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { ErrorResponse } from '../../../../infra/errors'
import { useAppSelector } from '../../../../store/hook'
import { Instance } from '../../types'
import SelectImage from './select-image'
import SelectNetwork from './select-network'
import SelectPlan from './select-plan'

const InstancesCreate = () => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>()
  const name = useAppSelector((state) => state.ui.createInstance.name)
  const image = useAppSelector((state) => state.ui.createInstance.image)
  const plan = useAppSelector((state) => state.ui.createInstance.plan)

  const handleCreate = useCallback(async () => {
    if (!name || !image || !plan) {
      return
    }
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/containers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            image: image.id,
            plan: plan.id,
          }),
        }
      )
      if (response.ok) {
        const instance: Instance = await response.json()
        toast({
          title: `Instance '${instance.name}' created.`,
          description: 'The list will be refreshed automatically.',
          status: 'success',
          isClosable: true,
        })
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/containers`)
        router.push('/instances')
      } else {
        const result: ErrorResponse = await response.json()
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
    }
    setIsLoading(false)
  }, [name, image, plan])

  return (
    <Stack spacing={16}>
      <SelectImage />
      <SelectPlan />
      <Button
        w="full"
        colorScheme="green"
        isLoading={isLoading}
        onClick={handleCreate}
      >
        Create Instance
      </Button>
    </Stack>
  )
}

export default InstancesCreate
