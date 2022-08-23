import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";

const useGetUserData = (queryKey) => {
  const { token } = useSelector((store) => store.authSlice);

  const getUserDataAPiCall = async (token) => {
    const userDocRef = doc(db, "users", token);
    return (await getDoc(userDocRef)).data();
  };

  const { data, isLoading, isError } = useQuery([`${queryKey}`], async () => {
    return await getUserDataAPiCall(token);
  });

  return { data, isLoading, isError };
};

export { useGetUserData };
