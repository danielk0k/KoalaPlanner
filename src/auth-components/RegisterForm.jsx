import supabaseClient from "./supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Square,
  Heading,
  Text,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
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
    <Flex align="center" justifyContent="center">
      <Box
        textAlign="center"
        boxShadow="lg"
        borderRadius="10px"
        borderWidth="1px"
        marginTop="100px"
        padding="30px"
        bgColor="#FFFFFF"
        width="25%"
      >
        <Heading margin="10px">Welcome</Heading>
        <Center>
          <Square size="60px" bg="#2C3E50" borderRadius="10px" margin="10px">
            <Heading textColor="#FFFFFF">K</Heading>
          </Square>
        </Center>
        <form onSubmit={handleRegister}>
          <FormControl marginTop="50px">
            <FormLabel htmlFor="text"></FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              onChange={(event) => setName(event.target.value)}
              padding="10px"
            />
            <FormLabel htmlFor="email"></FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              padding="10px"
              marginTop="20px"
            />
            <FormLabel htmlFor="password"></FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              padding="10px"
              marginTop="20px"
            />
            <Button
              type="submit"
              isLoading={loading}
              loadingText="REGISTERING"
              width="50%"
              marginTop="40px"
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
          </FormControl>
        </form>
        <Text marginTop="40px">
          Already have an account? <Link to="/app/login">Login here</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default RegisterForm;
