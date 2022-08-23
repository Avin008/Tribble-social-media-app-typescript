import { useMutation } from "@tanstack/react-query";
import { removedFromSavedPost } from "../firebase/firebaseConfig";

const useRemovePostFromSavedPosts = (
  loggedInUser,
  postID,
  onSuccess,
  onError
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
