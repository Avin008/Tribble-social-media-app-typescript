import {
  MdSearch,
  MdOutlineFavoriteBorder,
  MdOutlineHome,
  MdOutlineExplore,
  MdAccountCircle,
  CgAddR,
} from "../../icons";

const Navbar = () => {
  return (
    <div className="absolute left-0 right-0 flex h-14 items-center justify-evenly border border-gray-400 shadow-sm">
      <div className="">
        <h1 className="text-lg font-semibold">Tribble</h1>
      </div>
      <div className="flex w-60 items-center rounded-md border border-gray-300 bg-gray-100 p-1">
        <input
          className="w-full border-none bg-transparent px-2 outline-none"
          type="text"
          placeholder="Search profile"
        />
        <MdSearch size={25} className="text-gray-500" />
      </div>
      <ul className="flex space-x-5">
        <li className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
          <MdOutlineHome size={25} />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-gray-200  active:bg-gray-300">
          <CgAddR size={25} />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-gray-200  active:bg-gray-300">
          <MdOutlineExplore size={25} />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-gray-200  active:bg-gray-300">
          <MdOutlineFavoriteBorder size={25} />
        </li>
        <li className=" cursor-pointer rounded-full p-1 hover:bg-gray-200  active:bg-gray-300">
          <MdAccountCircle size={25} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
