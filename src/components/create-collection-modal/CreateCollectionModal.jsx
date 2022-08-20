import { MdOutlineClose } from "../../icons/";
import { useState } from "react";
import { closeCollectionModal } from "../../redux-toolkit/features/collectionModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollection } from "../../firebase/firebaseConfig";
const CreateCollectionModal = ({ data }) => {
  const [collectionName, setCollectionName] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.authSlice);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async () => {
      return await createCollection(token, collectionName);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["users"]);
        setCollectionName("");
      },
    }
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-black/40">
      <div className="h-fit w-96 rounded-md bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-black py-2 px-4">
          <h5 className="font-semibold">New Collection</h5>
          <MdOutlineClose
            size={25}
            className="cursor-pointer"
            onClick={() => dispatch(closeCollectionModal())}
          />
        </div>
        <div className="flex flex-col items-center gap-2 p-4">
          <div className="w-full">
            <input
              className="w-full rounded-md border border-gray-800 bg-gray-300 p-2 outline-none placeholder:text-black"
              type="text"
              placeholder="collection name"
              onChange={(e) => setCollectionName(e.target.value)}
              value={collectionName}
            />
          </div>
        </div>
        <div className="flex items-center justify-center border-t border-gray-700 p-2">
          <button
            className="cursor-pointer border-0 bg-transparent p-0 font-medium text-purple-700"
            onClick={() => mutate()}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
