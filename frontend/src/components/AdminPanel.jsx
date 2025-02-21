import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Box,
  Heading,
  Flex,
  Container,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const samplePosts = [
  {
    id: 1,
    user: "John Doe",
    content: "This is my first post!",
    status: "pending",
  },
  { id: 2, user: "Jane Smith", content: "Hello world!", status: "pending" },
  {
    id: 3,
    user: "Alice Johnson",
    content: "React is amazing!",
    status: "pending",
  },
];

export default function AdminPostApproval() {
  const [posts, setPosts] = useState(samplePosts);

  const updatePostStatus = (id, status) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, status } : post))
    );
  };

  return (
    <Container
      maxW="container.lg"
      p={6}
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading size="lg" mb={6} textAlign="center" color="blue.600">
        Post Approval Panel
      </Heading>
      <Table
        variant="striped"
        colorScheme="blue"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
      >
        <Thead bg="blue.500">
          <Tr>
            <Th color="white">User</Th>
            <Th color="white">Content</Th>
            <Th color="white">Status</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <Tr key={post.id}>
              <Td fontWeight="bold">{post.user}</Td>
              <Td>{post.content}</Td>
              <Td>
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
              </Td>
              <Td>
                {post.status === "pending" && (
                  <Flex gap={3}>
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
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}
