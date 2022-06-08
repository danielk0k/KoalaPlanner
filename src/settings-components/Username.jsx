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

function Username() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const user = supabaseClient.auth.user();

  const updateUsername = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

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
    } catch (error) {
      alert("Error in updating profile.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateUsername}>
      <FormControl id="username">
        <FormLabel htmlFor="text">Username</FormLabel>
        <Stack spacing={4}>
          <Input
            id="username"
            type="text"
            placeholder="Enter new username"
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
