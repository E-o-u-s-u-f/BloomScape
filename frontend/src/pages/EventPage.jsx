import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import { Box, Heading, Text, Button, SimpleGrid, GridItem, Image,useToast } from '@chakra-ui/react';
const EventPage = () => {
  const toast = useToast();

  const handleClick = () => {
    toast({
      title: "Action Completed",
      description: "You clicked the button!",
      status: "success",
      duration: 3000, 
      isClosable: true,
    });
  };

  const events = [
    {
      title: 'Community Tree Plantation',
      date: 'March 15, 2025',
      location: 'Motijhil ,Dhaka',
      description: 'Join us for a community tree plantation event where we will plant trees together to make our environment greener and cleaner.',
      image: 'https://rflbd.com/Application/storage/app/public/relativeContentPath/photo/35a76886a0fa2072fa74ab17086580f82.jpg',
      registrationLink: '#',
    },
    {
      title: 'Tree Planting Workshop',
      date: 'April 10, 2025',
      location: 'Tejgaon,Dhaka',
      description: 'A hands-on workshop where you will learn how to properly plant and care for trees, with expert guidance.',
      image: 'https://arunachaltimes.in/wp-content/uploads/2021/07/Seminar-on-tree-plantation-held.jpg', 
      registrationLink: '#',
    },
    {
      title: 'Environmental Awareness Campaign',
      date: 'May 5, 2025',
      location: 'Ahsanullah University of Scienece & Technology,Dhaka',
      description: 'Join our virtual event to learn more about the importance of tree plantation and how you can contribute to sustainability efforts.',
      image: 'https://trees4trees.org/wp-content/uploads/2023/07/Field-facilitators-Induction-2023_trees4trees-tree-planting-program_reforestation_Cirasea-1-Bandung_Citarum-768x502.jpg', // Replace with event image URL
      registrationLink: '#',
    },
  ];

  return (
    <Box p={6} py={12} bg="gray.50">
      <Box textAlign="center" mb={12}>
        <Heading as="h1" size="2xl" mb={4} color="Green">Upcoming Events</Heading>
        <Text fontSize="lg" color="Green">
          Stay informed about upcoming tree planting events, workshops, and more! Join us in making the world a greener place.
        </Text>
      </Box>

      {/* Event List */}
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={12} justifyItems="center">
        {events.map((event, index) => (
          <GridItem key={index} w="full" boxShadow="2xl" >
            <Box 
              border="1px" 
              borderRadius="md" 
              boxShadow="sm" 
              overflow="hidden" 
              p={6}
              display="flex"
              flexDirection={{ base: 'column', lg: 'row' }} 
              alignItems="center"
              justifyContent="center"
            >
              <Image 
                src={event.image} 
                alt={event.title} 
                width={{ base: '100%', lg: '50%' }}
                height="auto" 
                objectFit="cover"
                borderRadius="md"
              />
              <Box ml={{ lg: 6 }} mt={{ base: 4, lg: 0 }} textAlign="left" maxWidth="450px">
                <Heading as="h3" size="lg" mb={2}>{event.title}</Heading>
                <Text fontSize="md" color="gray.600" mb={2}><strong>Date:</strong> {event.date}</Text>
                <Text fontSize="md" color="gray.600" mb={4}><strong>Location:</strong> {event.location}</Text>
                <Text fontSize="sm" color="gray.600" mb={4}>{event.description}</Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  <strong>Time Remaining: </strong>
                  <Countdown date={new Date(event.date).getTime()} />
                </Text>
                <motion.div
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Button 
                    colorScheme="green" 
                    onClick={handleClick}
                  >
                    Register Now
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};



export default EventPage;