import { useState, useEffect } from "react";
import {
  Box,
  Center,
  Image,
  Spinner,
  Text,
  Stack,
  Button,
  Input,
  Textarea,
  Flex,
  useColorMode, // Add this import
} from "@chakra-ui/react";
import axios from "axios";

// Set axios defaults
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const initialProfile = {
  fullName: "",
  email: "",
  profilePicture: "",
  bio: "",
  role: "",
};

export default function ProfileCard() {
  const { colorMode } = useColorMode(); // Add this hook
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        if (response.data.success) {
          setProfile(response.data.user);
          setEditedProfile(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      let uploadedImageUrl = profile.profilePicture;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("profilePicture", selectedImage);

        const imageResponse = await axios.post(
          "/api/profile/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (imageResponse.data.success) {
          uploadedImageUrl = imageResponse.data.imageUrl;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const updatedProfile = {
        ...editedProfile,
        profilePicture: uploadedImageUrl,
      };

      const response = await axios.put("/api/profile", updatedProfile, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setProfile(response.data.user);
        setEditedProfile(response.data.user);
        setSelectedImage(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center py={12}>
      <Box
        p={6}
        maxW={"500px"}
        w={"full"}
        bg={colorMode === "light" ? "white" : "gray.800"} // Dynamic background
        color={colorMode === "light" ? "gray.800" : "white"} // Dynamic text color
        boxShadow={"lg"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        transition="all 0.3s ease"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "xl",
        }}
      >
        <Flex align={"center"} direction={"column"}>
          <Box
            rounded={"full"}
            overflow={"hidden"}
            height={"150px"}
            width={"150px"}
            boxShadow={"md"}
            mb={4}
            bg={colorMode === "light" ? "gray.100" : "gray.700"} // Dynamic image container bg
          >
            {loading ? (
              <Spinner size="xl" />
            ) : selectedImage ? (
              <Image
                height={"full"}
                width={"full"}
                objectFit={"cover"}
                src={URL.createObjectURL(selectedImage)}
                alt="Profile Preview"
              />
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
                bg={colorMode === "light" ? "gray.200" : "gray.600"} // Dynamic no-image bg
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text>No Image</Text>
              </Box>
            )}
          </Box>

          {isEditing && (
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              mt={2}
              size="sm"
            />
          )}

          <Stack align={"center"} spacing={2}>
            {isEditing ? (
              <Input
                value={editedProfile.fullName}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    fullName: e.target.value,
                  })
                }
                fontSize={"2xl"}
                fontWeight={600}
                textAlign={"center"}
                bg={colorMode === "light" ? "white" : "gray.700"} // Dynamic input bg
              />
            ) : (
              <Text fontSize={"2xl"} fontWeight={600}>
                {profile.fullName || "No Name Provided"}
              </Text>
            )}
            {isEditing ? (
              <Textarea
                value={editedProfile.bio}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, bio: e.target.value })
                }
                fontSize={"md"}
                textAlign={"center"}
                bg={colorMode === "light" ? "white" : "gray.700"} // Dynamic textarea bg
              />
            ) : (
              <Text
                color={colorMode === "light" ? "gray.500" : "gray.400"} // Dynamic bio color
                fontSize={"md"}
                textAlign={"center"}
              >
                {profile.bio || "No Bio Provided"}
              </Text>
            )}
          </Stack>

          {error && (
            <Text color="red.500" mt={2}>
              {error}
            </Text>
          )}

          {isEditing ? (
            <Button
              mt={6}
              colorScheme="green"
              size="md"
              rounded="full"
              px={6}
              onClick={handleSave}
              isLoading={loading}
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
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Flex>
      </Box>
    </Center>
  );
}
