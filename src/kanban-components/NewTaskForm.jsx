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
  const [titleValue, setTitleValue] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [dateValue, setDateValue] = useState(new Date());

  const handleNewTask = () => {
    saveData(
      KanbanAPI.insertTask(data, setData, selectValue, {
        title: titleValue,
        description: descriptionVal,
        date: dateValue,
      })
    );
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
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter a title"
              onChange={(event) => setTitleValue(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Enter a description"
              onChange={(event) => setDescriptionVal(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Due by</FormLabel>
            <input
              type="date"
              onChange={(event) => setDateValue(event.target.value)}
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
