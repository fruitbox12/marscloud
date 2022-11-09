import { Box, HStack, LinkBox, LinkOverlay, useToken } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type Props = {
  href: string
  icon: ReactNode
  children: ReactNode
}

const SidebarItem = ({ href, icon, children }: Props) => {
  const router = useRouter()
  const [pink500, gray500] = useToken('colors', ['pink.500', 'gray.500'])
  const isActive =
    router.asPath.split('/')[1] === href.split('/')[1] ? true : false
  const fontColor = isActive ? 'pink.500' : ''
  const iconColor = isActive ? pink500 : gray500

  return (
    <LinkBox>
      <HStack
        px={3}
        py={2}
        spacing={5}
        _hover={{ bg: 'gray.50' }}
        borderRadius="10px"
        cursor="pointer"
      >
        <Box color={iconColor} fontSize="18px">
          {icon}
        </Box>
        <NextLink href={href} passHref>
          <LinkOverlay href={href} color={fontColor} fontWeight="500">
            {children}
          </LinkOverlay>
        </NextLink>
      </HStack>
    </LinkBox>
  )
}

export default SidebarItem
