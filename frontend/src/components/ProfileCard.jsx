import { useState, useEffect } from "react";
import { Box, Center, Image, Spinner, Text, Stack, Button, Input, Textarea, Flex } from "@chakra-ui/react";
import axios from "axios";

// Set axios defaults
axios.defaults.baseURL = "http://localhost:5000"; // Adjust if your server runs on a different port
axios.defaults.withCredentials = true; // Enable sending cookies with requests

const initialProfile = {
  fullName: "",
  email: "",
  profilePicture: "",
  bio: "",
  role: "",
};

export default function ProfileCard() {
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

        const imageResponse = await axios.post("/api/profile/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensure cookies are sent
        });

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
        withCredentials: true, // Ensure cookies are sent
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
        bg={"white"}
        boxShadow={"lg"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        transition="all 0.3s ease"
        _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
      >
        <Flex align={"center"} direction={"column"}>
          <Box rounded={"full"} overflow={"hidden"} height={"150px"} width={"150px"} boxShadow={"md"} mb={4}>
            {loading ? (
              <Spinner size="xl" />
            ) : selectedImage ? (
              <Image height={"full"} width={"full"} objectFit={"cover"} src={URL.createObjectURL(selectedImage)} alt="Profile Preview" />
            ) : profile.profilePicture ? (
              <Image height={"full"} width={"full"} objectFit={"cover"} src={profile.profilePicture} alt="Profile" />
            ) : (
              <Box height={"full"} width={"full"} bg={"gray.200"} borderRadius="full" display="flex" justifyContent="center" alignItems="center">
                <Text>No Image</Text>
              </Box>
            )}
          </Box>

          {isEditing && <Input type="file" accept="image/*" onChange={handleImageChange} mt={2} size="sm" />}

          <Stack align={"center"} spacing={2}>
            {isEditing ? (
              <Input
                value={editedProfile.fullName}
                onChange={(e) => setEditedProfile({ ...editedProfile, fullName: e.target.value })}
                fontSize={"2xl"}
                fontWeight={600}
                textAlign={"center"}
              />
            ) : (
              <Text fontSize={"2xl"} fontWeight={600}>
                {profile.fullName || "No Name Provided"}
              </Text>
            )}
            {isEditing ? (
              <Textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                fontSize={"md"}
                textAlign={"center"}
              />
            ) : (
              <Text color={"gray.500"} fontSize={"md"} textAlign={"center"}>
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
            <Button mt={6} colorScheme="green" size="md" rounded="full" px={6} onClick={handleSave} isLoading={loading}>
              Save Profile
            </Button>
          ) : (
            <Button mt={6} colorScheme="blue" size="md" rounded="full" px={6} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Flex>
      </Box>
    </Center>
  );
}