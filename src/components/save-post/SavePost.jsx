import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { MdAdd, MdClose } from "../../icons";
import { uuidv4 as uuid } from "@firebase/util";

import { openCollectionModal } from "../../redux-toolkit/features/collectionModalSlice";
import { closeCollectionList } from "../../redux-toolkit/features/collectionListSlice";
import { useSaveToCollection } from "../../hooks/useSaveToCollection";

const SavePost = ({ data }) => {
  const { userData, postData } = data;
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const onSavePostToCollectionSuccess = () => {
    queryClient.invalidateQueries(["posts"]);
    queryClient.invalidateQueries(["current-user-data"]);
    queryClient.invalidateQueries(["users"]);
    dispatch(closeCollectionList());
  };

  const {
    mutate: saveToCollection,
    isLoading,
    isError,
  } = useSaveToCollection(userData, postData, onSavePostToCollectionSuccess);

  return (
    <div className="absolute bottom-12 right-0 h-56 w-60 rounded-md border border-gray-500 bg-white shadow-sm">
      <div className="flex justify-between border-b border-gray-700 p-2">
        <h4 className="font-medium">Collections</h4>
        <span className="flex gap-2">
          <MdAdd
            className="cursor-pointer"
            size={25}
            onClick={() => dispatch(openCollectionModal())}
          />
          <MdClose
            className="cursor-pointer"
            size={25}
            onClick={() => dispatch(closeCollectionList())}
          />
        </span>
      </div>
      <ul className="m-0 h-4/5 list-none overflow-y-scroll p-1">
        {userData.savedPost?.map((x) => (
          <li
            className="cursor-pointer py-1 px-4 font-medium text-gray-700 hover:bg-gray-100"
            key={uuid()}
            onClick={() => saveToCollection(x.folderName)}
          >
            {x.folderName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavePost;
