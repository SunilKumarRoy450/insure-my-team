import React from "react";
import { Avatar, Box, Flex, Tag, TagLabel } from "@chakra-ui/react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const loginUserDetail = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <Box className={style.container}>
      <Flex>
        <Box margin={"2rem"} w={"50%"}>
          <Link to={"/"}>
            <Tag colorScheme="blue" size={"lg"}>
              Home
            </Tag>
          </Link>
        </Box>
        <Box
          style={{ display: "flex", justifyContent: "space-evenly" }}
          margin={"2rem"}
          w={"50%"}
        >
          <Link to={"/signup"}>
            <Tag colorScheme="blue" size={"lg"}>
              Sign in
            </Tag>
          </Link>
          <Tag size="md" variant="outline" colorScheme="blue" borderRadius="lg">
            <Avatar
              src={loginUserDetail.userImage}
              size="xs"
              name={loginUserDetail.userName}
              ml={-1}
              mr={2}
            />
            <TagLabel>{loginUserDetail.userName}</TagLabel>
          </Tag>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
