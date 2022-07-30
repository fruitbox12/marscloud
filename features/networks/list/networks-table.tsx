import { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { FiMoreVertical } from 'react-icons/fi'
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react'
import { Network, Configs } from '../types'
import { ErrorResponse } from '../../../infra/errors'

type Props = {
  networks: Network[]
}

const NetworksTable = ({ networks }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState<Network>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { mutate } = useSWRConfig()

  const handleDelete = useCallback(async () => {
    if (!active) {
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/networks/${active.id}`,
        {
          method: 'DELETE',
        }
      )
      if (response.ok) {
        toast({
          title: 'Network delete.',
          description: 'The list will be refreshed automatically.',
          status: 'success',
          isClosable: true,
        })
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/networks`)
      } else {
        const errorResponse: ErrorResponse = await response.json()
        if (errorResponse) {
          toast({
            title: 'Network deletion failed.',
            description: errorResponse.errors.join('\n'),
            status: 'error',
            isClosable: true,
          })
        } else {
          toast({
            title: 'Network deletion failed.',
            description: 'Unspecified eror',
            status: 'error',
            isClosable: true,
          })
        }
      }
    } catch (e) {
      toast({
        title: 'Network deletion failed.',
        description: 'Please try again later',
        status: 'error',
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
      onClose()
    }
  }, [active])

  const handleMenuDeleteItem = useCallback((network: Network) => {
    setActive(network)
    onOpen()
  }, [])

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Ipv6</Th>
              <Th>Configs</Th>
              <Th>Created</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {networks.map((network: Network) => (
              <Tr key={network.id}>
                <Td>{network.name}</Td>
                <Td>{network.ipv6}</Td>
                <Td>
                  {network.configs &&
                    network.configs.map((config: Configs, index) => (
                      <Box key={index}>
                        <Box>{config.subnet}</Box>
                        <Box>{config.gateway}</Box>
                      </Box>
                    ))}
                </Td>
                <Td>{network.createTime}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FiMoreVertical fontSize="16px" />}
                      variant="ghost"
                      aria-label=""
                    />
                    <MenuList>
                      <MenuItem
                        color="red"
                        onClick={() => handleMenuDeleteItem(network)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this network?</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              isDisabled={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NetworksTable
