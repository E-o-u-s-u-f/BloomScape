import React from 'react';
import { Box, Heading, Text, Stack, Button, Container, Image } from '@chakra-ui/react';
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Container maxW="container.lg" py={10}>
        <Box textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" mb={4}>
            About Us
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Welcome to <strong>Bloomscape</strong>, a community-driven platform
            inspiring people to make the world greener.
          </Text>
        </Box>
        <Stack
          direction={{ base: "row", md: "column" }}
          spacing={10}
          justify="center"
          align="center"
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={10}
            justify="center"
            align="center"
          >
            <Box flex="1" textAlign="center">
              <Image
                src="https://jaipuriamba.edu.in/wp-content/uploads/2024/06/WhatsApp-Image-2024-06-04-at-7.23.34-PM.jpeg"
                alt="Tree Plantation"
                borderRadius="lg"
                boxSize="400px"
                objectFit="cover"
              />
            </Box>

            <Box flex="1" textAlign="left" p={6}>
              <Heading as="h2" size="lg" mb={4}>
                Our Mission
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                At Bloomscape, we believe that every tree planted is a step
                toward a greener, healthier planet. Our mission is to inspire,
                connect, and empower individuals, organizations, and communities
                to come together to plant trees and make a tangible difference
                for our environment.
              </Text>
            </Box>
          </Stack>

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={10}
            justify="center"
            align="center"
          >
            <Box flex="1" textAlign="left" p={3}>
              <Heading as="h3" size="md" mb={4}>
                Why We Do It
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                The world faces environmental challenges like deforestation,
                climate change, and biodiversity loss. We are committed to
                combating these issues through the collective power of
                individuals and communities, promoting the many benefits of tree
                planting to restore the Earth’s ecological balance.
              </Text>
            </Box>
            <Box flex="1" textAlign="center">
              <Image
                src="http://www.cpscl.edu.bd/wp-content/uploads/2020/07/3-1.jpg"
                alt="Tree Plantation"
                borderRadius="lg"
                boxSize="400px"
                objectFit="cover"
              />
            </Box>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={10}
            justify="center"
            align="center"
          >
            <Box flex="1" textAlign="center">
              <Image
                src="https://img.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LOAC37X3QII6XEI4KJF4RNUPC4.jpg&w=1800"
                alt="Tree Plantation"
                borderRadius="lg"
                boxSize="400px"
                objectFit="cover"
              />
            </Box>

            <Box flex="1" textAlign="left" p={6}>
              <Heading as="h3" size="md" mb={4}>
                Join Us
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                Ready to make a difference? Whether you're planting your first
                tree or you're already experienced, Bloomscape offers a space
                for everyone to grow together. Join us and help us build a
                greener, brighter future.
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <Footer/>
    </>
  );
};

export default AboutUs;
