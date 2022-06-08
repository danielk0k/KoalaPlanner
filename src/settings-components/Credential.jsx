import React from "react";
import { useState } from "react";
import supabaseClient from "../auth-components/supabaseClient";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";

function Credential() {
  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateCredential = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { user, error } = await supabaseClient.auth.update({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert("Error in updating credential.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateCredential}>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel htmlFor="text">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter new email address"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel htmlFor="text">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          isLoading={loading}
          loadingText="SAVING"
          textColor="#FFFFFF"
          bgColor="#34495E"
          borderWidth="1px"
          _hover={{
            backgroundColor: "#FFFFFF",
            textColor: "#34495E",
            borderColor: "#34495E",
            borderWidth: "1px",
          }}
        >
          <Text>SAVE</Text>
        </Button>
      </Stack>
    </form>
  );
}

export default Credential;
