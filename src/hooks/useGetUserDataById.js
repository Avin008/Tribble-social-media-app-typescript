import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetUserDataById = (queryKey, userID, onSuccess, onError) => {
  const getCurrentUserApiCall = async () => {
    const userDocRef = doc(db, "users", userID);
    return (await getDoc(userDocRef)).data();
  };

  const { data, isLoading } = useQuery(
    [`${queryKey}`],
    async () => {
      return await getCurrentUserApiCall();
    },
    {
      onSuccess,
      onError,
    }
  );

  return { data, isLoading };
};

export { useGetUserDataById };
