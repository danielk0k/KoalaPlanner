import supabaseClient from "./supabaseClient";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
  Text,
  useToast,
} from "@chakra-ui/react";

function PasswordResetEmail({ isOpen, onOpen, onClose }) {
  const user = supabaseClient.auth.user();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user ? user.email : "");
  const toast = useToast();

  const handleResetPwd = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.api.resetPasswordForEmail(
        email
      );
      if (error) {
        throw error;
      }
      toast({
        title: "A password reset email has been sent.",
        description: "Please check your inbox/ spam.",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Please try again.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Password Reset</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleResetPwd}>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormHelperText>
                An email will be sent to reset your password.
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing={4}>
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
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default PasswordResetEmail;
