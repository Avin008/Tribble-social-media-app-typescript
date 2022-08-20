import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { MdAdd } from "../../icons";

// firebase functions
import { saveToCollection } from "../../firebase/firebaseConfig";

// redux toolkit
import { openCollectionModal } from "../../redux-toolkit/features/collectionModalSlice";
import { closeCollectionList } from "../../redux-toolkit/features/collectionListSlice";

const SavePost = ({ data }) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  // SAVE TO COLLECTION API CALL

  const { mutate, isLoading } = useMutation(
    async (folderName) => {
      return await saveToCollection(
        data.user.userId,
        folderName,
        data.user.savedPost,
        data.post.img,
        data.post.postID
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["current-user-data"]);
        queryClient.invalidateQueries(["users"]);
        dispatch(closeCollectionList());
      },
    }
  );

  //

  return (
    <div className="absolute bottom-12 right-0 h-56 w-60 rounded-md border border-gray-500 bg-white shadow-sm">
      <div className="flex justify-between border-b border-gray-700 p-2">
        <h4 className="font-medium">Collections</h4>
        <MdAdd
          className="cursor-pointer"
          size={25}
          onClick={() => dispatch(openCollectionModal())}
        />
      </div>
      <ul className="m-0 h-4/5 list-none overflow-y-scroll p-1">
        {data.user.savedPost.map((x) => (
          <li
            className="cursor-pointer py-1 px-4 font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => mutate(x.folderName)}
          >
            {x.folderName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavePost;
