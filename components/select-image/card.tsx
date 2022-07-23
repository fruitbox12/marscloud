import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { OSImage } from "../../types"
import Icon from "./icon"

type Props = {
  image: OSImage
  version?: string
  isActive?: boolean
  onClick?: () => void
  onChange?: (image: OSImage, version?: string) => void
}

const Card = ({
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
    onChange?.(image, version)
  }, [])

  const handleChange = useCallback((version: string) => {
    setVersion(version)
    onChange?.(image, version)
  }, [])

  return (
    <Box bg="white">
      <Flex
        direction="column"
        alignItems="center"
        onClick={handleClick}
        border="1px"
        borderColor={isActive ? "blue.500" : "gray.300"}
        pt={3}
        color={isActive ? "blue.500" : "gray.400"}
        cursor="pointer"
      >
        <Icon value={image.id} fontSize="38px" />
        <Box my={4} userSelect="none">
          {image.name}
        </Box>
        <Menu>
          <MenuButton w="100%" as={Button}>
            {version || "Select version"}
          </MenuButton>
          <MenuList>
            {image.versions.map((version, index) => (
              <MenuItem key={index} onClick={() => handleChange(version)}>
                {version}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default Card
