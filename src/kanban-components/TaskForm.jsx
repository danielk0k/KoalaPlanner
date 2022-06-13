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
} from "@chakra-ui/react";

function TaskForm({ isOpen, onOpen, onClose, newTask, updateTask, task }) {
  const [selectValue, setSelectValue] = useState("to_do");
  const [titleValue, setTitleValue] = useState(task ? task.content.title : "");
  const [descriptionVal, setDescriptionVal] = useState(
    task ? task.content.description : ""
  );
  const [dateValue, setDateValue] = useState(
    task ? task.content.date : new Date()
  );
  const [colorValue, setColorValue] = useState(
    task ? task.content.color : "#f1c40f"
  );

  const handleNewTask = () => {
    newTask(selectValue, {
      title: titleValue,
      description: descriptionVal,
      date: dateValue,
      color: colorValue,
    });
    setTitleValue("");
    setDescriptionVal("");
    setDateValue(new Date());
    setColorValue("#f1c40f");
    onClose();
  };

  const handleUpdateTask = () => {
    updateTask(task.id, {
      title: titleValue,
      description: descriptionVal,
      date: dateValue,
      color: colorValue,
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
        <ModalBody>
          <Stack spacing={4}>
            {task ? (
              <></>
            ) : (
              <FormControl>
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
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter a title"
                value={titleValue}
                isRequired
                onChange={(event) => setTitleValue(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Enter a description"
                value={descriptionVal}
                isRequired
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
                    borderWidth={2}
                    borderColor={
                      value === colorValue ? "gray.500" : "transparent"
                    }
                  ></Button>
                ))}
              </ButtonGroup>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing={4}>
            <Button onClick={task ? handleUpdateTask : handleNewTask}>
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskForm;
