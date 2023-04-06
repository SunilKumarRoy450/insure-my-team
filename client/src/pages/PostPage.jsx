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
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

const PostPage = () => {
  const { id } = useParams();
  const [blogAndComment, setBlogAndComment] = useState([]);
  const [commentFormValue, setCommentFormValue] = useState({ body: "" });
  const [boolean, setBoolean] = useState(false);

  //Used for giving user id to post comment
  const userID = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    getBlogAndComment();
  }, [id, blogAndComment]);

  //Getting all comments on blog
  const getBlogAndComment = async () => {
    const res = await axios.get(`http://localhost:8080/blogs/get/blog`);
    const data = await res.data;
    setBlogAndComment(data);
  };

  //Filtering comments array from blogs
  const filterData = blogAndComment?.filter((item) => item._id === id);

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

    await axios.post(`http://localhost:8080/blogs/add/comment`, payload);
    setBoolean(false);
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
                <Avatar name={item.user.userName} src={item.user.userImage} />

                <Box>
                  <Heading size="sm">{item.user.userName}</Heading>
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
            <Heading>{item.title}</Heading>
            <Text align={"left"}>{item.body}</Text>
          </CardBody>
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "100%" }}
            src={item.image}
            alt="Chakra UI"
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
                  // bg={"grey"}
                >
                  <Textarea isReadOnly placeholder={item.body} />
                </Box>
              </Box>
            ))}
        </Card>
      ))}
    </Box>
  );
};

export default PostPage;
