import {
  Box,
  Text,
  Heading,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import "./Shaking.css";

function TaskCard({ task, index, deleteTask }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">{task.content.title}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text>{task.content.description}</Text>
              {task.content.date ? (
                <Text>Due by {task.content.date}</Text>
              ) : (
                <></>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing={4}>
              <Button
                onClick={() => {
                  deleteTask(task.id);
                  onClose();
                }}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box
              className={snapshot.isDragging ? "TaskCard" : ""}
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              padding={4}
              borderRightWidth="10px"
              borderRightColor={
                task.content.color ? task.content.color : "transparent"
              }
              onClick={onOpen}
            >
              <Stack spacing={4}>
                <Heading size="md">{task.content.title}</Heading>
                <Text>{task.content.description}</Text>
                {task.content.date ? (
                  <Text>Due by {task.content.date}</Text>
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default TaskCard;
