import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useDeletePost = (
  postID: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      const postDocRef = doc(db, "posts", postID);
      return await deleteDoc(postDocRef);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useDeletePost };
