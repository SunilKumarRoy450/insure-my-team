import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,

} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import {Link} from 'react-router-dom'
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupFormValue, setSignupFormValue] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });

  // Signup/Register
  const handleRegisterOnChangeValue = (e) => {
    const { value, name } = e.target;
    setSignupFormValue({ ...signupFormValue, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userName: signupFormValue.username,
      userEmail: signupFormValue.email,
      userPassword: signupFormValue.password,
      userImage: signupFormValue.image,
    };
    await axios.post("http://localhost:8080/users/register", payload);
    setSignupFormValue({ username: "", email: "", password: "", image: "" });
    // navigate("/home");
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              fill the details✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      onChange={handleRegisterOnChangeValue}
                      value={signupFormValue.username}
                      name="username"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel>Image url</FormLabel>
                    <Input
                      type="text"
                      onChange={handleRegisterOnChangeValue}
                      value={signupFormValue.image}
                      name="image"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={handleRegisterOnChangeValue}
                  value={signupFormValue.email}
                  name="email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handleRegisterOnChangeValue}
                    value={signupFormValue.password}
                    name="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleRegisterSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link to={'/create/blog'} style={{color:'blue'}} >Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUpPage;
