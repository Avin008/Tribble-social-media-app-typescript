import { useMutation } from "@tanstack/react-query";
import { removedFromSavedPost } from "../firebase/firebaseConfig";
import { functionVoid, User } from "../types/type";

const useRemovePostFromSavedPosts = (
  loggedInUser: User,
  postID: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await removedFromSavedPost(
        loggedInUser.userId,
        loggedInUser.savedPost,
        postID
      );
    },
    {
      onSuccess,
      onError,
    }
  );
  return { mutate, isLoading, isError };
};

export { useRemovePostFromSavedPosts };
