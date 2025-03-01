import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Heading,
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp,
      });
      
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg={cardBg}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        w="full"
      >
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="lg" color="teal.500">
            Verify Your Email
          </Heading>
          
          <Text textAlign="center" color="gray.600">
          {email ? `We've sent a code to ${email}` : "No email found"}
          </Text>

          <FormControl>
            <FormLabel textAlign="center">Enter OTP</FormLabel>
            <Input
              placeholder="Enter your 4-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              size="lg"
              type="text"
              maxLength={6}
              textAlign="center"
              focusBorderColor="teal.500"
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleVerify}
            isLoading={isLoading}
            loadingText="Verifying..."
          >
            Verify OTP
          </Button>

          <Text textAlign="center" fontSize="sm" color="gray.500">
              {"Didn't"} receive a code?{" "}
            <Button variant="link" colorScheme="teal" size="sm">
              Resend OTP
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default OTPVerification;