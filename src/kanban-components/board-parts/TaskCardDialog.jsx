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
import { CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import TaskForm from "./TaskForm";

function TaskCardDialog({
  isOpen,
  onOpen,
  onClose,
  task,
  column,
  deleteTask,
  updateTask,
  completedTask,
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
              <Button
                leftIcon={<EditIcon />}
                colorScheme="blue"
                onClick={() => {
                  onOpenEdit();
                  onClose();
                }}
              >
                Edit
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => {
                  deleteTask(task.id);
                  onClose();
                }}
              >
                Delete
              </Button>
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="green"
                onClick={() => completedTask(task.id)}
              >
                Completed
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskCardDialog;
