import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { db, storage } from "../firebase/firebaseConfig";

const useUpdatePost = (postID, files, caption, onSettled) => {
  const { token } = useSelector((store) => store.authSlice);

  const updatePostApiCall = async () => {
    const userPostRef = doc(db, "posts", postID);
    const storageRef = ref(storage, `/posts/${token}/${postID}.jpg`);
    files && (await uploadBytes(storageRef, files));
    const updatedPostObj = {
      caption: caption,
      dateCreated: Date.now(),
    };
    return await updateDoc(userPostRef, updatedPostObj);
  };

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await updatePostApiCall();
    },
    {
      onSettled,
    }
  );

  return { mutate, isLoading, isError };
};

export { useUpdatePost };
