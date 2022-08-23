import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createCollection } from "../firebase/firebaseConfig";

const useCreateCollection = (collectionName, onSuccess, onError) => {
  const { token } = useSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await createCollection(token, collectionName);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useCreateCollection };
