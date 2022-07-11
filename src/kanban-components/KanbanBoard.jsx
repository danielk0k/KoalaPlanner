import React, { useState, useEffect } from "react";
import supabaseClient from "../auth-components/supabaseClient";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import Column from "./board-parts/Column";
import ColumnForm from "./board-parts/ColumnForm";
import CompletedTaskDialog from "./board-parts/CompletedTaskDialog";
import KanbanAPI from "./KanbanAPI.js";
import {
  Heading,
  Flex,
  Spacer,
  Stack,
  IconButton,
  Skeleton,
  useToast,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";

function KanbanBoard() {
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const session = supabaseClient.auth.session();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isOpenColumn,
    onOpen: onOpenColumn,
    onClose: onCloseColumn,
  } = useDisclosure();
  const {
    isOpen: isOpenCompleted,
    onOpen: onOpenCompleted,
    onClose: onCloseCompleted,
  } = useDisclosure();

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

      if (!data.board_data) {
        // Default data
        setData([
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
    const { destination, source, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return; // Do nothing
    }
    if (type === "column") {
      saveData(KanbanAPI.moveColumn(data, setData, destination, source));
    } else {
      saveData(KanbanAPI.moveTask(data, setData, destination, source));
    }
  };

  const handleNewTask = (columnId, newContent) => {
    saveData(KanbanAPI.insertTask(data, setData, columnId, newContent));
  };

  const handleNewColumn = (columnId) => {
    if (columnId) {
      saveData(KanbanAPI.insertNewColumn(data, setData, columnId));
    }
  };

  const handleDeleteTask = (taskId) => {
    saveData(KanbanAPI.deleteTask(data, setData, taskId));
  };

  const handleDeleteColumn = (columnId) => {
    if (window.confirm(`Do you really want to delete ${columnId}?`)) {
      saveData(KanbanAPI.deleteColumn(data, setData, columnId));
    }
  };

  const handleUpdateTask = (taskId, newContent) => {
    saveData(KanbanAPI.updateTask(data, setData, taskId, newContent));
  };

  const handleCompletedTask = (taskId) => {
    saveData(KanbanAPI.completedTask(data, setData, taskId));
  };

  const handleClearCompletedTask = () => {
    data[0].items = [];
    setData(data);
    saveData(data);
  };

  const mobileView = window.matchMedia("(max-width: 62em)");
  mobileView.addEventListener("change", (e) => setIsMobile(e.matches));

  return (
    <>
      <ColumnForm
        isOpen={isOpenColumn}
        onOpen={onOpenColumn}
        onClose={onCloseColumn}
        newColumn={handleNewColumn}
      />
      <CompletedTaskDialog
        isOpen={isOpenCompleted}
        onOpen={onOpenCompleted}
        onClose={onCloseCompleted}
        completedTasks={data === null ? [] : data[0].items}
        clearTask={handleClearCompletedTask}
      />
      <Stack spacing={8}>
        <Flex>
          <Heading size="2xl">Board</Heading>
          <Spacer />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem icon={<AddIcon />} onClick={onOpenColumn}>
                Create New Column
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} onClick={onOpenCompleted}>
                Show Completed
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {data ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable
              direction={isMobile ? "vertical" : "horizontal"}
              type="column"
              droppableId="all_columns"
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Stack
                    direction={{ base: "column", lg: "row" }}
                    spacing={6}
                    overflow="scroll"
                  >
                    {data.map((value, index) =>
                      value.id === "completed" ? (
                        <React.Fragment key={value.id + index}></React.Fragment>
                      ) : (
                        <Column
                          key={value.id}
                          data={data}
                          columnId={value.id}
                          index={index}
                          newTask={handleNewTask}
                          deleteTask={handleDeleteTask}
                          updateTask={handleUpdateTask}
                          completedTask={handleCompletedTask}
                          deleteColumn={handleDeleteColumn}
                        />
                      )
                    )}
                    {provided.placeholder}
                  </Stack>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <Skeleton height="40px" />
        )}
      </Stack>
    </>
  );
}

export default KanbanBoard;
