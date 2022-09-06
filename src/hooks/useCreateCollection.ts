import { useMutation } from "@tanstack/react-query";
import { createCollection } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/hooks";
import { functionVoid } from "../types/type";

const useCreateCollection = (
  collectionName: string,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const { token } = useAppSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await createCollection(token!, collectionName);
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useCreateCollection };
