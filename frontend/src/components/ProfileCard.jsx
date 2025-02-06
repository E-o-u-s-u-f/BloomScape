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
} from '@chakra-ui/react';
import { FaFacebookF, FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
const Profile = {
  Name: "Eousuf Abdullah",
  image:
    "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/474483707_1191931369118124_5538215198107449011_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGtDjE-eoz4YNbK-s0UhOUkKoQ_nxjDgIMqhD-fGMOAgyjTlWGvvf9AfiEOGw-BCnFSM1U8PphwCXDTkbH8i6Pj&_nc_ohc=8VJuGSNPB6cQ7kNvgEWaxuf&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=ApoO7ThQynmb9xoPo3ss3ak&oh=00_AYBVe2MP-pAs04xJ6-27d2yk_5-6Jok1lj-OqdDkYTDhiw&oe=67A2ACEC",
  Description: "Love Nature Because Nature is Beautiful.",
  socialLinks: {
    facebook: "https://www.facebook.com/eousuf.abdullah",
    instagram: "https://www.instagram.com/eousufabdullah/",
    twitter: "https://twitter.com/asifuzzaman.shanto"
  }
};

export default function ProfileCard() {
  return (
    <Center py={12}>
      <Box
        p={6}
        maxW={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Flex align={'center'}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${Profile.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={Profile.image}
            alt="Profile Image"
          />
        </Box>
          <Stack pl={6} align={'start'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {Profile.Name}
            </Heading>
            <Text color={'gray.500'} fontSize={'sm'} py={5}>
              {Profile.Description}
            </Text>
            <Flex gap={4}>
            <a href={Profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <Button>
                <FaSquareInstagram />
               </Button>
            </a>
            <a href={Profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <Button>
                <FaFacebookF />
               </Button>
            </a>
            <a href={Profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Button>
                <FaXTwitter/>
               </Button>
            </a>
            </Flex>

            
            <Button mt={4} colorScheme="blue" size="sm">
              Edit Profile
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
}
