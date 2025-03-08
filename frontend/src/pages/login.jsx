import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  chakra,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaUsers, FaLeaf, FaComments } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext.jsx";
import { motion } from "framer-motion";

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

// Animation variants
const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const iconPulse = {
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
  },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleShowClick = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Email must be a Gmail address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.success) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("authToken", token);
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          setAuthUser(decodedToken);
          const { password, ...userDetails } = decodedToken;
          localStorage.setItem("user", JSON.stringify(userDetails));
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error("Token not received. Login failed.");
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error(response.data.message || "Unknown error occurred.");
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
    <MotionFlex
      width="100vw"
      height="100vh"
      bgGradient="linear(to-b, green.50, green.200)"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgImage:
          "url('')",
        bgRepeat: "repeat",
        bgSize: "200px",
        opacity: 0.4,
        zIndex: -1,
      }}
      justifyContent="center"
      alignItems="center"
      p={4}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        bg="whiteAlpha.900"
        boxShadow="2xl"
        borderRadius="xl"
        overflow="hidden"
        maxW="1200px"
        w="100%"
      >
        {/* Preview Section */}
        <MotionBox
          flex={{ base: "none", md: 1 }}
          p={8}
          bgGradient="linear(to-br, green.100, green.50)"
          display={{ base: "none", md: "block" }}
          variants={leftVariants}
          initial="hidden"
          animate="visible"
        >
          <Heading as="h2" color="green.600" size="2xl" mb={4}>
            Welcome to BloomScape
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
            color="green.700"
            mb={6}
          >
            Connect with fellow gardeners, share tips, and grow together!
          </Text>
          <VStack align="start" spacing={4}>
            <HStack>
              <Icon
                as={FaUsers}
                boxSize={6}
                color="green.500"
                _hover={{ color: "green.600", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
              <Text color="green.700" fontSize="lg">
                Meet other gardening enthusiasts
              </Text>
            </HStack>
            <HStack>
              <Icon
                as={FaLeaf}
                boxSize={6}
                color="green.500"
                _hover={{ color: "green.600", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
              <Text color="green.700" fontSize="lg">
                Discover new plants and techniques
              </Text>
            </HStack>
            <HStack>
              <Icon
                as={FaComments}
                boxSize={6}
                color="green.500"
                _hover={{ color: "green.600", transform: "scale(1.1)" }}
                transition="all 0.3s ease"
              />
              <Text color="green.700" fontSize="lg">
                Share your gardening journey
              </Text>
            </HStack>
          </VStack>
        </MotionBox>

        {/* Login Form Section */}
        <MotionBox
          flex={1}
          p={8}
          variants={rightVariants}
          initial="hidden"
          animate="visible"
        >
          <Flex direction="column" align="center" mb={6}>
            <Icon
              as={GiPlantRoots}
              w={12}
              h={12}
              color="green.500"
              animate={iconPulse.animate}
            />
            <Heading color="green.500" mt={2}>
              Login to BloomScape
            </Heading>
            <Text color="gray.600" mt={2}>
              Enter your credentials to access your account.
            </Text>
          </Flex>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form autoComplete="off">
                <Flex
                  direction="column"
                  gap={4}
                  p={6}
                  bg="green.50"
                  boxShadow="lg"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="green.200"
                >
                  {/* Email Input */}
                  <FormControl isInvalid={touched.email && errors.email}>
                    <FormLabel htmlFor="email" color="green.700">
                      Email Address
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaUserAlt color="green.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        focusBorderColor="green.500"
                        paddingLeft="3rem"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="green.200"
                        borderWidth="2px"
                        _focus={{
                          borderColor: "green.500",
                          borderWidth: "2px",
                          boxShadow: "0 0 0 1px green.500",
                        }}
                        _hover={{ borderColor: "green.400" }}
                        transition="border-color 0.3s ease"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {touched.email && errors.email && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>

                  {/* Password Input */}
                  <FormControl isInvalid={touched.password && errors.password}>
                    <FormLabel htmlFor="password" color="green.700">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaLock color="green.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        focusBorderColor="green.500"
                        paddingLeft="3rem"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="green.200"
                        borderWidth="2px"
                        _focus={{
                          borderColor: "green.500",
                          borderWidth: "2px",
                          boxShadow: "0 0 0 1px green.500",
                        }}
                        _hover={{ borderColor: "green.400" }}
                        transition="border-color 0.3s ease"
                        autoComplete="off"
                      />
                      <InputRightElement width="4rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleShowClick}
                          colorScheme="green"
                          variant="outline"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {touched.password && errors.password && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.password}
                      </Text>
                    )}
                    <FormHelperText textAlign="right">
                      <Link
                        as={RouterLink}
                        to="/forgot-password"
                        color="green.500"
                      >
                        Forgot password?
                      </Link>
                    </FormHelperText>
                  </FormControl>

                  {/* Login Button */}
                  <Button
                    borderRadius="md"
                    type="submit"
                    variant="solid"
                    bgGradient="linear(to-r, green.400, green.600)"
                    color="white"
                    width="full"
                    isLoading={loading}
                    loadingText="Logging In"
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "xl",
                      bgGradient: "linear(to-r, green.500, green.700)",
                    }}
                    transition="all 0.3s ease"
                  >
                    Login
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
          <Box mt={4} textAlign="center">
            New to us?{" "}
            <Link
              as={RouterLink}
              to="/signup"
              color="green.500"
              fontWeight="bold"
              _hover={{ color: "green.600", textDecoration: "underline" }}
            >
              Sign Up
            </Link>
          </Box>
        </MotionBox>
      </Flex>
    </MotionFlex>
  );
};

export default Login;
