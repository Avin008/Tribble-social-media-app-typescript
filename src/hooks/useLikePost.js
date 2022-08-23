import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { likePost } from "../firebase/firebaseConfig";

const useLikePost = (postID, onSuccess, onError) => {
  const { token } = useSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await likePost(postID, token);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useLikePost };
