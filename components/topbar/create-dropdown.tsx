import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToken,
  Box,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { BiCube, BiPyramid } from 'react-icons/bi'
import { useRouter } from 'next/router'

const CreateDropdown = () => {
  const [pink500, gray50] = useToken('colors', ['pink.500', 'gray.50'])
  const router = useRouter()

  return (
    <Menu autoSelect={false}>
      {({ isOpen }) => (
        <Box>
          <MenuButton
            colorScheme="pink"
            as={Button}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            Create
          </MenuButton>
          <MenuList w="300px">
            <MenuItem
              as="button"
              _hover={{ background: `${gray50}` }}
              icon={<BiPyramid fontSize="16px" color={pink500} />}
              onClick={() => router.push('/instances/new')}
            >
              <Text fontSize="14px">Instance</Text>
              <Text fontSize="12px" color="gray.500">
                Creates cloud services
              </Text>
            </MenuItem>
            <MenuItem
              as="button"
              _hover={{ background: `${gray50}` }}
              icon={<BiCube fontSize="16px" color={pink500} />}
              onClick={() => router.push('/volumes/new')}
            >
              <Text fontSize="14px">Volume</Text>
              <Text fontSize="12px" color="gray.500">
                Creates a new volume to store data in
              </Text>
            </MenuItem>
          </MenuList>
        </Box>
      )}
    </Menu>
  )
}

export default CreateDropdown
