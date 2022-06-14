import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import {
  Heading,
  Text,
  Box,
  Circle,
  Stack,
  Flex,
  Spacer,
} from "@chakra-ui/react";

function Column({ data, columnId, columnName, deleteTask, updateTask }) {
  const column = data.find((col) => col.id === columnId);
  return (
    <Stack spacing={4} width={{ base: "100%", lg: "33%" }}>
      <Box
        rounded={"lg"}
        boxShadow={"lg"}
        padding={4}
        textColor="#FFFFFF"
        backgroundColor="#34495E"
      >
        <Flex>
          <Heading size="md">{columnName}</Heading>
          <Spacer />
          <Circle size="25px" borderWidth="2px" borderColor="#FFFFFF">
            <Text color="#FFFFFF" fontWeight="bold">
              {column.items.length}
            </Text>
          </Circle>
        </Flex>
      </Box>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Stack spacing={4}>
              {column.items.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  column={columnId}
                  index={index}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
              {provided.placeholder}
            </Stack>
          </div>
        )}
      </Droppable>
    </Stack>
  );
}

export default Column;
