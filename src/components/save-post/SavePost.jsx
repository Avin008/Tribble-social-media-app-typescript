import { MdAdd } from "../../icons";
const SavePost = () => {
  return (
    <div className="absolute bottom-12 right-0 h-56 w-60 rounded-md border border-gray-500 bg-white shadow-sm">
      <div className="flex justify-between border-b border-gray-700 p-2">
        <h4 className="font-medium">Collections</h4>
        <MdAdd className="cursor-pointer" size={25} />
      </div>
      <ul className="m-0 h-4/5 list-none overflow-y-scroll p-1">
        {[1].map((x) => (
          <li className="cursor-pointer py-1 px-4 font-medium text-gray-700 hover:bg-gray-100">
            {""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavePost;
