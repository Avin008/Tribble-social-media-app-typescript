import { useMutation } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useFollowSuggestedUsers = (userID, onSuccess, onError) => {
  const followSuggestedUserApiCall = async (followerID) => {
    const userDoc = doc(db, "users", userID);
    await updateDoc(userDoc, { following: arrayUnion(followerID) });
    const followerDocRef = doc(db, "users", followerID);
    await updateDoc(followerDocRef, {
      followers: arrayUnion(userID),
    });
  };

  const { mutate, isLoading, isError } = useMutation(
    async (followerID) => {
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
