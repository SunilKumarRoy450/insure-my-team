import React, { useState } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { useEffect } from "react";
const HomePage = () => {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPerPage] = useState(6);

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
    getBlog();
  }, []);

  const getBlog = async () => {
    const res = await axios.get(`http://localhost:8080/blogs/get/blog`);
    const data = res.data;
    setBlog(data);
  };
  return (
    <>
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
              alt="Caffe Latte"
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
    </>
  );
};

export default HomePage;
