const PostOptions = ({ toggleFunc }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/50">
      <ul className="h-fit w-[30%] rounded-md bg-white py-1">
        <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
          Unfollow
        </li>
        <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
          Edit Post
        </li>
        <li className="flex cursor-pointer justify-center border-b border-gray-300 p-2 font-medium hover:bg-gray-200">
          Remove Post
        </li>
        <li
          className="flex cursor-pointer justify-center p-2 font-medium hover:bg-gray-200"
          onClick={() => toggleFunc((prev) => !prev)}
        >
          Cancel
        </li>
      </ul>
    </div>
  );
};

export default PostOptions;
