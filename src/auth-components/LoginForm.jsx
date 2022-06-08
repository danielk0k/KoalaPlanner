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

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      alert("Successfully logged in.");
      navigate("/app/profile", { replace: true });
    } catch (error) {
      alert("Error in logging in.");
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
            Sign in
          </Heading>
          <Text fontSize={"lg"} textColor="#808080">
            to enjoy all of our cool features
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} borderWidth={1} p={8}>
          <form onSubmit={handleLogin}>
            <Stack spacing={10}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>
                <Text textColor={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="LOGGING IN"
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
                <Text>LOGIN</Text>
              </Button>
              <Text textAlign={"center"}>
                Don't have an account? <Link to="/app/signup">Sign Up</Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default LoginForm;
