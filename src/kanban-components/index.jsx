import React from "react";
import Navbar from "../ui-components/Navbar";
import KanbanAPI from "./KanbanAPI.js";
import { Heading, Flex, Box, Spacer, Stack, HStack } from "@chakra-ui/react";

function index() {
  return (
    <Navbar>
      <Stack spacing={8}>
        <Heading size="2xl">Board</Heading>
        <Flex>
          <Stack spacing={4} width="30%">
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            >
              <Heading size="lg">To Do</Heading>
            </Box>
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            ></Box>
          </Stack>
          <Spacer width="20%" />
          <Stack spacing={4} width="30%">
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            >
              <Heading size="lg">In Progress</Heading>
            </Box>
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            ></Box>
          </Stack>
          <Spacer width="20%" />
          <Stack spacing={4} width="30%">
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            >
              <Heading size="lg">Completed</Heading>
            </Box>
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            ></Box>
          </Stack>
        </Flex>
      </Stack>
    </Navbar>
  );
}

export default index;
