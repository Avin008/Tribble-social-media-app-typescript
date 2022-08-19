import { useDispatch, useSelector } from "react-redux";
import { closePostOptionsModal } from "../../redux-toolkit/features/postOptionsModalSlice";

const PostOptions = () => {
  const { token } = useSelector((store) => store.authSlice);
  const { postUserId } = useSelector((store) => store.postOptionsModalSlice);
  const { userID } = useSelector((store) => store.postOptionsModalSlice);

  const dispatch = useDispatch();
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/50">
      <ul className="h-fit w-[30%] rounded-md bg-white py-1">
        {userID !== token && (
          <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
            Unfollow
          </li>
        )}
        {userID === token && (
          <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
            Edit Post
          </li>
        )}
        {userID === token && (
          <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
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
