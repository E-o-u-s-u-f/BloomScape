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
import axios from "axios";
import { useEffect } from "react";

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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [navigate]);



  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/"); // Redirect after successful login
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
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
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form  autoComplete="off">
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
                        paddingLeft="3rem"
                        color="black" 
                        _placeholder={{ color: "gray.500" }} 
                        borderColor="teal" 
                        borderWidth="2px"
                        _focus={{ borderColor: "teal.500", borderWidth: "2px" }} 
                        _hover={{ borderColor: "teal.500" }}
                        autoComplete="off"
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
                      color="black" 
                        _placeholder={{ color: "gray.500" }} 
                        borderColor="teal" 
                        borderWidth="2px"
                        _focus={{ borderColor: "teal.500", borderWidth: "2px" }} 
                        _hover={{ borderColor: "teal.500" }}
                        autoComplete="off"
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
