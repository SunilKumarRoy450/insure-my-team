import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { getBlog } from "./helper";

const HomePage = () => {
  const toast = useToast();
  const [blogPerPage] = useState(6);
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteRender, setDeleteRender] = useState(false);

  //Get Current Blogs
  const indexOfLastBlog = currentPage * blogPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blog.length / blogPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getBlog().then((res) => setBlog(res));
  }, [deleteRender]);

  //Delete Blog
  const handleOnClickDeleteBlog = async (id, userId) => {
    const loginUserId = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loginUserId._id === userId || loginUserId.role === "admin") {
      await axios.delete(
        `https://brave-housecoat-fox.cyclic.app/blogs/delete/${id}`
      );
      toast({
        title: "Blog Deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setDeleteRender(true);
    } else {
      toast({
        title: "Sorry ! You are not allowed to Delete Blog",
        description: `You are not the right user to delete this blog`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box w={"100%"}>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        direction={["column", "row"]}
        margin={"auto"}
        spacing="20px"
        width={"90%"}
      >
        {currentBlogs?.map((item) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={item._id}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={item.image}
              alt={item.title}
            />

            <Stack>
              <CardBody>
                <Heading size="md">{item.title}</Heading>

                <Text noOfLines={[1, 2, 3]} py="1">
                  {item.body}
                </Text>
              </CardBody>

              <CardFooter>
                <Link
                  style={{
                    border: "1px solid",
                    padding: ".5rem",
                    borderRadius: ".3rem",
                  }}
                  to={`/${item._id}`}
                >
                  Read More
                </Link>
                <Button
                  onClick={() =>
                    handleOnClickDeleteBlog(
                      item._id,

                      item.user._id
                    )
                  }
                  flex="1"
                  variant="outline"
                  leftIcon={<AiFillDelete />}
                />
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Box m={".5rem"}>
        {pageNumbers?.map((number) => (
          <Button
            variant={"outline"}
            color="white"
            onClick={() => paginate(number)}
            key={number}
          >
            {number}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
