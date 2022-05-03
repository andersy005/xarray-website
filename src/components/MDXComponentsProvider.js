import {
  Box,
  Alert,
  Code,
  Heading,
  Link,
  Text,
  Divider,
  useColorMode,
  Stack,
} from "@chakra-ui/react"
import NextLink from "next/link"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { MDXProvider } from "@mdx-js/react"
const CustomLink = (props) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link {...props} />
      </NextLink>
    )
  }

  return <Link isExternal {...props} />
}

const Quote = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = {
    light: "blue.50",
    dark: "blue.900",
  }

  return (
    <Alert
      mt={4}
      w="98%"
      bg={bgColor[colorMode]}
      variant="left-accent"
      status="info"
      css={{
        "> *:first-of-type": {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  )
}

const DocsHeading = (props) => (
  <Heading
    css={{
      scrollMarginTop: "100px",
      scrollSnapMargin: "100px",
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]:before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`,
      },
      "&[id]:hover a": { opacity: 1 },
    }}
    {...props}
    mb="1em"
    mt="2em"
  >
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: "outline",
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
)

const Hr = () => {
  const { colorMode } = useColorMode()
  const borderColor = {
    light: "gray.200",
    dark: "gray.600",
  }

  return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />
}

function CustomCode({ className, ...props }) {
  const match = /language-(\w+)/.exec(className || "")

  return match ? (
    <Stack>
      <SyntaxHighlighter
        language={match[1]}
        PreTag="div"
        {...props}
        style={nord}
        wrapLongLines={true}
        showLineNumbers={false} // enable this once https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/402 has been fixed
      />
    </Stack>
  ) : (
    <Stack>
      <SyntaxHighlighter
        PreTag="div"
        {...props}
        style={nord}
        wrapLongLines={true}
      />
    </Stack>
  )
}

const mdxComponents = {
  h1: (props) => <Heading as="h1" size="2xl" my={4} {...props} />,
  h2: (props) => <DocsHeading as="h2" size="lg" fontWeight="bold" {...props} />,
  h3: (props) => <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />,
  h4: (props) => <DocsHeading as="h4" size="sm" fontWeight="bold" {...props} />,
  h5: (props) => <DocsHeading as="h5" size="sm" fontWeight="bold" {...props} />,
  h6: (props) => <DocsHeading as="h6" size="xs" fontWeight="bold" {...props} />,
  inlineCode: (props) => <Code fontSize="0.84em" {...props} />,
  code: (props) => <CustomCode {...props} />,
  br: (props) => <Box height="24px" {...props} />,
  hr: (props) => <Hr {...props} />,
  a: (props) => <CustomLink color={"blue.400"} {...props} />,
  p: (props) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote,
}

function MDXComponentsProvider(props) {
  return (
    <MDXProvider components={mdxComponents}>
      <Box {...props} />
    </MDXProvider>
  )
}
export { CustomLink }
export default MDXComponentsProvider
