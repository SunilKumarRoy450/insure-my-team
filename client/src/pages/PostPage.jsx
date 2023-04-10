import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Button,
  Avatar,
  Flex,
  Heading,
  IconButton,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { BiChat, BiEdit } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { getBlog } from "./helper";

const PostPage = () => {
  const { id } = useParams();
  const toast = useToast();
  const [boolean, setBoolean] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stopRender, setStopRender] = useState(false);
  const [blogAndComment, setBlogAndComment] = useState([]);
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);
  const [commentFormValue, setCommentFormValue] = useState({ body: "" });
  const [updateBlogFormValue, setUpdateBlogFormValue] = useState({
    title: "",
    body: "",
    image: "",
  });

  //Used for giving user id to post comment
  const userID = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    getBlog().then((res) => setBlogAndComment(res));
  }, [stopRender]);

  //Filtering comments array from blogs
  const filterData = blogAndComment?.filter((item) => item._id === id);

  //Finding user whose blog will be edited
  const filterUserIdForEditBlog=blogAndComment?.find((item)=>item.user)

  // Post Comment
  const handleCommentFormOnChange = (e) => {
    const { value, name } = e.target;
    setCommentFormValue({ ...commentFormValue, [name]: value });
  };

  const handleCommentPostOnClick = async (e) => {
    e.preventDefault();
    const payload = {
      user: userID._id,
      blog: id,
      body: commentFormValue.body,
    };

    await axios.post(
      `https://brave-housecoat-fox.cyclic.app/blogs/add/comment`,
      payload
    );
    toast({
      title: "Comment Added",
      description: "Thanks for your feedback",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    setCommentFormValue({ body: "" });
    setBoolean(false);
    setStopRender(true);
  };

  //Update Blog
  const handleOnChangeUpdateBlog = (e) => {
    const { value, name } = e.target;
    setUpdateBlogFormValue({ ...updateBlogFormValue, [name]: value });
  };

  const handleOnClickUpdateBlog = async (e) => {
    e.preventDefault();
    setDisableUpdateBtn(false);
    const payload = {
      title: updateBlogFormValue.title,
      body: updateBlogFormValue.body,
      image: updateBlogFormValue.image,
    };
    if (
      updateBlogFormValue.title === "" ||
      updateBlogFormValue.body === "" ||
      updateBlogFormValue.image === ""
    ) {
      setDisableUpdateBtn(false);
      toast({
        title: "Missing Details",
        description: "Please fill all the details",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setDisableUpdateBtn(true);
      
      if (filterUserIdForEditBlog._id === userID._id || userID.role === "admin") {
        await axios.patch(
          `https://brave-housecoat-fox.cyclic.app/blogs/edit/${id}`,
          payload
        );
        setUpdateBlogFormValue({
          title: "",
          body: "",
          image: "",
        });
        setStopRender(true);
      } else {
        toast({
          title: "Sorry",
          description: "You are not the  right user to Update the blog",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      onClose();
      setDisableUpdateBtn(false);
    }
  };

  return (
    <Box w={"100%"}>
      {filterData?.map((item) => (
        <Card
          margin={"auto"}
          w={"80%"}
          direction={{ base: "column" }}
          overflow="hidden"
          variant="outline"
          key={item._id}
        >
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={item.user.name} src={item.user.image} />

                <Box>
                  <Heading size="sm">{item.user.name}</Heading>
                  <Text>{item.place}</Text>
                </Box>
              </Flex>
              <IconButton
                variant="outline"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Badge>{item.title}</Badge>
            <Text align={"left"}>{item.body}</Text>
          </CardBody>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "100%" }}
            src={item.image}
            alt={item.title}
          />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button
              onClick={() => setBoolean(true)}
              flex="1"
              variant="outline"
              leftIcon={<BiChat />}
            >
              Comment
            </Button>
            <Button
              onClick={onOpen}
              flex="1"
              variant="outline"
              leftIcon={<BiEdit />}
            >
              Edit
            </Button>
            {boolean && (
              <Box>
                <Textarea
                  onChange={handleCommentFormOnChange}
                  name="body"
                  value={commentFormValue.body}
                  placeholder="comment...."
                />

                <Button variant={"outline"} onClick={handleCommentPostOnClick}>
                  Comment
                </Button>
              </Box>
            )}
          </CardFooter>
          {item &&
            item.comments?.map((item) => (
              <Box key={item._id}>
                <Box
                  padding={".1rem"}
                  className="commentContainer"
                  margin={"auto"}
                  textAlign={"center"}
                  w={"90%"}
                >
                  <Textarea isReadOnly placeholder={item.body} />
                </Box>
              </Box>
            ))}
        </Card>
      ))}
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={handleOnChangeUpdateBlog}
                  value={updateBlogFormValue.title}
                  name="title"
                  isRequired
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Input
                  onChange={handleOnChangeUpdateBlog}
                  value={updateBlogFormValue.body}
                  name="body"
                  isRequired
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  onChange={handleOnChangeUpdateBlog}
                  value={updateBlogFormValue.image}
                  name="image"
                  isRequired
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={disableUpdateBtn}
                onClick={handleOnClickUpdateBlog}
                variant="outline"
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default PostPage;
