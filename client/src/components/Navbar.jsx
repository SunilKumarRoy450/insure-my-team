import React from "react";
import style from "./Navbar.module.css";
import { TbHomePlus } from "react-icons/tb";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Flex, IconButton, Tag, TagLabel } from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate();
  const loginUserDetail = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <Box className={style.container}>
      <Flex>
        <Box margin={"2rem"} w={"50%"}></Box>
        <Box
          style={{ display: "flex", justifyContent: "space-evenly" }}
          margin={"2rem"}
          w={"50%"}
        >
          <IconButton
            onClick={() => navigate("/")}
            variant="outline"
            aria-label="See menu"
            icon={<TbHomePlus color="white" />}
          />

          <IconButton
            onClick={() => navigate("/create/blog")}
            variant="outline"
            aria-label="See menu"
            icon={<FaSignInAlt color="white" />}
          />

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
