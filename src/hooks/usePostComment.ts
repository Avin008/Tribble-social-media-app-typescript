import { useMutation } from "@tanstack/react-query";
import { postComment } from "../firebase/firebaseConfig";
import { functionVoid, User } from "../types/type";

const usePostComment = (
  loggedInUser: User,
  postID: string,
  comment: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
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
