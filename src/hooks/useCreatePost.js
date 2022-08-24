import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createPost } from "../firebase/firebaseConfig";

const useCreatePost = (loggedInUser, files, caption, onSuccess, onError) => {
  const { token } = useSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await createPost(
        token,
        loggedInUser.username,
        loggedInUser.profileImg,
        files,
        caption
      );
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useCreatePost };
