import React from "react";
import ProfilePicture from "./Avatar";
import Username from "./Username";
import Credential from "./Credential";
import Navbar from "../ui-components/Navbar";
import { Heading, Text, Stack, Flex, Divider, Box } from "@chakra-ui/react";

function Settings() {
  return (
    <Navbar>
      <Flex>
        <Stack spacing={8}>
          <Heading size="2xl">Settings</Heading>
          <Box
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            p={8}
          >
            <Stack spacing={8}>
              <Heading size="md">Update your account information</Heading>
              <ProfilePicture />
              <Username />
              <Divider />
              <Credential />
            </Stack>
          </Box>
          <Box
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            p={8}
          >
            <Text>A NUS Orbital Project Summer AY21/22</Text>
          </Box>
        </Stack>
      </Flex>
    </Navbar>
  );
}

export default Settings;
