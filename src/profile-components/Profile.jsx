import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import Navbar from "../ui-components/Navbar";
import { Heading, Flex, Stack, Box } from "@chakra-ui/react";

function Profile() {
  const [username, setUsername] = useState("");
  const session = supabaseClient.auth.session();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`username`)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
      supabaseClient.auth.signOut();
      navigate("/app", { replace: true });
    }
  };

  return (
    <Navbar>
      <Flex>
        <Stack spacing={8}>
          <Heading size="2xl">Profile</Heading>
          <Box
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            p={8}
          >
            <Stack spacing={8}>
              <Heading size="md">View your achievements and statistics</Heading>
              <Heading>Welcome back {username}</Heading>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Navbar>
  );
}

export default Profile;
