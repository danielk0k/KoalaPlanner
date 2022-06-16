import {
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
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import TaskForm from "./TaskForm";

function TaskCardDialog({
  isOpen,
  onOpen,
  onClose,
  task,
  column,
  deleteTask,
  updateTask,
}) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  return (
    <>
      <TaskForm
        isOpen={isOpenEdit}
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
        updateTask={updateTask}
        task={task}
      />
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
              {task.content.due_date ? (
                <Text>Due by {task.content.due_date}</Text>
              ) : (
                <></>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup spacing={4}>
              {column === "completed" ? (
                <></>
              ) : (
                <Button
                  onClick={() => {
                    onOpenEdit();
                    onClose();
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => {
                  deleteTask(task.id);
                  onClose();
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskCardDialog;
