import { useState } from "react";
import KanbanAPI from "./KanbanAPI.js";
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

function NewTaskForm({ isOpen, onOpen, onClose, data, setData, saveData }) {
  const [selectValue, setSelectValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [dateValue, setDateValue] = useState(new Date());
  const [colorValue, setColorValue] = useState("");

  const handleNewTask = () => {
    saveData(
      KanbanAPI.insertTask(data, setData, selectValue, {
        title: titleValue,
        description: descriptionVal,
        date: dateValue,
        color: colorValue,
      })
    );
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
    "#34495e",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
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
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter a title"
                isRequired
                onChange={(event) => setTitleValue(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Enter a description"
                isRequired
                onChange={(event) => setDescriptionVal(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due by</FormLabel>
              <Input
                type="date"
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
            <Button onClick={handleNewTask}>Save</Button>
            <Button onClick={onClose}>Close</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewTaskForm;
