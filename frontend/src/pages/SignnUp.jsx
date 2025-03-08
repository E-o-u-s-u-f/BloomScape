import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  InputRightElement,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi"; // Plant icon for gardening theme
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      alert(response.data.message);
      navigate(`/otp-verification?email=${encodeURIComponent(values.email)}`);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      bgGradient="linear(to-b, green.50, green.200)" // Gradient background
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgRepeat: "repeat",
        bgSize: "200px",
        opacity: 0.2,
        zIndex: -1,
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={8} align="center">
        {/* Tagline */}
        <Text fontSize="2xl" color="green.700" fontWeight="bold">
          Start growing with us!
        </Text>
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          {/* Plant Icon */}
          <Icon as={GiPlantRoots} w={10} h={10} color="green.500" />
          <Heading color="green.500">Join the Garden Community</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form autoComplete="off">
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="green.50" // Form background
                  boxShadow="md"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="green.200" // Subtle border
                >
                  {/* Full Name */}
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaUserAlt color="green.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        required
                        focusBorderColor="green.500"
                        paddingLeft="3rem"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="green.200"
                        borderWidth="2px"
                        _focus={{
                          borderColor: "green.500",
                          borderWidth: "2px",
                        }}
                        _hover={{ borderColor: "green.500" }}
                        autoComplete="off"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Email */}
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaEnvelope color="green.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        required
                        focusBorderColor="green.500"
                        paddingLeft="3rem"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="green.200"
                        borderWidth="2px"
                        _focus={{
                          borderColor: "green.500",
                          borderWidth: "2px",
                        }}
                        _hover={{ borderColor: "green.500" }}
                        autoComplete="off"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Password */}
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaLock color="green.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        required
                        focusBorderColor="green.500"
                        paddingLeft="3rem"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="green.200"
                        borderWidth="2px"
                        _focus={{
                          borderColor: "green.500",
                          borderWidth: "2px",
                        }}
                        _hover={{ borderColor: "green.500" }}
                        autoComplete="off"
                      />
                      <InputRightElement width="4rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleShowClick}
                          colorScheme="gray" // Neutral for contrast
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Confirm Password */}
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaLock color="green.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        focusBorderColor="green.500"
                        paddingLeft="3rem"
                        color="black"
                        _placeholder={{ color: "gray.500" }}
                        borderColor="green.200"
                        borderWidth="2px"
                        _focus={{
                          borderColor: "green.500",
                          borderWidth: "2px",
                        }}
                        _hover={{ borderColor: "green.500" }}
                        autoComplete="off"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </FormControl>

                  {/* Sign Up Button */}
                  <Button
                    borderRadius="md"
                    type="submit"
                    variant="solid"
                    colorScheme="green"
                    width="full"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Form>
            </Formik>
          </Box>
        </Stack>
        {/* Login Link */}
        <Box mt={4} color="blackAlpha.500">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="green.500" fontWeight="bold">
            Login
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
