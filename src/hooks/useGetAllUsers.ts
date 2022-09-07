import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetAllUsers = (queryKey: string) => {
  const getAllUsersApiCall = async () => {
    const userCollectionRef = collection(db, "users");
    return (await getDocs(userCollectionRef)).docs.map((x) => x.data());
  };

  const { data, isLoading, isError } = useQuery([`${queryKey}`], async () => {
    return await getAllUsersApiCall();
  });

  return { data, isLoading, isError };
};

export { useGetAllUsers };
