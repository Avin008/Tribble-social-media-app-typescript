import { useMutation } from "@tanstack/react-query";
import { postComment } from "../firebase/firebaseConfig";

const usePostComment = (loggedInUser, postID, comment, onSuccess, onError) => {
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await postComment(
        loggedInUser.username,
        loggedInUser.profileImg,
        loggedInUser.userId,
        postID,
        comment
      );
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { usePostComment };
