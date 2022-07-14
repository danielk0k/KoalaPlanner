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
  Input,
  Button,
  Stack,
  ButtonGroup,
  Container,
} from "@chakra-ui/react";

function TaskForm({
  isOpen,
  onOpen,
  onClose,
  newTask,
  updateTask,
  task,
  columnId,
}) {
  const [titleValue, setTitleValue] = useState(task ? task.content.title : "");
  const [descriptionVal, setDescriptionVal] = useState(
    task ? task.content.description : ""
  );
  const [dateValue, setDateValue] = useState(
    task ? task.content.due_date : new Date().toJSON().slice(0, 10)
  );
  const [colorValue, setColorValue] = useState(
    task ? task.content.color : "#f1c40f"
  );

  const handleNewTask = (event) => {
    event.preventDefault();
    newTask(columnId, {
      title: titleValue,
      description: descriptionVal,
      due_date: dateValue,
      color: colorValue,
      completed_on: columnId !== "completed" ? "" : new Date().toISOString(),
    });
    setTitleValue("");
    setDescriptionVal("");
    setDateValue(new Date().toJSON().slice(0, 10));
    setColorValue("#f1c40f");
    onClose();
  };

  const handleUpdateTask = (event) => {
    event.preventDefault();
    updateTask(task.id, {
      title: titleValue,
      description: descriptionVal,
      due_date: dateValue,
      color: colorValue,
      completed_on: "",
    });
    onClose();
  };

  const colors = [
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#2c3e50",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {task ? "Edit Task" : `Create New Task for ${columnId}`}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={task ? handleUpdateTask : handleNewTask}>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter a title"
                  value={titleValue}
                  onChange={(event) => setTitleValue(event.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter a description"
                  value={descriptionVal}
                  onChange={(event) => setDescriptionVal(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Due by</FormLabel>
                <Input
                  type="date"
                  value={dateValue}
                  onChange={(event) => setDateValue(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tag colour</FormLabel>
                <Container overflow="auto" padding={2}>
                  <ButtonGroup
                    spacing={4}
                    variant="solid"
                    onClick={(event) => setColorValue(event.target.value)}
                  >
                    {colors.map((value) => (
                      <Button
                        key={value}
                        borderRadius={50}
                        backgroundColor={value}
                        value={value}
                        borderWidth={3}
                        borderColor={
                          value === colorValue ? "gray.300" : "transparent"
                        }
                      ></Button>
                    ))}
                  </ButtonGroup>
                </Container>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing={4}>
              <Button type="submit" variant="outline">
                Save
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default TaskForm;
