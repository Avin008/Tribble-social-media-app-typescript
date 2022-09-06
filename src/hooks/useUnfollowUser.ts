import { useMutation } from "@tanstack/react-query";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/features/redux-hooks/hooks";

const useUnfollowUser = (
  userID: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const { token } = useAppSelector((store) => store.authSlice);
  const unFollowUserApiCall = async () => {
    // @ts-ignore
    const userDoc = doc(db, "users", token);
    await updateDoc(userDoc, { following: arrayRemove(userID) });
    const followerDocRef = doc(db, "users", userID);
    await updateDoc(followerDocRef, {
      followers: arrayRemove(token),
    });
  };

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await unFollowUserApiCall();
    },
    {
      onSuccess,
      onError,
    }
  );
  return { mutate, isLoading, isError };
};

export { useUnfollowUser };
