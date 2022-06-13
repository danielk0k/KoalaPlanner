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
  Text,
  HStack,
} from "@chakra-ui/react";

function Profile() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [data, setData] = useState(null);
  const session = supabaseClient.auth.session();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
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
        setData(
          userData.board_data.length === 0
            ? userData.board_data
            : JSON.parse(userData.board_data)
        );
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
      console.log(error);
      // supabaseClient.auth.signOut();
      // navigate("/app", { replace: true });
    }
  };

  const isInThisWeek = (date) => {
    const taskDate = new Date(date);
    const current = new Date();
    const weekstart = current.getDate() - current.getDay() + 1;
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
                <Heading>Welcome back {username}</Heading>
              </HStack>
              <Stack direction={{ base: "column", lg: "row" }} spacing={8}>
                <HStack>
                  <Box
                    borderColor="#34495E"
                    borderRadius="lg"
                    borderWidth={2}
                    textColor="#34495E"
                    textAlign="center"
                    padding={4}
                  >
                    <Heading>
                      {data === null || data.length === 0
                        ? 0
                        : data.reduce((total, column) => {
                            if (column.id !== "completed") {
                              return total + column.items.length;
                            } else {
                              return total;
                            }
                          }, 0)}
                    </Heading>
                    <Text>TASKS CURRENTLY PENDING</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box
                    borderColor="#34495E"
                    borderRadius="lg"
                    borderWidth={2}
                    textColor="#34495E"
                    textAlign="center"
                    padding={4}
                  >
                    <Heading>
                      {data === null || data.length === 0
                        ? 0
                        : data
                            .find((column) => column.id === "completed")
                            .items.reduce((total, task) => {
                              if (isInThisWeek(task.content.completed_on)) {
                                return total + 1;
                              } else {
                                return total;
                              }
                            }, 0)}
                    </Heading>
                    <Text>TASKS COMPLETED THIS WEEK</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box
                    borderColor="#34495E"
                    borderRadius="lg"
                    borderWidth={2}
                    textColor="#34495E"
                    textAlign="center"
                    padding={4}
                  >
                    <Heading>
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
                    </Heading>
                    <Text>TASKS DUE THIS WEEK</Text>
                  </Box>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Navbar>
  );
}

export default Profile;
