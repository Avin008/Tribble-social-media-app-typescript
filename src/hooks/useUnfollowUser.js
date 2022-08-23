import { useMutation } from "@tanstack/react-query";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";

const useUnfollowUser = (userID, onSuccess, onError) => {
  const { token } = useSelector((store) => store.authSlice);
  const unFollowUserApiCall = async () => {
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
