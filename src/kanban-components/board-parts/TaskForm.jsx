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
  Select,
  Input,
  Button,
  Stack,
  ButtonGroup,
  Container,
} from "@chakra-ui/react";

function TaskForm({ isOpen, onOpen, onClose, newTask, updateTask, task }) {
  const [selectValue, setSelectValue] = useState("to_do");
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

  const handleNewTask = () => {
    newTask(selectValue, {
      title: titleValue,
      description: descriptionVal,
      due_date: dateValue,
      color: colorValue,
      completed_on: selectValue !== "completed" ? "" : new Date().toISOString(),
    });
    setTitleValue("");
    setDescriptionVal("");
    setDateValue(new Date().toJSON().slice(0, 10));
    setColorValue("#f1c40f");
    onClose();
  };

  const handleUpdateTask = () => {
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
        <ModalHeader>{task ? "Edit Task" : "Create New Task"}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={task ? handleUpdateTask : handleNewTask}>
          <ModalBody>
            <Stack spacing={4}>
              {task ? (
                <></>
              ) : (
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={(event) => setSelectValue(event.target.value)}
                    isRequired
                  >
                    <option value="to_do">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              )}
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
                <Container overflow="scroll" padding={2}>
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
              <Button type="submit">Save</Button>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default TaskForm;
