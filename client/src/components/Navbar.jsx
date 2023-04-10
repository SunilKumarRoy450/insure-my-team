import React from "react";
import style from "./Navbar.module.css";
import { TbHomePlus } from "react-icons/tb";
import { FaSignInAlt } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
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
            className={style.home}
            onClick={() => navigate("/")}
            variant="outline"
            aria-label="See menu"
            icon={<TbHomePlus color="white" />}
          />

          <IconButton
            className={style.create}
            onClick={() => navigate("/create/blog")}
            variant="outline"
            aria-label="See menu"
            icon={<AiOutlinePlusSquare color="white" />}
          />

          <IconButton
            className={style.signin}
            onClick={() => navigate("/create/blog")}
            variant="outline"
            aria-label="See menu"
            icon={<FaSignInAlt color="white" />}
          />

          <Tag  size="md" variant="outline" colorScheme="blue" borderRadius="lg">
            <Avatar
              src={loginUserDetail.image}
              size="xs"
              name={loginUserDetail.name}
              ml={-1}
              mr={2}
            />
            <TagLabel>{loginUserDetail.name}</TagLabel>
          </Tag>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
