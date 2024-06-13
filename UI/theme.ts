import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
import { Text } from "./Text";
import { Heading } from "./heading";
import { customInput as Input } from "./Input"; // Corrected the casing of the file name
import { Textarea } from "./TextArea";

const theme = extendTheme({
  components: {
    Button,
    Text,
    Heading,
    Input,
    Textarea,
  },
});

export default theme;
