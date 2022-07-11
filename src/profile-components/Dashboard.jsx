import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import Navbar from "../ui-components/Navbar";
import TableView from "./TableView";
import {
  Heading,
  Flex,
  Stack,
  Box,
  Avatar,
  HStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Skeleton,
} from "@chakra-ui/react";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [data, setData] = useState(null);
  const session = supabaseClient.auth.session();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      if (!session) {
        navigate("/app", { replace: true });
        throw new Error("No session found.");
      }

      let {
        data: userData,
        error,
        status,
      } = await supabaseClient
        .from("profiles")
        .select("username, avatar_url, board_data")
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (userData) {
        setUsername(userData.username);
        setData(userData.board_data ? JSON.parse(userData.board_data) : []);
      }

      if (userData.avatar_url) {
        const { data, error } = await supabaseClient.storage
          .from("avatars")
          .download(userData.avatar_url);

        if (error) {
          throw error;
        }

        setAvatarUrl(URL.createObjectURL(data));
      }
    } catch (error) {
      toast({
        title: "Error in retrieving user data.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const isInThisWeek = (date) => {
    const taskDate = new Date(date);
    const current = new Date();
    const weekstart =
      current.getDate() - (current.getDay() === 0 ? 7 : current.getDay()) + 1;
    const weekend = weekstart + 6;
    if (
      taskDate.getFullYear() === current.getFullYear() &&
      taskDate.getMonth() === current.getMonth()
    ) {
      return taskDate.getDate() >= weekstart && taskDate.getDate() <= weekend;
    } else {
      return false;
    }
  };

  const dueThisWk = data
    ? data.flatMap((column) => {
        if (column.id === "completed") {
          return [];
        } else {
          return column.items.filter((task) =>
            isInThisWeek(task.content.due_date)
          );
        }
      })
    : [];

  const completedThisWk =
    data && data.length > 0
      ? data[0].items.filter((task) => isInThisWeek(task.content.completed_on))
      : [];

  return (
    <Navbar>
      <Stack spacing={8}>
        <Heading size="2xl">Profile</Heading>
        <Flex>
          <Box
            rounded={"lg"}
            backgroundColor="#FFFFFF"
            boxShadow={"lg"}
            borderWidth={1}
            padding={8}
            width="100%"
          >
            <Stack spacing={8}>
              <Heading size="md">View your achievements and statistics</Heading>
              <HStack spacing={8}>
                <Avatar size="2xl" src={avatarUrl} />
                <Stack>
                  <Heading size="lg">Welcome back</Heading>
                  <Heading>{username}</Heading>
                </Stack>
              </HStack>
              <Tabs>
                <TabList>
                  <Tab fontWeight="bold">Due This Week</Tab>
                  <Tab fontWeight="bold">Completed This Week</Tab>
                </TabList>
                {data ? (
                  <TabPanels>
                    <TabPanel>
                      <TableView tasks={dueThisWk} type="due" />
                    </TabPanel>
                    <TabPanel>
                      <TableView tasks={completedThisWk} type="completed" />
                    </TabPanel>
                  </TabPanels>
                ) : (
                  <Skeleton height="40px" />
                )}
              </Tabs>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Navbar>
  );
}

export default Dashboard;
