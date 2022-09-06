import { useMutation } from "@tanstack/react-query";
import { createCollection } from "../firebase/firebaseConfig";
import { useAppSelector } from "../redux-toolkit/features/redux-hooks/hooks";

const useCreateCollection = (
  collectionName: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const { token } = useAppSelector((store) => store.authSlice);
  const { mutate, isLoading, isError } = useMutation(
    async () => {
      // @ts-ignore
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
