import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react";

function CompletedTaskDialog({ isOpen, onOpen, onClose, completedTasks }) {
  const btnRef = React.useRef();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Completed Tasks</DrawerHeader>
        <DrawerBody>
          <Stack spacing={4}>
            {completedTasks.map((task, index) => (
              <Box key={task.id}>
                <Stack spacing={2}>
                  <Text fontWeight="bold" fontSize="lg">
                    {index + 1}. {task.content.title}
                  </Text>
                  <Text>{task.content.description}</Text>
                  <Text color="grey">
                    Completed on:{" "}
                    {new Date(task.content.completed_on).toDateString()}
                  </Text>
                </Stack>
              </Box>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CompletedTaskDialog;
