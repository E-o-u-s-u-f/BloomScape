import React from 'react';
import { Box, Heading, Text, Button, SimpleGrid, GridItem, Image } from '@chakra-ui/react';

const ResourceHub = () => {
  return (
    <Box p={6} justify="center" align="center">
      {/* Header Section */}
      <Box textAlign="center" mb={12} p={20}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to the Bloomscape Resource Hub</Heading>
        <Text fontSize="lg" color="gray.600">
          Explore our comprehensive tree planting guidelines, tips, and avoidable mistakes to help you grow trees and contribute to a greener world.
        </Text>
      </Box>

      {/* Basic Tree Planting Guidelines & Additional Tips for Success Section */}
      <SimpleGrid textAlign="center" columns={{ base: 1, md: 2 }} spacing={10} mb={12} px={10}>
        {/* Basic Tree Planting Guidelines */}
        <Box>
          <Heading as="h2" size="xl" mb={6}>Basic Tree Planting Guidelines</Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} justifyContent="center">
            <GridItem>
              <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h3" size="md" color="green.600" mb={4}>Choose the Right Tree</Heading>
                <Text mb={4}>
                  Select native tree species that are well-suited to your climate and soil conditions. Native trees grow better, require less water, and benefit local .
                </Text>
                <a href="https://treepeople.org/wp-content/uploads/2020/08/How-to-Choose-the-Right-Tree-for-the-Right-Place.pdf" target="_blank">
                  <Button colorScheme="green" variant="outline">More Details</Button>
                </a>
              </Box>
            </GridItem>

            <GridItem>
              <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h3" size="md" color="green.600" mb={4}>Pick the Right Location</Heading>
                <Text mb={4}>
                  Ensure the tree has enough space to grow both above and below the ground. Avoid planting near buildings, power lines, or other trees.
                </Text>
                <a href="https://treecouncil.org.uk/wp-content/uploads/2021/06/Tree-planting-guide-2021.pdf" target="_blank">
                  <Button colorScheme="green" variant="outline">More Details</Button>
                </a>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>

        {/* Additional Tips for Success */}
        <Box>
          <Heading as="h2" size="xl" mb={6}>Additional Tips for Success</Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} justifyContent="center">
            <GridItem>
              <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h3" size="md" color="green.600" mb={4}>Soil Preparation</Heading>
                <Text mb={4}>
                  Proper soil preparation is key to tree health. Loosen the soil and amend it with compost or organic material to improve fertility and drainage.
                </Text>
                <a href="https://www.extension.purdue.edu/extmedia/fnr/fnr-220.pdf" target="_blank">
                  <Button colorScheme="green" variant="outline">More Details</Button>
                </a>
              </Box>
            </GridItem>

            <GridItem>
              <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
                <Heading as="h3" size="md" color="green.600" mb={4}>Watering and Maintenance</Heading>
                <Text mb={4}>
                  Water the tree immediately after planting and regularly during the first few months. Apply mulch to retain moisture and suppress weeds.
                </Text>
                <a href="https://dnr.wisconsin.gov/sites/default/files/topic/Forests/GSUSA_treePlantingMaintenanceGuide.pdf" target="_blank">
                  <Button colorScheme="green" variant="outline">More Details</Button>
                </a>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>
      </SimpleGrid>

      {/* Common Mistakes to Avoid Section (Centered) */}
      <Box   w="50vw" 
        h="50vh" textAlign="center" mb={12} >
        <Heading as="h2" size="xl" mb={6}>Common Mistakes to Avoid</Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} justifyContent="center">
          <GridItem>
            <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
              <Heading as="h3" size="md" color="green.600" mb={4}>Planting Too Deep</Heading>
              <Text mb={4}>
                Avoid planting the tree too deep. The root ball should be level with the surrounding soil to prevent water from pooling around the roots.
              </Text>
              <a href="https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/forestry/uftoolbox/PerilsPlantingTreesDeeply.pdf" target="_blank">
                <Button colorScheme="green" variant="outline">More Details</Button>
              </a>
            </Box>
          </GridItem>

          <GridItem>
            <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
              <Heading as="h3" size="md" color="green.600" mb={4}>Neglecting Watering</Heading>
              <Text mb={4}>
                Not providing enough water during the early growth stages can stress the tree. Ensure the tree receives enough water, especially in dry periods.
              </Text>
              <a href="https://treecouncil.org.uk/wp-content/uploads/2019/12/TCHandbook_5_Care.pdf" target="_blank">
                <Button colorScheme="green" variant="outline">More Details</Button>
              </a>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>

      {/* Featured Resources Section */}
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={6}>Featured Resources</Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Check out more detailed resources to help you on your tree planting journey.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} >
          <GridItem>
            <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
              <Heading as="h4" size="md" mb={2}>Ultimate Tree Planting Guide</Heading>
              <Text mb={4}>A complete guide to planting trees and caring for them from start to finish.</Text>
              <a href="https://www.treepeople.org/wp-content/uploads/2020/08/How-to-Plant-a-Tree.pdf" target="_blank">
                <Button colorScheme="green" variant="outline">More Details</Button>
              </a>
            </Box>
          </GridItem>

          <GridItem>
            <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
              <Heading as="h4" size="md" mb={2}>Sustainability Tips</Heading>
              <Text mb={4}>Learn how planting trees can help mitigate climate change and promote sustainability.</Text>
              <a href="https://www.forestfoundation.ph/wp-content/uploads/2018/10/Sustainable-Tree-Farming-Guidebook.pdf" target="_blank">
                <Button colorScheme="green" variant="outline">More Details</Button>
              </a>
            </Box>
          </GridItem>

          <GridItem>
            <Box border="1px" borderRadius="md" p={6} boxShadow="sm">
              <Heading as="h4" size="md" mb={2}>Tree Planting Checklist</Heading>
              <Text mb={4}>Download our checklist to help you plan and execute your tree planting project.</Text>
              <a href="https://www.plt.org/wp-content/uploads/pdf/PLT_K-8-Guide_Plant-A-Tree_StudentPage_Tree-Planting-Checklist.pdf" target="_blank">
                <Button colorScheme="green" variant="outline">More Details</Button>
              </a>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ResourceHub;
