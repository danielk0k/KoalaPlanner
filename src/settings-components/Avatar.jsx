import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import { Avatar, Text, VStack, Stack, useToast } from "@chakra-ui/react";

export default function ProfilePicture() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFilePath, setAvatarFilePath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = supabaseClient.auth.user();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getAvatarImage();
  }, [uploading]);

  const getAvatarImage = async () => {
    try {
      if (!user) {
        navigate("/app", { replace: true });
        throw new Error("No session found.");
      }

      let {
        data: userData,
        error,
        status,
      } = await supabaseClient.from("profiles").select("avatar_url").single();

      if (error && status !== 406) {
        throw error;
      }

      if (userData.avatar_url) {
        const { data, error } = await supabaseClient.storage
          .from("avatars")
          .download(userData.avatar_url);

        if (error) {
          throw error;
        }

        setAvatarUrl(URL.createObjectURL(data));
        setAvatarFilePath(userData.avatar_url);
      }
    } catch (error) {
      toast({
        title: "Error in retrieving avatar.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  const uploadAvatarImage = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      // Remove previous profile picture from storage.
      if (avatarFilePath) {
        const { error } = await supabaseClient.storage
          .from("avatars")
          .remove([avatarFilePath]);

        if (error) {
          throw error;
        }
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const updates = {
        id: user.id,
        avatar_url: filePath,
        updated_at: new Date(),
      };

      const { error: upsertError } = await supabaseClient
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (upsertError) {
        throw upsertError;
      }
      toast({
        title: "Avatar successfully updated.",
        description: "Looking good!",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error in updating avatar.",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack direction={{ base: "column", lg: "row" }} spacing={8}>
      <Avatar size="2xl" src={avatarUrl} />
      <VStack align="left">
        <Text>Upload an avatar</Text>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatarImage}
          disabled={uploading}
        />
      </VStack>
    </Stack>
  );
}
