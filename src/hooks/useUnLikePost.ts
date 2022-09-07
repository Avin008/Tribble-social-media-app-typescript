import { useMutation } from "@tanstack/react-query";
import { unlikePost } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/hooks";
import { functionVoid } from "../types/type";

const useUnLikePost = (
  postID: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const { token } = useAppSelector((store) => store.authSlice);

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await unlikePost(postID, token!);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useUnLikePost };
