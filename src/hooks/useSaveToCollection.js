import { useMutation } from "@tanstack/react-query";
import { saveToCollection } from "../firebase/firebaseConfig";

const useSaveToCollection = (userData, postData, onSuccess, onError) => {
  const { mutate, isLoading, isError } = useMutation(
    async (folderName) => {
      return await saveToCollection(
        userData.userId,
        folderName,
        userData.savedPost,
        postData.post.img,
        postData.post.postID
      );
    },
    { onSuccess, onError }
  );

  return { mutate, isLoading, isError };
};

export { useSaveToCollection };
