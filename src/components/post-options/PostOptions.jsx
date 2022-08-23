import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { closePostOptionsModal } from "../../redux-toolkit/features/postOptionsModalSlice";
import { openUpdatePostModal } from "../../redux-toolkit/features/updatePostModalSlice";

const PostOptions = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.authSlice);
  const { userID, postID } = useSelector(
    (store) => store.postOptionsModalSlice
  );

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: unFollowUser, isLoading: unfollowLoading } = useMutation(
    async () => {
      const userDocRef = doc(db, "users", token);
      const followerDocRef = doc(db, "users", userID);
      await updateDoc(followerDocRef, { followers: arrayRemove(token) });
      return await updateDoc(userDocRef, {
        following: arrayRemove(userID),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
        queryClient.invalidateQueries(["users"]);
      },
      onError: (err) => {
        console.log(err);
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
        navigate(`/`);
      },
    }
  );

  const { data: getpostUser, isLoading } = useQuery(["post"], async () => {
    const userDocRef = doc(db, "users", userID);
    return (await getDoc(userDocRef)).data();
  });

  const { mutate: followUser, isLoading: loadingFollowing } = useMutation(
    async () => {
      const userDocRef = doc(db, "users", token);
      const followerDocRef = doc(db, "users", userID);
      await updateDoc(followerDocRef, { followers: arrayUnion(token) });
      return await updateDoc(userDocRef, {
        following: arrayUnion(userID),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  if (isLoading) {
    return;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/50">
      <ul className="h-fit w-[30%] rounded-md bg-white py-1">
        {userID === token ? (
          <li
            className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200"
            onClick={() => {
              dispatch(openUpdatePostModal());
              dispatch(closePostOptionsModal());
            }}
          >
            Edit Post
          </li>
        ) : getpostUser.followers.includes(token) ? (
          <li
            className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200"
            onClick={() => unFollowUser()}
          >
            unfollow
          </li>
        ) : (
          <li
            className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200"
            onClick={() => followUser()}
          >
            follow
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
