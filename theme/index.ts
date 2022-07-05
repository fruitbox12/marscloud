import { extendTheme } from "@chakra-ui/react"
import colors from "./colors"
import Text from "./components/text"
import Accordion from "./components/accordion"
import Link from "./components/link"
import Tabs from "./components/tabs"

const theme = extendTheme({
  colors,
  components: {
    Text,
    Accordion,
    Link,
    Tabs,
  },
})

export default theme
