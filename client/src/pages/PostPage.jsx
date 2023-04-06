import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Tag,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import axios from "axios";

const PostPage = () => {
  const { id } = useParams();
  const [blogAndComment, setBlogAndComment] = useState([]);
  useEffect(() => {
    getBlogAndComment();
  }, [id]);

  
  const getBlogAndComment = async () => {
    const res = await axios.get(`http://localhost:8080/blogs/get/blog`);
    const data = res.data;
    setBlogAndComment(data);
  };

  const filterData = blogAndComment?.filter((item) => item._id === id);

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
            <Button flex="1" variant="outline" leftIcon={<BiChat />}>
              Comment
            </Button>
          </CardFooter>
          {item &&
            item.comments?.map((item) => (
              <Box key={item._id}>
                <Tag
                  size="sm"
                  variant="outline"
                  colorScheme="green"
                  borderRadius="sm"
                >
                  <Avatar src="" size="2xs" name="" ml={-1} mr={2} />
                  <TagLabel></TagLabel>
                </Tag>
                <Box
                  padding={".1rem"}
                  className="commentContainer"
                  margin={"auto"}
                  textAlign={"center"}
                  w={"90%"}
                  // bg={"grey"}
                >
                  {/* <Text
                    as="em"
                    noOfLines={5}
                    fontSize="2xs"
                    className="commentText"
                    color={"#ffffff"}
                  >
                    {" "}
                    {item.body}
                  </Text> */}
                  <Textarea isDisabled placeholder={item.body} />
                </Box>
              </Box>
            ))}
        </Card>
      ))}
    </Box>
  );
};

export default PostPage;
