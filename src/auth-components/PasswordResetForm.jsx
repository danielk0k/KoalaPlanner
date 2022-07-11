import supabaseClient from "./supabaseClient";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Flex,
  Box,
  Square,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

function PasswordResetForm() {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const access_token = location.state.token;
  const isError = rePassword !== newPassword && rePassword !== "";

  const handlePwdReset = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.api.updateUser(access_token, {
        password: newPassword,
      });

      if (error) {
        throw error;
      }
      toast({
        title: "Password has been reset.",
        description: "You may log in now.",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Password could not be reset.",
        description: "Please try again.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
      navigate("/app/signout", { replace: true });
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Square size="60px" bg="#2C3E50" rounded={"lg"}>
            <Heading textColor="#FFFFFF">K</Heading>
          </Square>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Password Reset
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          backgroundColor="#FFFFFF"
          boxShadow={"lg"}
          borderWidth={1}
          p={8}
        >
          <form onSubmit={handlePwdReset}>
            <Stack spacing={10}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel htmlFor="password">Re-Enter Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(event) => setRePassword(event.target.value)}
                  />
                  {isError ? (
                    <FormErrorMessage>
                      New password does not match.
                    </FormErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
              </Stack>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="SUBMITTING"
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
                <Text>SUBMIT</Text>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default PasswordResetForm;
