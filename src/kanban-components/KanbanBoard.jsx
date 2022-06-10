import { useState, useEffect } from "react";
import supabaseClient from "../auth-components/supabaseClient";
import Column from "./Column";
import NewTaskForm from "./NewTaskForm";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Heading,
  Flex,
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

  const handleOnDragEnd = (result) => {
    // TODO
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
        {data === null ? (
          <Skeleton height="50px" />
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Flex>
              <Stack spacing={4} width="30%">
                <Column data={data} columnId="to_do" columnName="To Do" />
              </Stack>
              <Spacer width="20%" />
              <Stack spacing={4} width="30%">
                <Column
                  data={data}
                  columnId="in_progress"
                  columnName="In Progress"
                />
              </Stack>
              <Spacer width="20%" />
              <Stack spacing={4} width="30%">
                <Column
                  data={data}
                  columnId="completed"
                  columnName="Completed"
                />
              </Stack>
            </Flex>
          </DragDropContext>
        )}
      </Stack>
    </>
  );
}

export default Board;
