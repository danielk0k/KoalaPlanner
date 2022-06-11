import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import { Heading, Text, Box, Circle, Stack, HStack } from "@chakra-ui/react";

function Column({ data, columnId, columnName, deleteTask }) {
  const column = data.find((col) => col.id === columnId);
  return (
    <>
      <Box
        rounded={"lg"}
        backgroundColor="#FFFFFF"
        boxShadow={"lg"}
        borderWidth={1}
        padding={4}
      >
        <HStack>
          <Heading size="md">{columnName}</Heading>
          <Circle size="25px" borderWidth="1px" borderColor="gray.500">
            <Text color="gray.500">{column.items.length}</Text>
          </Circle>
        </HStack>
      </Box>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Stack spacing={4}>
              {column.items.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  deleteTask={deleteTask}
                />
              ))}
              {provided.placeholder}
            </Stack>
          </div>
        )}
      </Droppable>
    </>
  );
}

export default Column;
