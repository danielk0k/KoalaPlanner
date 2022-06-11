import React from "react";
import ProfilePicture from "./Avatar";
import Username from "./Username";
import Credential from "./Credential";
import Navbar from "../ui-components/Navbar";
import {
  Heading,
  Text,
  Stack,
  Flex,
  Divider,
  Box,
  Spacer,
} from "@chakra-ui/react";

function Settings() {
  return (
    <Navbar>
      <Stack spacing={8}>
        <Heading size="2xl">Settings</Heading>
        <Flex>
          <Box
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            padding={8}
            width="70%"
          >
            <Stack spacing={8}>
              <Heading size="md">Update your account information</Heading>
              <ProfilePicture />
              <Username />
              <Divider />
              <Credential />
            </Stack>
          </Box>
          <Spacer width="5%" />
          <Box
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            padding={8}
            width="25%"
          >
            <Heading size="lg" marginBottom={4}>
              About Us
            </Heading>
            <Text marginBottom={4}>
              The Koala Planner is an NUS Orbital Project for Summer AY21/22
              done by Daniel Kok and Grace Yeh.
            </Text>
            <Text>App version 1.0</Text>
          </Box>
        </Flex>
      </Stack>
    </Navbar>
  );
}

export default Settings;
