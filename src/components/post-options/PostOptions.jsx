import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { closePostOptionsModal } from "../../redux-toolkit/features/postOptionsModalSlice";

const PostOptions = () => {
  const { token } = useSelector((store) => store.authSlice);
  const { userID, postID } = useSelector(
    (store) => store.postOptionsModalSlice
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: unFollowUser } = useMutation(
    async () => {
      const userDocRef = doc(db, "users", token);
      return await updateDoc(userDocRef, {
        following: arrayRemove(userID),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const { mutate: removePost } = useMutation(
    async () => {
      const postDocRef = doc(db, "posts", postID);
      return await deleteDoc(postDocRef, postID);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followed-user-post"]);
        dispatch(closePostOptionsModal());
      },
    }
  );

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/50">
      <ul className="h-fit w-[30%] rounded-md bg-white py-1">
        {userID !== token && (
          <li
            className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200"
            onClick={() => unFollowUser()}
          >
            Unfollow
          </li>
        )}
        {userID === token && (
          <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
            Edit Post
          </li>
        )}
        {userID === token && (
          <li
            className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200"
            onClick={() => removePost()}
          >
            Remove Post
          </li>
        )}
        <li
          className="flex cursor-pointer justify-center p-2 font-medium hover:bg-gray-200"
          onClick={() => dispatch(closePostOptionsModal())}
        >
          Cancel
        </li>
      </ul>
    </div>
  );
};

export default PostOptions;
