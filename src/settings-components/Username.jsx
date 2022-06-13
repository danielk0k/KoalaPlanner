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

function Username() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const user = supabaseClient.auth.user();
  const toast = useToast();

  const updateUsername = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (username.length === 0) {
        throw new Error("Please enter a username.");
      }

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      const { error } = await supabaseClient
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }

      toast({
        title: "Username successfully updated.",
        description: `Hello ${username}`,
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error in updating username.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
      setUsername("");
    }
  };

  return (
    <form onSubmit={updateUsername}>
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Stack spacing={4}>
          <Input
            id="username"
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
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
      </FormControl>
    </form>
  );
}

export default Username;
