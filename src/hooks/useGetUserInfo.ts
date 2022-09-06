import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/hooks";
import { functionVoid } from "../types/type";

const useGetUserData = (
  queryKey: string,
  onSuccess?: any,
  onError?: functionVoid
) => {
  const { token } = useAppSelector((store) => store.authSlice);

  const getUserDataAPiCall = async (token: null | string) => {
    const userDocRef = doc(db, "users", token!);
    return (await getDoc(userDocRef)).data();
  };

  const { data, isLoading, isError } = useQuery(
    [`${queryKey}`],
    async () => {
      return await getUserDataAPiCall(token);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { data, isLoading, isError };
};

export { useGetUserData };
