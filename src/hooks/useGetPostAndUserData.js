import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const useGetPostAndUserData = (queryKey, postID, onSuccess, onError) => {
  const getPostAndUserDataApiCall = async () => {
    const post = { post: "", user: "" };
    const postDocRef = doc(db, "posts", postID);
    post.post = (await getDoc(postDocRef)).data();
    const userDocRef = doc(db, "users", post.post.userID);
    post.user = (await getDoc(userDocRef)).data();
    return post;
  };

  const { data, isLoading } = useQuery([`${queryKey}`], async () => {
    return await getPostAndUserDataApiCall();
  });

  return { data, isLoading };
};

export { useGetPostAndUserData };
