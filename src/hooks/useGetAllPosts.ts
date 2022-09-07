import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { functionVoid } from "../types/type";

const useGetAllPosts = (
  queryKey: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const getAllPostsApiCall = async () => {
    const postCollection = collection(db, "posts");
    return (await getDocs(postCollection)).docs.map((x) => x.data());
  };

  const { data, isLoading } = useQuery(
    [`${queryKey}`],
    async () => {
      return await getAllPostsApiCall();
    },
    {
      onSuccess,
      onError,
    }
  );

  return { data, isLoading };
};

export { useGetAllPosts };
