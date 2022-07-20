import React from "react";
import ProfilePicture from "./Avatar";
import Username from "./Username";
import Credential from "./Credential";
import Navbar from "../ui-components/Navbar";
import { Heading, Text, Stack, Divider, Box, Spacer } from "@chakra-ui/react";

function Settings() {
  return (
    <Navbar>
      <Heading size="2xl">Settings</Heading>
      <Spacer height={8} />
      <Stack direction={{ base: "column", lg: "row" }} spacing={6}>
        <Box
          rounded={"lg"}
          backgroundColor="#FFFFFF"
          boxShadow={"lg"}
          borderWidth={1}
          padding={8}
          width={{ base: "100%", lg: "70%" }}
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
          padding={8}
          width={{ base: "100%", lg: "30%" }}
        >
          <Heading size="lg" marginBottom={4}>
            About Us
          </Heading>
          <Text marginBottom={4}>
            The Koala Planner is an NUS Orbital Project for Summer AY21/22 done
            by Daniel Kok and Grace Yeh.
          </Text>
          <Text>App version 2.0</Text>
        </Box>
      </Stack>
    </Navbar>
  );
}

export default Settings;
