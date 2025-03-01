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
  Avatar,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
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
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Create Account</Heading>
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
                backgroundColor="white"
                boxShadow="md"
                borderRadius="md"
              >
                {/* Full Name */}
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      width="3rem"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CFaUserAlt color="gray.500" />
                    </InputLeftElement>
                    <Field
                      as={Input}
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      required
                      focusBorderColor="teal.500"
                      paddingLeft="3.5rem" // To ensure space for icon
                      color="black"
                      _placeholder={{ color: "gray.500" }}
                      borderColor="teal"
                      borderWidth="2px"
                      _focus={{ borderColor: "teal.500", borderWidth: "2px" }}
                      _hover={{ borderColor: "teal.500" }}
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
                    <InputLeftElement
                      pointerEvents="none"
                      width="3rem"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CFaEnvelope color="gray.500" />
                    </InputLeftElement>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      placeholder="Email address"
                      required
                      focusBorderColor="teal.500"
                      paddingLeft="3.5rem" // To ensure space for icon
                      color="black"
                      _placeholder={{ color: "gray.500" }}
                      borderColor="teal"
                      borderWidth="2px"
                      _focus={{ borderColor: "teal.500", borderWidth: "2px" }}
                      _hover={{ borderColor: "teal.500" }}
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
                    <InputLeftElement
                      pointerEvents="none"
                      width="3rem"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CFaLock color="gray.500" />
                    </InputLeftElement>
                    <Field
                      as={Input}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      required
                      focusBorderColor="teal.500"
                      paddingLeft="3.5rem" // To ensure space for icon
                      color="black"
                      _placeholder={{ color: "gray.500" }}
                      borderColor="teal"
                      borderWidth="2px"
                      _focus={{ borderColor: "teal.500", borderWidth: "2px" }}
                      _hover={{ borderColor: "teal.500" }}
                      autoComplete="off"
                    />
                    <InputRightElement width="4rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowClick}
                        colorScheme="teal"
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
                    <InputLeftElement
                      pointerEvents="none"
                      width="3rem"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CFaLock color="gray.500" />
                    </InputLeftElement>
                    <Field
                      as={Input}
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required
                      focusBorderColor="teal.500"
                      paddingLeft="3.5rem" // To ensure space for icon
                      color="black"
                      _placeholder={{ color: "gray.500" }}
                      borderColor="teal"
                      borderWidth="2px"
                      _focus={{ borderColor: "teal.500", borderWidth: "2px" }}
                      _hover={{ borderColor: "teal.500" }}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                </FormControl>

                <Button
                  borderRadius="md"
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Sign Up
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Stack>

      <Box color={"blackAlpha.500"}>
        Already have an account?{" "}
        <Link as={RouterLink} to="/login" color="teal.500">
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default SignUp;
