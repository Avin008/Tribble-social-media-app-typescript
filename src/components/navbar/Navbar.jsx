import { MdSearch, MdOutlineHome, MdOutlineExplore, CgAddR } from "../../icons";
import { Link, useNavigate } from "react-router-dom";
import CreatePostModal from "../create-post-modal/CreatePostModal";
import UserProfileActions from "../user-profile-actions/UserProfileActions";
import SearchResults from "../search-results/SearchResults";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCreatePostModal } from "../../redux-toolkit/features/createPostModalSlice";
import { useGetUserData } from "../../hooks/useGetUserInfo";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isCreatePostModalOpen } = useSelector(
    (store) => store.createPostModalSlice
  );

  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [toggleProfileActions, setToggleProfileActions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useGetUserData("users");

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex h-14 items-center justify-evenly border border-gray-400 bg-white shadow-sm">
      <div className="">
        <Link to="/" className="text-lg font-semibold">
          Tribble
        </Link>
      </div>
      <div
        className="relative flex w-60 items-center rounded-md border border-gray-300 bg-gray-100 p-1"
        onClick={() => setToggleSearchBar((prev) => !prev)}
      >
        <input
          className="w-full border-none bg-transparent px-2 outline-none"
          type="text"
          placeholder="Search profile"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <MdSearch size={25} className="text-gray-500" />
        {toggleSearchBar && <SearchResults data={searchQuery} />}
      </div>
      <ul className="flex space-x-5">
        <li
          className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => navigate("/")}
        >
          <MdOutlineHome size={25} />
        </li>
        <li className="cursor-pointer rounded-full p-1 hover:bg-gray-200  active:bg-gray-300">
          <CgAddR size={25} onClick={() => dispatch(openCreatePostModal())} />
          {isCreatePostModalOpen && <CreatePostModal />}
        </li>
        <li
          className="cursor-pointer rounded-full p-1 hover:bg-gray-200  active:bg-gray-300"
          onClick={() => navigate("/explore")}
        >
          <MdOutlineExplore size={25} />
        </li>
        <li
          className="relative cursor-pointer rounded-full p-1  active:bg-gray-300"
          onClick={() => setToggleProfileActions((prev) => !prev)}
        >
          <div className="flex h-7 w-7 items-center rounded-full border-2 border-black">
            {!isUserDataLoading && (
              <img
                className="h-full w-full rounded-full"
                src={userData.profileImg}
                alt="avatar"
              />
            )}
          </div>

          {toggleProfileActions && <UserProfileActions />}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
