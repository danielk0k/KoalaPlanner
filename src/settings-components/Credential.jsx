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
  useToast,
} from "@chakra-ui/react";

function Credential() {
  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const updateCredential = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      var updatePayload;

      if (password.length === 0 && email.length === 0) {
        throw new Error("Please enter something.");
      } else if (password.length === 0) {
        updatePayload = { email: email };
      } else if (email.length === 0) {
        updatePayload = { password: password };
      } else {
        updatePayload = { email: email, password: password };
      }

      const { error } = await supabaseClient.auth.update(updatePayload);

      if (error) {
        throw error;
      }

      toast({
        title: "Credentials successfully updated.",
        description:
          email.length === 0
            ? "Try not to lose your password!"
            : "You will receive an email confirmation for the new address.",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error in updating credential.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={updateCredential}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter new email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            minLength="6"
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
