import supabaseClient from "./supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Square,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { user, error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const { error: upsertError } = await supabaseClient
        .from("profiles")
        .upsert(
          { id: user.id, username: name, updated_at: new Date() },
          { returning: "minimal" } // Don't return the value after inserting
        );

      if (upsertError) {
        throw upsertError;
      }

      alert("Successfully created new user.");
      navigate("/app/profile", { replace: true });
    } catch (error) {
      alert("Error in creating new user.");
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Square size="60px" bg="#2C3E50" rounded={"lg"}>
            <Heading textColor="#FFFFFF">K</Heading>
          </Square>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} textColor="#808080">
            to enjoy all of our cool features
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} borderWidth={1} p={8}>
          <form onSubmit={handleRegister}>
            <Stack spacing={10}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel htmlFor="text">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
              </Stack>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="REGISTERING"
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
                <Text>REGISTER</Text>
              </Button>
              <Text textAlign={"center"}>
                Already have an account? <Link to="/app/login">Login here</Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default RegisterForm;
