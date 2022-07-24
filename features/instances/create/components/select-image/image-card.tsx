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
import { Image, ImageGroup } from '../../../../images'
import ImageIcon from './image-icon'

type Props = {
  group: ImageGroup
  image?: Image
  isActive?: boolean
  onClick?: () => void
  onChange?: (group: ImageGroup, image?: Image) => void
}

const ImageCard = ({
  group,
  image: propImage,
  isActive,
  onClick,
  onChange,
}: Props) => {
  const [active, setActive] = useState<Image>()

  useEffect(() => {
    setActive(propImage)
  }, [propImage])

  const handleClick = useCallback(() => {
    onClick?.()
  }, [])

  const handleChange = useCallback(
    (image: Image) => {
      setActive(image)
      onChange?.(group, image)
    },
    [group]
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
        <ImageIcon group={group.id} fontSize="38px" />
        <Box my={4} userSelect="none">
          {group.name}
        </Box>
        <Menu>
          <MenuButton w="100%" as={Button}>
            {active?.version || 'Select version'}
          </MenuButton>
          <MenuList>
            {group.images.map((image, index) => (
              <MenuItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  handleChange(image)
                }}
              >
                {image?.version}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default ImageCard
