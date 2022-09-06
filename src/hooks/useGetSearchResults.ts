import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { functionVoid } from "../types/type";

const useGetSearchResult = (
  search: any,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const getAllUsersApiCall = async () => {
    const userCollectionRef = collection(db, "users");
    return (await getDocs(userCollectionRef)).docs.map((x) => x.data());
  };

  const { data, isLoading, isError } = useQuery(
    [`search-key`],
    async () => {
      return await getAllUsersApiCall();
    },
    {
      select: (data: any = "") => {
        return data.filter((x: any) =>
          x.username.includes(search ? search : null)
        );
      },
      onSuccess,
      onError,
    }
  );

  return { data, isLoading, isError };
};

export default useGetSearchResult;
