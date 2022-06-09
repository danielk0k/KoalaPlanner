import React from "react";
import { useToast } from "@chakra-ui/toast";

function Notifier({ title, description, status }) {
  const toast = useToast();
  const message = () =>
    toast({
      title: title,
      description: description,
      status: status,
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });

  return message();
}

export default Notifier;
