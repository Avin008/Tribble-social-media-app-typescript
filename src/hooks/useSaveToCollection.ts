import { useMutation } from "@tanstack/react-query";
import { saveToCollection } from "../firebase/firebaseConfig";
import { functionVoid, Posts, User } from "../types/type";

const useSaveToCollection = (
  userData: User,
  postData: { post: Posts },
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const { mutate, isLoading, isError } = useMutation(
    async (folderName: string) => {
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
