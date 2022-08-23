import { useState } from "react";
import { MdGridOn, MdOutlineBookmarkBorder } from "../../icons";
import UserPostCard from "../user-post-card/UserPostCard";
import SavedPostCard from "../saved-post-card/SavedPostCard";
import { useSelector } from "react-redux";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

const ProfileTabs = ({ data }) => {
  const [tabs, setTabs] = useState(0);

  const { userPostsData, userData } = data;
  const { token } = useSelector((store) => store.authSlice);

  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="flex items-center justify-center space-x-8 p-2">
        <div
          className={`flex cursor-pointer items-center gap-1 pb-1 ${
            tabs === 0 && "border-b-2 border-black font-semibold"
          }`}
          onClick={() => setTabs(0)}
        >
          <MdGridOn /> POSTS
        </div>
        {userData.userId === token && (
          <div
            className={`flex cursor-pointer items-center gap-1 pb-1 ${
              tabs === 1 && "border-b-2 border-black font-semibold"
            }`}
            onClick={() => setTabs(1)}
          >
            <MdOutlineBookmarkBorder /> SAVED
          </div>
        )}
      </div>
      <div className="grid h-fit w-full grid-cols-3 gap-4 border-t border-black py-4 px-0">
        {tabs === 0 ? (
          userPostsData.length ? (
            userPostsData.map((x) => <UserPostCard data={x} />)
          ) : (
            <div className="absolute left-0 right-0 flex flex-col items-center justify-center gap-2 p-5">
              <MdOutlineBookmarkBorder size={50} />
              <h1 className="font-semibold">Haven't posted anything yet</h1>
            </div>
          )
        ) : userData.savedPost.length ? (
          userData.savedPost.map((x) => <SavedPostCard data={x} />)
        ) : (
          <div className="absolute left-0 right-0 flex flex-col items-center justify-center gap-2 p-5">
            <MdOutlineBookmarkBorder size={50} />
            <h1 className="font-semibold">You Haven't saved any post yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTabs;
