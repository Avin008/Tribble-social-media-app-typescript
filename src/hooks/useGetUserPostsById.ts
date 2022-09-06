import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetUserPostsById = (
  queryKey: string,
  userID: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const getUserPostsByIdAPiCall = async (userID: string) => {
    const postsCollectionRef = collection(db, "posts");
    const queryK = query(postsCollectionRef, where("userID", "==", userID));
    return (await getDocs(queryK)).docs.map((x) => x.data());
  };

  const { data, isLoading } = useQuery(
    [`${queryKey}`],
    async () => {
      // @ts-ignore
      return await getUserPostsByIdAPiCall(userID);
    },
    {
      select: (data) => {
        return data.sort((a, b) => b.dateCreated - a.dateCreated);
      },
      onSuccess,
      onError,
    }
  );

  return { data, isLoading };
};

export { useGetUserPostsById };
