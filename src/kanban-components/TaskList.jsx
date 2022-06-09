import React from "react";
import { Box, Text } from "@chakra-ui/react";

function TaskList({ data, columnId }) {
  const column = data.find((col) => col.id === columnId);
  return column.items.map((task) => (
    <Box
      rounded={"lg"}
      backgroundColor="#FFFFFF"
      boxShadow={"lg"}
      borderWidth={1}
      padding={4}
      key={task.id}
    >
      <Text>{task.content}</Text>
    </Box>
  ));
}

export default TaskList;
