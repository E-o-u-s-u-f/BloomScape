import { useState } from "react";
import {
  Button,
  Badge,
  Box,
  Heading,
  Flex,
  Container,
  Text,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const samplePosts = [
  {
    id: 1,
    user: "John Doe",
    content: "This is my first post!",
    image: "https://via.placeholder.com/150",
    status: "pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    content: "Hello world!",
    image: "https://via.placeholder.com/150",
    status: "pending",
  },
  {
    id: 3,
    user: "Alice Johnson",
    content: "React is amazing!",
    image: "https://via.placeholder.com/150",
    status: "pending",
  },
];

export default function AdminPostApproval() {
  const [posts, setPosts] = useState(samplePosts);
  const { colorMode } = useColorMode();

  const updatePostStatus = (id, status) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Container
      maxW="container.md"
      p={6}
      bg={colorMode === "light" ? "gray.50" : "gray.700"}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading
        size="lg"
        mb={6}
        textAlign="center"
        color={colorMode === "light" ? "blue.600" : "blue.300"}
      >
        Post Approval Panel
      </Heading>
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            p={4}
            mb={4}
            bg={colorMode === "light" ? "white" : "gray.600"}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {post.user}
            </Text>
            <Image
              src={post.image}
              alt="Post Image"
              borderRadius="md"
              boxSize="200px"
              objectFit="cover"
              mb={3}
            />
            <Text mb={3}>{post.content}</Text>
            <Badge
              px={3}
              py={1}
              borderRadius="full"
              fontSize="0.9em"
              colorScheme={
                post.status === "approved"
                  ? "green"
                  : post.status === "rejected"
                  ? "red"
                  : "yellow"
              }
            >
              {post.status}
            </Badge>
            {post.status === "pending" && (
              <Flex gap={3} mt={3}>
                <Button
                  colorScheme="green"
                  size="sm"
                  leftIcon={<CheckIcon />}
                  onClick={() => updatePostStatus(post.id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  leftIcon={<CloseIcon />}
                  onClick={() => updatePostStatus(post.id, "rejected")}
                >
                  Reject
                </Button>
              </Flex>
            )}
          </Box>
        </motion.div>
      ))}
    </Container>
  );
}
