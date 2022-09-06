import { useMutation } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useFollowSuggestedUsers = (
  userID: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const followSuggestedUserApiCall = async (followerID: string) => {
    const userDoc = doc(db, "users", userID);
    await updateDoc(userDoc, { following: arrayUnion(followerID) });
    const followerDocRef = doc(db, "users", followerID);
    await updateDoc(followerDocRef, {
      followers: arrayUnion(userID),
    });
  };

  const { mutate, isLoading, isError } = useMutation(
    async (followerID: string) => {
      return await followSuggestedUserApiCall(followerID);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useFollowSuggestedUsers };
