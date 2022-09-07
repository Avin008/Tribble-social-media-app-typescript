import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { functionVoid } from "../types/type";

const useGetSinglePost = (
  queryKey: string,
  postID: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
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
