import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Image } from '../../../../image'
import ImageIcon from './image-icon'

type Props = {
  image: Image
  version?: string
  isActive?: boolean
  onClick?: () => void
  onChange?: (image: Image, version?: string) => void
}

const ImageCard = ({
  image,
  version: propVersion,
  isActive,
  onClick,
  onChange,
}: Props) => {
  const [version, setVersion] = useState<string>()

  useEffect(() => {
    setVersion(propVersion)
  }, [propVersion])

  const handleClick = useCallback(() => {
    onClick?.()
  }, [])

  const handleChange = useCallback(
    (version: string) => {
      setVersion(version)
      onChange?.(image, version)
    },
    [image]
  )

  return (
    <Box bg="white">
      <Flex
        direction="column"
        alignItems="center"
        onClick={handleClick}
        border="1px"
        borderColor={isActive ? 'blue.500' : 'gray.300'}
        pt={3}
        color={isActive ? 'blue.500' : 'gray.400'}
        cursor="pointer"
      >
        <ImageIcon value={image.id} fontSize="38px" />
        <Box my={4} userSelect="none">
          {image.name}
        </Box>
        <Menu>
          <MenuButton w="100%" as={Button}>
            {version || 'Select version'}
          </MenuButton>
          <MenuList>
            {image.versions.map((version, index) => (
              <MenuItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  handleChange(version)
                }}
              >
                {version}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default ImageCard
