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
  Stack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "./helper";

const initialFormValue = {
  title: "",
  content: "",
  place: "",
  image: "",
};

const CreatePostPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [loginFormValue, setLoginFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    getUser()
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  }, []);

  //Create Blog
  const handleOnInputChange = (e) => {
    const { value, name } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleOnClickSubmitPostForm = async (e) => {
    e.preventDefault();

    const loginUserId = JSON.parse(localStorage.getItem("loggedInUser"));

    const payload = {
      title: formValue.title,
      user: loginUserId._id,
      image: formValue.image,
      place: formValue.place,
      body: formValue.content,
    };
    if (
      formValue.title === "" ||
      formValue.image === "" ||
      formValue.place === "" ||
      formValue.content === ""
    ) {
      toast({
        title: "Missing Details",
        description: "Please fill all the details",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      if (loginUserId.role === "author") {
        await axios.post(
          "https://brave-housecoat-fox.cyclic.app/blogs/create/blog",
          payload
        );
        toast({
          title: "Blog created Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        await navigate("/");
      } else {
        toast({
          title: "Sorry! you are not able to create Blog",
          description: "Please Signup first",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
    onClose();
  };

  //Login
  const handleLoginFormOnChangeValue = (e) => {
    const { value, name } = e.target;
    setLoginFormValue({ ...loginFormValue, [name]: value });
  };

  //all users for checking login user is there or not

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: loginFormValue.email,
      password: loginFormValue.password,
    };
    if (loginFormValue.email === "" || loginFormValue.password === "") {
      toast({
        title: "Missing Details",
        description: "Please fill all the details",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      const userData = users.find((item) => {
        if (
          item.email === payload.email &&
          item.password === payload.password
        ) {
          return item;
        }
      });
      if (userData) {
        await axios
          .post("https://brave-housecoat-fox.cyclic.app/users/login", payload)
          .then((res) => {
            const data = res.data;
            if (data.login) {
              localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.loggedInUser)
              );
            }
          });

        toast({
          title: "Login Successfull",
          description: "User Found",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      } else {
        await toast({
          title: "User not found",
          description: "Please fill correct Email or Password",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      setLoginFormValue({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <Button border={'5px solid white'} colorScheme="teal" variant={"outline"} onClick={onOpen}>
        + Create Blog
      </Button>
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
            <Button border={'2px solid teal'} onClick={handleOnClickSubmitPostForm} variant="outline">
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
        bg={useColorModeValue("rgb(27, 26, 26)")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading color={"whiteAlpha.900"} fontSize={"4xl"}>
              Sign in to your account
            </Heading>
            <Text fontSize={"lg"} color={"whiteAlpha.600"}>
              if you are new here, Please Sign up!{" "}
              <Link to={"/signup"} style={{ color: "blue" }}>
                Sign up
              </Link>{" "}
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
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={handleLoginFormOnChangeValue}
                  value={loginFormValue.email}
                  name="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={handleLoginFormOnChangeValue}
                  value={loginFormValue.password}
                  name="password"
                />
              </FormControl>
              <Stack spacing={10}>
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
