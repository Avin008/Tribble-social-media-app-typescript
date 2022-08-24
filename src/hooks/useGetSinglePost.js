import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetSinglePost = (queryKey, postID, onSuccess, onError) => {
  const getSinglePostApiCall = async () => {
    const postRef = doc(db, "posts", postID);
    return (await getDoc(postRef)).data();
  };

  const { data, isLoading, isError } = useQuery(
    [`${queryKey}`],
    async () => {
      return await getSinglePostApiCall();
    },
    {
      onSuccess,
      onError,
    }
  );

  return { data, isLoading, isError };
};

export { useGetSinglePost };
