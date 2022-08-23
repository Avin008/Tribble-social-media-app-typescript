import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { unlikePost } from "../firebase/firebaseConfig";

const useUnLikePost = (postID, onSuccess, onError) => {
  const { token } = useSelector((store) => store.authSlice);

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await unlikePost(postID, token);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useUnLikePost };
