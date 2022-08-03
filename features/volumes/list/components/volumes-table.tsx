import { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
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
  Text,
} from '@chakra-ui/react'
import { Volume } from '../../../volumes/types'
import { FiMoreVertical } from 'react-icons/fi'
import { ErrorResponse } from '../../../../infra/errors'

type Props = {
  volumes: Volume[]
}

const VolumesTable = ({ volumes }: Props) => {
  const { mutate } = useSWRConfig()
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/volumes/${active.name}`,
        {
          method: 'DELETE',
        }
      )
      if (response.ok) {
        toast({
          title: 'Volume deleted.',
          description: 'The list will be refreshed automatically.',
          status: 'success',
          isClosable: true,
        })
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/volumes`)
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
              <Th maxW="200px">Name</Th>
              <Th>Size</Th>
              <Th>Size pretty</Th>
              <Th>In use</Th>
              <Th>Created</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {volumes.map((volume: Volume, index) => (
              <Tr key={index}>
                <Td maxW="200px">
                  <Text
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {volume.name}
                  </Text>
                </Td>
                <Td>{volume.size}</Td>
                <Td>{volume.sizePretty}</Td>
                <Td>{volume.inUse}</Td>
                <Td>{volume.createTime}</Td>
                <Td textAlign="right">
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      role="button"
                      icon={<FiMoreVertical fontSize="16px" />}
                      variant="ghost"
                      aria-label={`menu-button-${volume.name}`}
                    />
                    <MenuList>
                      <MenuItem
                        color="red"
                        aria-label={`menu-item-${volume.name}`}
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
