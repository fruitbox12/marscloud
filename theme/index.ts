import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import Text from './components/text'
import Accordion from './components/accordion'
import Link from './components/link'
import Tabs from './components/tabs'
import Menu from './components/menu'
import Button from './components/button'

const theme = extendTheme({
  colors,
  components: {
    Text,
    Accordion,
    Link,
    Tabs,
    Menu,
    Button,
  },
})

export default theme
