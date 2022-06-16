import { useState, useEffect } from "react";
import supabaseClient from "../auth-components/supabaseClient";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Column from "./board-parts/Column";
import TaskForm from "./board-parts/TaskForm";
import KanbanAPI from "./KanbanAPI.js";
import {
  Heading,
  Flex,
  Spacer,
  Stack,
  Button,
  Skeleton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

function KanbanBoard() {
  const [data, setData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = supabaseClient.auth.session();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getData();
  }, [session]);

  const getData = async () => {
    try {
      if (!session) {
        navigate("/app", { replace: true });
        throw new Error("No session found.");
      }

      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select("board_data")
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data.board_data.length === 0) {
        // Default data
        setData([
          {
            id: "to_do",
            items: [],
          },
          {
            id: "in_progress",
            items: [],
          },
          {
            id: "completed",
            items: [],
          },
        ]);
      } else {
        setData(JSON.parse(data.board_data));
      }
    } catch (error) {
      toast({
        title: "Error in retrieving board data.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const saveData = async (data) => {
    try {
      const user = supabaseClient.auth.user();

      const updates = {
        id: user.id,
        board_data: JSON.stringify(data),
        updated_at: new Date(),
      };

      const { error } = await supabaseClient
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Error in updating board data.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const handleOnDragEnd = (result) => {
    /*
      Some notes here:
        destination/ source: {
          droppableId => columnId
          index => position in column.items list
        }
        draggableId => taskId
    */
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return; // Do nothing
    }

    saveData(KanbanAPI.moveTask(data, setData, destination, source));
  };

  const handleNewTask = (columnId, newContent) => {
    saveData(KanbanAPI.insertTask(data, setData, columnId, newContent));
  };

  const handleDeleteTask = (taskId) => {
    saveData(KanbanAPI.deleteTask(data, setData, taskId));
  };

  const handleUpdateTask = (taskId, newContent) => {
    saveData(KanbanAPI.updateTask(data, setData, taskId, newContent));
  };

  const columnList = [
    { id: "to_do", title: "To Do" },
    { id: "in_progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];

  return (
    <>
      <TaskForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        newTask={handleNewTask}
      />
      <Stack spacing={8}>
        <Flex>
          <Heading size="2xl">Board</Heading>
          <Spacer />
          <Button
            onClick={onOpen}
            backgroundColor="#f8f9fe"
            textColor="#34495E"
            borderColor="#34495E"
            borderWidth="1px"
          >
            Create New Task
          </Button>
        </Flex>
        {data === null ? (
          <Skeleton height="50px" />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Stack direction={{ base: "column", lg: "row" }} spacing={6}>
              {columnList.map((value) => (
                <Column
                  key={value.id}
                  data={data}
                  columnId={value.id}
                  columnName={value.title}
                  deleteTask={handleDeleteTask}
                  updateTask={handleUpdateTask}
                />
              ))}
            </Stack>
          </DragDropContext>
        )}
      </Stack>
    </>
  );
}

export default KanbanBoard;
