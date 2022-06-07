import { useEffect, useState } from "react";
import supabaseClient from "../auth-components/supabaseClient";

export default function Avatar({ size }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFilePath, setAvatarFilePath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = supabaseClient.auth.user();
  const session = supabaseClient.auth.session();

  useEffect(() => {
    getAvatarImage();
  }, [session]);

  const getAvatarImage = async () => {
    try {
      let {
        data: userData,
        error,
        status,
      } = await supabaseClient.from("profiles").select(`avatar_url`).single();

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
    } catch (error) {
      alert("Error in updating profile picture.");
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ width: size }}>
      <img
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? "Avatar" : "No image"}
        style={{ height: size, width: size }}
      />
      {uploading ? (
        "Uploading..."
      ) : (
        <>
          <label className="button primary block" htmlFor="single">
            Upload an avatar
          </label>
          <input
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatarImage}
            disabled={uploading}
          />
        </>
      )}
    </div>
  );
}
