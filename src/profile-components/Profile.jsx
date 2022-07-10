import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import Navbar from "../ui-components/Navbar";
import {
  Heading,
  Flex,
  Stack,
  Box,
  Avatar,
  HStack,
  Stat,
  StatGroup,
  StatNumber,
  StatLabel,
  useToast,
} from "@chakra-ui/react";

function Profile() {
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
              <Heading size="lg">Task Breakdown</Heading>
              <StatGroup>
                <Stat textAlign="center">
                  <StatNumber fontSize="4xl">
                    {data === null || data.length === 0
                      ? 0
                      : data.reduce((total, column) => {
                          if (column.id !== "completed") {
                            return total + column.items.length;
                          } else {
                            return total;
                          }
                        }, 0)}
                  </StatNumber>
                  <StatLabel fontSize="lg">Currently Pending</StatLabel>
                </Stat>
                <Stat textAlign="center">
                  <StatNumber fontSize="4xl">
                    {data === null || data.length === 0
                      ? 0
                      : data.reduce((total, column) => {
                          if (column.id !== "completed") {
                            return (
                              total +
                              column.items.reduce((subtotal, task) => {
                                if (isInThisWeek(task.content.due_date)) {
                                  return subtotal + 1;
                                } else {
                                  return subtotal;
                                }
                              }, 0)
                            );
                          } else {
                            return total;
                          }
                        }, 0)}
                  </StatNumber>
                  <StatLabel fontSize="lg">Due This Week</StatLabel>
                </Stat>
                <Stat textAlign="center">
                  <StatNumber fontSize="4xl">
                    {data === null || data.length === 0
                      ? 0
                      : data[0].items.reduce((total, task) => {
                          if (isInThisWeek(task.content.completed_on)) {
                            return total + 1;
                          } else {
                            return total;
                          }
                        }, 0)}
                  </StatNumber>
                  <StatLabel fontSize="lg">Completed This Week</StatLabel>
                </Stat>
              </StatGroup>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Navbar>
  );
}

export default Profile;
