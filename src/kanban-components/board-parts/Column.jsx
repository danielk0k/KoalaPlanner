import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Heading,
  Text,
  Box,
  Circle,
  Stack,
  Flex,
  Spacer,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

function Column({
  data,
  columnId,
  index,
  newTask,
  deleteTask,
  updateTask,
  deleteColumn,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const column = data.find((col) => col.id === columnId);
  return (
    <>
      <TaskForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        newTask={newTask}
        columnId={columnId}
      />
      <Draggable draggableId={columnId} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <Stack spacing={4} width={{ base: "100%", lg: "350px" }}>
              <Box
                rounded={"lg"}
                boxShadow={"lg"}
                padding={4}
                textColor="#FFFFFF"
                backgroundColor="#34495E"
                {...provided.dragHandleProps}
              >
                <Flex>
                  <HStack spacing={2}>
                    <Heading size="md">{columnId}</Heading>
                    <Circle size="25px" borderWidth="2px" borderColor="#FFFFFF">
                      <Text color="#FFFFFF" fontWeight="bold">
                        {column.items.length}
                      </Text>
                    </Circle>
                  </HStack>
                  <Spacer />
                  <HStack spacing={4}>
                    <AddIcon boxSize={4} onClick={onOpen} />
                    <CloseIcon
                      boxSize={4}
                      onClick={() => deleteColumn(columnId)}
                    />
                  </HStack>
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
          </div>
        )}
      </Draggable>
    </>
  );
}

export default Column;
