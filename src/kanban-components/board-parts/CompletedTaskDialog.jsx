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
  ButtonGroup,
} from "@chakra-ui/react";

function CompletedTaskDialog({
  isOpen,
  onOpen,
  onClose,
  completedTasks,
  clearTask,
}) {
  const btnRef = React.useRef();
  const clearAllTask = () => {
    if (window.confirm("Are you sure you want to clear all completed tasks?")) {
      clearTask();
      onClose();
    }
  };

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
          <ButtonGroup spacing={4}>
            <Button variant="outline" colorScheme="red" onClick={clearAllTask}>
              Clear All
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CompletedTaskDialog;
