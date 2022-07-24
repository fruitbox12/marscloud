import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Instance } from '../../../types'
import { FiMoreVertical } from 'react-icons/fi'
import { useCallback } from 'react'

type Props = {
  instances: Instance[]
}

const InstancesTable = ({ instances }: Props) => {
  const handleDelete = useCallback((instance: Instance) => {}, [])

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Image</Th>
          <Th>Plan</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {instances.map((instance: Instance) => (
          <Tr key={instance.id}>
            <Td>{instance.name}</Td>
            <Td>{instance.image}</Td>
            <Td>{instance.plan}</Td>
            <Td textAlign="right">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical fontSize="16px" />}
                  variant="ghost"
                  aria-label=""
                />
                <MenuList>
                  <MenuItem color="red" onClick={() => handleDelete(instance)}>
                    Decline
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default InstancesTable
