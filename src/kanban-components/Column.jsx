import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import { Heading, Box, Stack } from "@chakra-ui/react";

function Column({ data, columnId, columnName }) {
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
        <Heading size="md">{columnName}</Heading>
      </Box>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Stack spacing={4}>
              {column.items.map((task, index) => (
                <TaskCard task={task} index={index} key={task.id} />
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
