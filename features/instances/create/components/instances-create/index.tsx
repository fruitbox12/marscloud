import { Stack } from '@chakra-ui/react'
import SelectImage from '../select-image'
import SelectPlan from '../select-plan'

const InstancesCreate = () => {
  return (
    <Stack spacing={16}>
      <SelectImage />
      <SelectPlan />
    </Stack>
  )
}

export default InstancesCreate
