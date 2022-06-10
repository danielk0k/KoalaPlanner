import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import "./Shaking.css";

function TaskCard({ task }) {
  const [shakingClass, setShakingClass] = useState("");

  const setEditable = () => {
    setShakingClass("TaskCard");
  };
  return (
    <Box
      className={shakingClass}
      rounded={"lg"}
      backgroundColor="#FFFFFF"
      boxShadow={"lg"}
      borderWidth={1}
      padding={4}
      key={task.id}
      onDoubleClick={setEditable}
    >
      <Text>
        {task.content} {task.id}
      </Text>
    </Box>
  );
}

export default TaskCard;
