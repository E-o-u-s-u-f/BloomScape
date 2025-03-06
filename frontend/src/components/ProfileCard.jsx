import { useState, useEffect } from "react";
import { Box, Center, useColorModeValue, Heading, Text, Stack, Image, Button, Flex, Input, Textarea, Spinner } from "@chakra-ui/react";
import { FaFacebookF, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import axios from "axios";

// Initial empty profile structure based on the backend data structure
const initialProfile = {
  fullName: "",
  email: "",
  profilePicture: "",
  bio: "",
  role: "",
  isVerified: false,
  createdAt: null,
  updatedAt: null,
};

export default function ProfileCard() {
  const [profile, setProfile] = useState(initialProfile);  // Initialize with empty profile
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(initialProfile);  // Initially use empty profile
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken"); // Assuming you store token in localStorage
        console.log("Token: ", token); // Log token to ensure it's being fetched

        const response = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response Data: ", response.data);  // Log the response data

        if (response.data.success) {
          console.log("Profile Data: ", response.data.user);  // Log the profile data
          setProfile(response.data.user);  // Set the fetched profile data to state
          setEditedProfile(response.data.user);  // Set the same data for editing
        } else {
          console.log("Profile fetch failed, setting to initial profile.");
          setProfile(initialProfile);  // If no data, reset to initialProfile
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(initialProfile);  // If error, reset to initialProfile
      } finally {
        setLoading(false);  // Stop loading after fetch attempt
      }
    };

    fetchProfile(); // Fetch the profile on component mount
  }, []); // Empty dependency array to only run on component mount

  // Log the profile data when it's updated
  console.log("Current Profile: ", profile);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.put("/api/profile", editedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setProfile(response.data.user);  // Update profile after save
        setIsEditing(false);
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <Center py={12}>
      <Box
        p={6}
        maxW={"500px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        transition="all 0.3s ease"
        _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
      >
        <Flex align={"center"} direction={"column"}>
          {/* Profile Image */}
          <Box
            rounded={"full"}
            overflow={"hidden"}
            height={"150px"}
            width={"150px"}
            boxShadow={"md"}
            mb={4}
          >
            {loading ? (
              <Spinner size="xl" />
            ) : profile.profilePicture ? (
              <Image
                height={"full"}
                width={"full"}
                objectFit={"cover"}
                src={profile.profilePicture}
                alt="Profile"
              />
            ) : (
              <Box
                height={"full"}
                width={"full"}
                bg={"gray.200"}
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text>No Image</Text>
              </Box>
            )}
          </Box>

          {/* Profile Details */}
          <Stack align={"center"} spacing={2}>
            {isEditing ? (
              <Input
                value={editedProfile.fullName}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, fullName: e.target.value })
                }
                fontSize={"2xl"}
                fontWeight={600}
                textAlign={"center"}
              />
            ) : (
              <Heading fontSize={"2xl"} fontWeight={600}>
                {profile.fullName || "No Name Provided"}
              </Heading>
            )}
            {isEditing ? (
              <Textarea
                value={editedProfile.bio}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    bio: e.target.value,
                  })
                }
                fontSize={"md"}
                textAlign={"center"}
              />
            ) : (
              <Text color={"gray.500"} fontSize={"md"} textAlign={"center"}>
                {profile.bio || "No Bio Provided"}
              </Text>
            )}
          </Stack>

          {/* Social Media Links */}
          {profile.socialLinks ? (
            <Flex mt={4} gap={4}>
              {profile.socialLinks.instagram && (
                <Button
                  as="a"
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  colorScheme="pink"
                  size="sm"
                  rounded="full"
                >
                  <FaSquareInstagram />
                </Button>
              )}
              {profile.socialLinks.facebook && (
                <Button
                  as="a"
                  href={profile.socialLinks.facebook}
                  target="_blank"
                  colorScheme="blue"
                  size="sm"
                  rounded="full"
                >
                  <FaFacebookF />
                </Button>
              )}
              {profile.socialLinks.twitter && (
                <Button
                  as="a"
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  colorScheme="gray"
                  size="sm"
                  rounded="full"
                >
                  <FaXTwitter />
                </Button>
              )}
            </Flex>
          ) : (
            <Text color={"gray.500"} fontSize={"sm"} textAlign={"center"}>
              No social links available
            </Text>
          )}

          {/* Edit Profile Button */}
          {isEditing ? (
            <Button
              mt={6}
              colorScheme="green"
              size="md"
              rounded="full"
              px={6}
              onClick={handleSave}
            >
              Save Profile
            </Button>
          ) : (
            <Button
              mt={6}
              colorScheme="blue"
              size="md"
              rounded="full"
              px={6}
              _hover={{ bg: "blue.600" }}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )}
        </Flex>
      </Box>
    </Center>
  );
}
