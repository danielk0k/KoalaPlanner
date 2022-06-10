import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import "./Shaking.css";

function TaskCard({ task, index }) {
  const [shakingClass, setShakingClass] = useState("");

  const setEditable = () => {
    setShakingClass("TaskCard");
  };
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            className={shakingClass}
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            padding={4}
            onDoubleClick={setEditable}
          >
            <Text>{task.content}</Text>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
