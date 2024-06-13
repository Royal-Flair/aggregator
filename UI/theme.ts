import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
import { Text } from "./Text";
import { Heading } from "./heading";
import { Input } from "./Input";
import { Textarea } from "./TextArea";

const theme = extendTheme({
  components: {
    Button: Button,
    Text: Text,
    Heading: Heading,
    Input: Input,
    Textarea: Textarea,
  },
});

export default theme;