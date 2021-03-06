import { Box, Text, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import "./Shaking.css";
import TaskCardDialog from "./TaskCardDialog";

function TaskCard({
  task,
  column,
  index,
  deleteTask,
  updateTask,
  completedTask,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <TaskCardDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        task={task}
        column={column}
        deleteTask={deleteTask}
        updateTask={updateTask}
        completedTask={completedTask}
      />
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
                {task.content.due_date ? (
                  <Text>Due by {task.content.due_date}</Text>
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
