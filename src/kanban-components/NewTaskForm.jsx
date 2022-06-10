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
} from "@chakra-ui/react";

function NewTaskForm({ isOpen, onOpen, onClose, data, setData, saveData }) {
  const [selectValue, setSelectValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const handleNewTask = () => {
    saveData(KanbanAPI.insertTask(data, setData, selectValue, contentValue));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select option"
              onChange={(event) => setSelectValue(event.target.value)}
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Input
              placeholder="Description"
              onChange={(event) => setContentValue(event.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={4} onClick={handleNewTask}>
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewTaskForm;
