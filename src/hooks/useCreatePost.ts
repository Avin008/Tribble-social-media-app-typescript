import { useMutation } from "@tanstack/react-query";
import { createPost } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/hooks";
import { functionVoid, User } from "../types/type";

const useCreatePost = (
  loggedInUser: User,
  files: Blob,
  caption: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const { token } = useAppSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await createPost(
        token!,
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
