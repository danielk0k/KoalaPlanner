import { Box, Text, Heading, Stack } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import "./Shaking.css";

function TaskCard({ task, index }) {
  return (
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
            borderWidth={1}
            padding={4}
          >
            <Stack spacing={4}>
              <Heading size="md">{task.content.title}</Heading>
              <Text>{task.content.description}</Text>
              <Text>Due by {task.content.date}</Text>
            </Stack>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
