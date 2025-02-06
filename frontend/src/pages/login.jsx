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
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Chakra UI-wrapped icons
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a Gmail address")
      .required("Email is required"),
    password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Login Submitted", values);
    navigate("/"); // Redirect to homepage
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
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={4} p="1rem" backgroundColor="white" boxShadow="md" borderRadius="md">
                {/* Email Input */}
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.500" />
                    </InputLeftElement>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      placeholder="Email address"
                      focusBorderColor="teal.500"
                      paddingLeft="3rem" // Ensure space for icon
                    />
                  </InputGroup>
                  <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                </FormControl>

                {/* Password Input */}
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaLock color="gray.500" />
                    </InputLeftElement>
                    <Field
                      as={Input}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      focusBorderColor="teal.500"
                      paddingLeft="3rem"
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick} colorScheme="teal">
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                  <FormHelperText textAlign="right">
                    <Link as={RouterLink} to="/forgot-password">Forgot password?</Link>
                  </FormHelperText>
                </FormControl>

                {/* Login Button */}
                <Button borderRadius="md" type="submit" variant="solid" colorScheme="teal" width="full">
                  Login
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Stack>

      {/* Sign Up Link */}
      <Box>
        New to us?{" "}
        <Link as={RouterLink} to="/signup" color="teal.500">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
