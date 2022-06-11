import { useEffect, useState } from "react";
import supabaseClient from "../auth-components/supabaseClient";
import { Avatar, Text, HStack, Stack } from "@chakra-ui/react";

export default function ProfilePicture() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFilePath, setAvatarFilePath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = supabaseClient.auth.user();

  useEffect(() => {
    getAvatarImage();
  }, [avatarFilePath]);

  const getAvatarImage = async () => {
    try {
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
      alert("Error in getting profile picture.");
      console.log(error.message);
    }
  };

  const uploadAvatarImage = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

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
      const fileName = `${Math.random()}.${fileExt}`;
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
      setAvatarFilePath(filePath);
    } catch (error) {
      alert("Error in updating profile picture.");
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <HStack spacing={8}>
      <Avatar size="2xl" src={avatarUrl} />
      <Stack>
        <Text>Upload an avatar</Text>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatarImage}
          disabled={uploading}
        />
      </Stack>
    </HStack>
  );
}
