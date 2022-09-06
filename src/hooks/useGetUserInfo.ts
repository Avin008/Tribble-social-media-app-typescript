import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/features/redux-hooks/hooks";

const useGetUserData = (
  queryKey: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const { token } = useAppSelector((store) => store.authSlice);

  const getUserDataAPiCall = async (token: any) => {
    const userDocRef = doc(db, "users", token);
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
