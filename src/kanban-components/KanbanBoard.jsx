import { useState, useEffect } from "react";
import supabaseClient from "../auth-components/supabaseClient";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import {
  Heading,
  Flex,
  Box,
  Spacer,
  Stack,
  Button,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";

function Board() {
  const [data, setData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = supabaseClient.auth.session();

  useEffect(() => {
    getData();
  }, [session]);

  const getData = async () => {
    try {
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
      alert(error.message);
      console.log(error.error_description || error.message);
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
      alert("Error in updating board data.");
      console.log(error.error_description || error.message);
    }
  };

  return (
    <>
      <NewTaskForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        saveData={saveData}
      />
      <Stack spacing={8}>
        <Flex>
          <Heading size="2xl">Board</Heading>
          <Spacer />
          <Button onClick={onOpen}>Create New Task</Button>
        </Flex>
        <Flex>
          <Stack spacing={4} width="30%">
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            >
              <Heading size="md">To Do</Heading>
            </Box>
            {data === null ? (
              <Skeleton height="20px" />
            ) : (
              <TaskList data={data} columnId="to_do" />
            )}
          </Stack>
          <Spacer width="20%" />
          <Stack spacing={4} width="30%">
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            >
              <Heading size="md">In Progress</Heading>
            </Box>
            {data === null ? (
              <Skeleton height="20px" />
            ) : (
              <TaskList data={data} columnId="in_progress" />
            )}
          </Stack>
          <Spacer width="20%" />
          <Stack spacing={4} width="30%">
            <Box
              rounded={"lg"}
              backgroundColor="#FFFFFF"
              boxShadow={"lg"}
              borderWidth={1}
              padding={4}
            >
              <Heading size="md">Completed</Heading>
            </Box>
            {data === null ? (
              <Skeleton height="20px" />
            ) : (
              <TaskList data={data} columnId="completed" />
            )}
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}

export default Board;
