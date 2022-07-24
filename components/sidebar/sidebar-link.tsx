import { ReactNode } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  href: string
}

const SiderbarLink = ({ children, href }: Props) => {
  const router = useRouter()
  const isActive =
    router.asPath.split('/')[1] === href.split('/')[1] ? true : false
  const bg = isActive ? 'gray.50' : ''
  const fontWeight = isActive ? '500' : '400'
  const hover = {
    _hover: { bg: isActive ? 'rgba(250,250,250,.2);' : 'gray.100' },
  }

  return (
    <NextLink href={href} passHref>
      <Link variant="sidebar" bg={bg} _hover={hover} fontWeight={fontWeight}>
        {children}
      </Link>
    </NextLink>
  )
}

export default SiderbarLink
