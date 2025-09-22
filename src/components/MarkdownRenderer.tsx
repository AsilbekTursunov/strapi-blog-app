import ReactMarkdown from "react-markdown";
import {
  Box,
  Text,
  Heading,
  Link,
  Code,
} from "@chakra-ui/react";

export default function MarkdownRenderer({ content, clamp = 4 }: { content: string, clamp?: number }) {
  return (
    <Box as={'div'} lineClamp={clamp} overflowX="scroll">
      <ReactMarkdown 
        components={{
          h1: ({ node, ...props }) => (
            <Heading as="h1" size="2xl" my={4} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <Heading as="h2" size="xl" my={3} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <Heading as="h3" size="lg" my={2} {...props} />
          ),
          p: ({ node, ...props }) => <Text as={'p'} my={2} {...props} />,
          a: ({ node, ...props }) => (
            <Link color="blue.500" textDecoration="underline" {...props} />
          ),
          code: ({ node, ...props }) => (
            <Code marginBottom={3} textWrap={'wrap'} p={3} borderRadius="md" fontSize="sm" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
