import { useCallback, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Volume } from '../../../volumes/types'
import { FiMoreVertical } from 'react-icons/fi'

type Props = {
  volumes: Volume[]
}

const VolumesTable = ({ volumes }: Props) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState<Volume>()
  const [isLoading, setIsLoading] = useState<boolean>()

  const handleDelete = useCallback(async () => {
    if (!active) {
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch(`/api/volume/${active.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        toast({
          title: 'Volume deleted.',
          description: 'The list will be refreshed automatically.',
          status: 'success',
          isClosable: true,
        })
      } else {
        const errorResponse = await response.json()
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
    } finally {
      onClose()
      setIsLoading(false)
    }
  }, [active])

  const handleMenuItemDelete = useCallback((volume: Volume) => {
    setActive(volume)
    onOpen()
  }, [])

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>size</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {volumes.map((volume: Volume) => (
              <Tr key={volume.id}>
                <Td>{volume.name}</Td>
                <Td>{volume.size}</Td>
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
                        onClick={() => handleMenuItemDelete(volume)}
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
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this volume?</ModalBody>
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
    </div>
  )
}

export default VolumesTable
