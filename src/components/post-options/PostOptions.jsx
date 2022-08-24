import { useQueryClient } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/useDeletePost";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useGetUserDataById } from "../../hooks/useGetUserDataById";
import { useUnfollowUser } from "../../hooks/useUnfollowUser";
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

  const onUnfollowSuccess = () => {
    queryClient.invalidateQueries(["post"]);
    queryClient.invalidateQueries(["users"]);
  };

  const { mutate: unFollowUser, isLoading: unfollowLoading } = useUnfollowUser(
    userID,
    onUnfollowSuccess
  );

  const onDeletePostSuccess = () => {
    queryClient.invalidateQueries(["followed-user-post"]);
    dispatch(closePostOptionsModal());
    navigate(`/`);
  };

  const { mutate: deletePost } = useDeletePost(postID, onDeletePostSuccess);

  const { data: getpostUser, isLoading } = useGetUserDataById("posts", userID);

  const onFollowSuccess = () => {
    queryClient.invalidateQueries(["post"]);
    queryClient.invalidateQueries(["users"]);
  };

  const { mutate: followUser } = useFollowUser(userID, onFollowSuccess);

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
            onClick={() => deletePost()}
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
