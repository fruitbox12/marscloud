import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useDisclosure,
  useToast,
  HStack,
  Text,
} from '@chakra-ui/react'
import { Instance } from '../../types'
import { FiMoreVertical } from 'react-icons/fi'
import { useCallback, useState } from 'react'
import { ErrorResponse } from '../../../../infra/errors'
import ImageIcon from '../../../../components/image-icon'

type Props = {
  instances: Instance[]
}

function getSpecs(instance: Instance): string {
  const { plan } = instance
  const { cpu, memory, storage, transfer } = plan
  return (
    `${cpu.value} ${cpu.type || ''} ${cpu.unit} / ` +
    `${memory.value} ${memory.unit} / ` +
    `${storage.value} ${storage.unit} / ` +
    `${transfer.value} ${transfer.unit} transfer`
  )
}

const InstancesTable = ({ instances }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [active, setActive] = useState<Instance>()
  const [isLoading, setIsLoading] = useState<boolean>()

  const handleDelete = useCallback(async () => {
    if (!active) {
      return
    }
    try {
      setIsLoading(true)
      const response = await fetch(`/api/instances/${active.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        toast({
          title: 'Instance deleted.',
          description: 'The list will be refreshed automatically.',
          status: 'success',
          isClosable: true,
        })
      } else {
        const errorResponse: ErrorResponse = await response.json()
        if (errorResponse) {
          toast({
            title: 'Instance deletion failed.',
            description: errorResponse.errors.join('\n'),
            status: 'error',
            isClosable: true,
          })
        } else {
          toast({
            title: 'Instance deletion failed.',
            description: 'Unspecified error',
            status: 'error',
            isClosable: true,
          })
        }
      }
    } catch (e) {
      toast({
        title: 'Instance deletion failed.',
        description: 'Please try again later.',
        status: 'error',
        isClosable: true,
      })
    }
    onClose()
    setIsLoading(false)
  }, [active])

  const handleMenuItemDelete = useCallback((instance: Instance) => {
    setActive(instance)
    onOpen()
  }, [])

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Specs</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {instances.map((instance: Instance) => (
            <Tr key={instance.id}>
              <Td>{instance.name}</Td>
              <Td>
                <HStack>
                  <ImageIcon group={instance.image.group} fontSize="18px" />
                  <Text>
                    {instance.image.name} {instance.image.version}
                  </Text>
                </HStack>
              </Td>
              <Td>{getSpecs(instance)}</Td>
              <Td textAlign="right">
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
                      onClick={() => handleMenuItemDelete(instance)}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this instance?</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InstancesTable
