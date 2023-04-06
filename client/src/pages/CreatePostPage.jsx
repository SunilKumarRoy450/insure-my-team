import React from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormLabel,
  Flex,
  Box,
  FormControl,
  Checkbox,
  Stack,

  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { useEffect } from "react";
const initialFormValue = {
  title: "",
  content: "",
  place: "",
  image: "",
};

const CreatePostPage = () => {
  const [formValue, setFormValue] = useState(initialFormValue);
  const [loginFormValue, setLoginFormValue] = useState({
    email: "",
    password: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  //CreatePost
  const handleOnInputChange = (e) => {
    const { value, name } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleOnClickSubmitPostForm = async (e) => {
    e.preventDefault();
    const loginUserId = JSON.parse(localStorage.getItem("loggedInUser"))
    console.log(loginUserId);
    const payload = {
      title: formValue.title,
      user:loginUserId._id,
      image: formValue.image,
      place: formValue.place,
      body: formValue.content,
    };
    await axios.post("http://localhost:8080/blogs/create/blog", payload);
    onClose();
  };

  //Login
  const handleLoginFormOnChangeValue = (e) => {
    const { value, name } = e.target;
    setLoginFormValue({ ...loginFormValue, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userEmail: loginFormValue.email,
      userPassword: loginFormValue.password,
    };
    await axios
      .post("http://localhost:8080/users/login", payload)
      .then((res) => {
        const data = res.data;
        console.log(data)
        if (data.login) {
          localStorage.setItem("loggedInUser", JSON.stringify(data.loggedInUser));
          // navigate("/home");
        }
      });
    setLoginFormValue({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Button onClick={onOpen}>+ Create Blog</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Title</FormLabel>
            <Input
              onChange={handleOnInputChange}
              name="title"
              value={formValue.title}
            />
            <FormLabel>Content</FormLabel>
            <Input
              onChange={handleOnInputChange}
              name="content"
              value={formValue.content}
            />
            <FormLabel>Place</FormLabel>
            <Input
              name="place"
              value={formValue.place}
              onChange={handleOnInputChange}
            />
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              value={formValue.image}
              onChange={handleOnInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleOnClickSubmitPostForm} variant="outline">
              + add Blog
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box></Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              if you are new here, Please Sign up! <Link to={'/signup'} style={{color:'blue'}} >Sign up</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={handleLoginFormOnChangeValue}
                  value={loginFormValue.email}
                  name="email"
                />
              </FormControl>
              <FormControl >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={handleLoginFormOnChangeValue}
                  value={loginFormValue.password}
                  name="password"
                />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack> */}
                <Button
                  onClick={handleLoginSubmit}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default CreatePostPage;
