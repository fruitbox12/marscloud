import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Text from "./components/text";
import Accordion from "./components/accordion";
import Link from "./components/link";

const theme = extendTheme({
  colors,
  components: {
    Text,
    Accordion,
    Link,
  },
});

export default theme;
