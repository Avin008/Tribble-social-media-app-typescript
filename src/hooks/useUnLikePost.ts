import { useMutation } from "@tanstack/react-query";
import { unlikePost } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/features/redux-hooks/hooks";

const useUnLikePost = (
  postID: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const { token } = useAppSelector((store) => store.authSlice);

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      // @ts-ignore
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
