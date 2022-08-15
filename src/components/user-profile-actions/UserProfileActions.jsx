import {
  MdOutlineAccountCircle,
  MdOutlineLogout,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { Link } from "react-router-dom";
const UserProfileActions = () => {
  return (
    <ul className="absolute -left-16 top-12 h-fit w-40 list-none rounded-md border border-black bg-white py-2 px-0">
      <Link
        to="/profile"
        className="flex cursor-pointer items-center gap-2 px-4 py-1 hover:bg-gray-100"
      >
        <MdOutlineAccountCircle className="user-icons" /> Profile
      </Link>
      <Link
        to="/edit-profile"
        className="flex cursor-pointer items-center gap-2 px-4 py-1 hover:bg-gray-100"
      >
        <MdOutlineMiscellaneousServices /> Edit Profile
      </Link>
      <li className="flex cursor-pointer items-center gap-2 px-4 py-1 hover:bg-gray-100">
        <MdOutlineLogout className="user-icons" /> Logout
      </li>
    </ul>
  );
};

export default UserProfileActions;
