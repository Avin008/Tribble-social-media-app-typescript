import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useDeletePost = (postID, onSuccess, onError) => {
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      const postDocRef = doc(db, "posts", postID);
      return await deleteDoc(postDocRef, postID);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useDeletePost };
