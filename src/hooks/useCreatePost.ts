import { useMutation } from "@tanstack/react-query";
import { createPost } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/features/redux-hooks/hooks";

const useCreatePost = (
  loggedInUser: any,
  files: any,
  caption: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const { token } = useAppSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await createPost(
        // @ts-ignore
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
