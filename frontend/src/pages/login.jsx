import { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import {useAuth} from "../Context/AuthContext.jsx";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setAuthUser}=useAuth();

  // Handling password visibility toggle
  const handleShowClick = () => setShowPassword(!showPassword);

  // Validation Schema using Yup
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

  // Effect to redirect if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  
  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
  
    try {
      // Send login request to backend
      const response = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });
  
      console.log("Response Data: ", response.data); // Log the response data for debugging
  
      if (response.data.success) {
        // The token will be included in the response
        const token = response.data.token;
        if (token) {
          // Save the token in localStorage
          localStorage.setItem("authToken", token);
  
          // Decode the token and save user info to context
          const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
          setAuthUser(decodedToken); // Set the user in context
  
          toast.success("Login successful!");
  
          // Redirect to the homepage after state is set
          navigate("/"); // Navigate to home page after login
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
  
      // Log the full error for debugging
      console.error("Login Error: ", error);
  
      // Handle error response from backend
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage); // Show error toast message
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
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="white"
                  boxShadow="md"
                  borderRadius="md"
                >
                  {/* Email Input */}
                  <FormControl isInvalid={touched.email && errors.email}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaUserAlt color="gray.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    {touched.email && errors.email && (
                      <Box color="red" fontSize="sm">
                        {errors.email}
                      </Box>
                    )}
                  </FormControl>

                  {/* Password Input */}
                  <FormControl isInvalid={touched.password && errors.password}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaLock color="gray.500" />
                      </InputLeftElement>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    {touched.password && errors.password && (
                      <Box color="red" fontSize="sm">
                        {errors.password}
                      </Box>
                    )}
                    <FormHelperText textAlign="right">
                      <Link as={RouterLink} to="/forgot-password">
                        Forgot password?
                      </Link>
                    </FormHelperText>
                  </FormControl>

                  {/* Login Button */}
                  <Button
                    borderRadius="md"
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    isLoading={loading}
                    loadingText="Logging In"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
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
