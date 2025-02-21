import { useState } from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaFacebookF, FaSquareInstagram, FaXTwitter } from "react-icons/fa6";

const initialProfile = {
  name: "Eousuf Abdullah",
  image:
    "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/474483707_1191931369118124_5538215198107449011_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=1FP8Lmpr1MUQ7kNvgHihUUG&_nc_oc=AdhxFbX1ouIHepq-shPl-GM41k8L9xd_ND3yGR2GB81E8mK-PxdPlUKh1MpFJHpmsKKkKN13iys5hFEzrycV8xpI&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=AGXEqBFSit8peUjVdLhfWFI&oh=00_AYAJNuAIDFP2LJuHYFef2pVZwjn6e6-oTpvcuZT8pm7TBg&oe=67AD38EC",
  description: "Love Nature Because Nature is Beautiful.",
  socialLinks: {
    facebook: "https://www.facebook.com/eousuf.abdullah",
    instagram: "https://www.instagram.com/eousufabdullah/",
    twitter: "https://twitter.com/asifuzzaman.shanto",
  },
};

export default function ProfileCard() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(initialProfile);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
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
            <Image
              height={"full"}
              width={"full"}
              objectFit={"cover"}
              src={profile.image}
              alt="Profile"
            />
          </Box>

          {/* Profile Details */}
          <Stack align={"center"} spacing={2}>
            {isEditing ? (
              <Input
                value={editedProfile.name}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, name: e.target.value })
                }
                fontSize={"2xl"}
                fontWeight={600}
                textAlign={"center"}
              />
            ) : (
              <Heading fontSize={"2xl"} fontWeight={600}>
                {profile.name}
              </Heading>
            )}
            {isEditing ? (
              <Textarea
                value={editedProfile.description}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    description: e.target.value,
                  })
                }
                fontSize={"md"}
                textAlign={"center"}
              />
            ) : (
              <Text color={"gray.500"} fontSize={"md"} textAlign={"center"}>
                {profile.description}
              </Text>
            )}
          </Stack>

          {/* Social Media Links */}
          <Flex mt={4} gap={4}>
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
          </Flex>

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
