import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Text from "./components/text";
import Accordion from "./components/accordion";

const theme = extendTheme({
  colors,
  components: {
    Text,
    Accordion,
  },
});

export default theme;
