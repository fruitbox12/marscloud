import { useMemo, useCallback } from 'react'
import {
  Stack,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Flex,
  VStack,
  Grid,
  Text,
  Center,
  Spinner,
  HStack,
} from '@chakra-ui/react'
import useSWR from 'swr'
import fetcher from '../../../../../infra/fetcher'
import { Plan, PlanGroup } from '../../../../plans/types'
import { useAppDispatch, useAppSelector } from '../../../../../store/hook'
import { planUpdated } from '../../slices/create-instance'

const SelectPlan = () => {
  const { data } = useSWR<PlanGroup[]>('/api/plans', fetcher)
  const basicPlanGroup = useMemo<PlanGroup | undefined>(() => {
    if (data && data.length > 0) {
      return data.find((planGroup) => planGroup.id === 'basic')
    }
  }, [data])
  const activePlan = useAppSelector((state) => state.ui.createInstance.plan)
  const dispatch = useAppDispatch()

  const handlePlanCardClick = useCallback((plan: Plan) => {
    dispatch(planUpdated(plan.id))
  }, [])

  if (!data || !basicPlanGroup) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  return (
    <Stack spacing={5}>
      <Heading size="lg" color="gray.700">
        Select a plan
      </Heading>
      <Tabs variant="selectPlan">
        <TabList>
          <Grid templateColumns="1fr 4fr" gap={6} w="100%">
            <Flex flexDirection="column" w="100%">
              <Text>Shared CPU</Text>
              <Grid templateColumns="repeat(1, 1fr)" w="100%">
                <Tab>{basicPlanGroup.name}</Tab>
              </Grid>
            </Flex>
            {data.length > 1 && (
              <Flex flexDirection="column" w="100%">
                <Text>Dedicated CPU</Text>
                <Grid
                  templateColumns={`repeat(${data.length - 1}, 1fr)`}
                  w="100%"
                >
                  {data.slice(1).map((planGroup) => (
                    <Tab key={planGroup.id}>{planGroup.name}</Tab>
                  ))}
                </Grid>
              </Flex>
            )}
          </Grid>
        </TabList>
        <TabPanels>
          {data.map((planGroup) => (
            <TabPanel key={planGroup.id}>
              <Stack spacing={9}>
                <Text color="gray.600">{planGroup.description}</Text>
                <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={6}>
                  {planGroup.plans.map((plan) => (
                    <Box
                      key={plan.id}
                      border="1px"
                      borderColor={
                        plan.id === activePlan ? 'blue.500' : 'gray.300'
                      }
                      fontSize="14px"
                      color="gray.600"
                      onClick={() => handlePlanCardClick(plan)}
                      cursor="pointer"
                      bg="white"
                    >
                      <VStack
                        py={3}
                        w="100%"
                        spacing={0}
                        bg={plan.id === activePlan ? 'blue.50' : 'gray.50'}
                        borderBottom="1px"
                        borderColor={
                          plan.id === activePlan ? 'blue.500' : 'gray.300'
                        }
                      >
                        <Text>
                          $
                          <Text
                            as="span"
                            color="gray.900"
                            fontSize="22px"
                            fontWeight="bold"
                          >
                            {plan.monthlyPrice}
                          </Text>
                          /mo
                        </Text>
                        <Text>
                          $
                          <Text as="span" color="gray.900">
                            {plan.hourlyPrice}
                          </Text>
                          /hour
                        </Text>
                      </VStack>
                      <VStack py={3} spacing={1}>
                        <HStack spacing={1}>
                          <Text>
                            {plan.memory.value} {plan.memory.unit}
                          </Text>
                          <Text color="gray.400">
                            / {plan.cpu.value} {plan.cpu.type}{' '}
                            {plan.cpu.value > 1 ? `CPUs` : `CPU`}
                          </Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Text>
                            {plan.storage.value} {plan.storage.unit}
                          </Text>
                          <Text color="gray.400">{plan.storage.type}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Text>
                            {plan.transfer.value} {plan.transfer.unit}
                          </Text>
                          <Text color="gray.400">transfer</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </Grid>
              </Stack>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

export default SelectPlan
