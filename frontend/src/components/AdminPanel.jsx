import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Badge,
  Box,
  Heading,
  Flex,
  Container,
  Text,
  Image,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function AdminPostApproval() {
  const location = useLocation();
  const postData = location.state?.postData;
  const [posts, setPosts] = useState(postData ? [postData] : []);
  const toast = useToast();

  // ✅ Fetch posts from backend when page loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/multiple/cloud");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
  
        // ✅ Filter only posts that are NOT approved yet
        const unapprovedPosts = data.filter((post) => !post.adminStatus);
        setPosts(unapprovedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);
  

  const updatePostStatus = async (id, status) => {
    try {
      let response;
    
      if (status === "rejected") {
        // ❌ Send DELETE request to delete the post
        response = await fetch(`http://localhost:5000/api/multiple/cloud/${id}`, {
          method: "DELETE",  
        });
  
        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== id)); 
          toast({
            title: "Post Rejected & Deleted",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      } else {
        // ✅ Approve the post (update adminStatus to true)
        response = await fetch(`http://localhost:5000/api/multiple/cloud/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, adminApproved: true }),
        });
  
        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== id));
          toast({
            title: "Post Approved",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
  
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Network error!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Container maxW="container.md" p={6} bg="gray.50" borderRadius="md" boxShadow="lg">
      <Heading size="lg" mb={6} textAlign="center" color="blue.600">
        Post Approval Panel
      </Heading>
      {posts.length === 0 ? (
        <Text textAlign="center" color="gray.500">No posts available.</Text>
      ) : (
        posts.map((post, index) => (
          <Box key={index} p={4} mb={4} bg="white" borderRadius="md" boxShadow="md">
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {post.profileName}
            </Text>
            <Image
              src={post.image[0] ? post.image[0].url : "https://via.placeholder.com/150"}
              alt="Post Image"
              borderRadius="md"
              boxSize="200px"
              objectFit="cover"
              mb={3}
            />
            <Text mb={3}>{post.content}</Text>
            <Badge px={3} py={1} borderRadius="full" fontSize="0.9em" colorScheme={post.status === "approved" ? "green" : post.status === "rejected" ? "red" : "yellow"}>
              {post.status || "Pending"}
            </Badge>
            <Flex gap={3} mt={3}>
              <Button colorScheme="green" size="sm" leftIcon={<CheckIcon />} onClick={() => updatePostStatus(post._id, "approved")}>
                Approve
              </Button>
              <Button colorScheme="red" size="sm" leftIcon={<CloseIcon />} onClick={() => updatePostStatus(post._id, "rejected")}>
                Reject
              </Button>
            </Flex>
          </Box>
        ))
      )}
    </Container>
  );
}
