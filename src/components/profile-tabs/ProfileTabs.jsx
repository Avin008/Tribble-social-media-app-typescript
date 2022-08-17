import { useState } from "react";
import { MdGridOn, MdOutlineBookmarkBorder } from "../../icons";
import UserPostCard from "../user-post-card/UserPostCard";
import SavedPostCard from "../saved-post-card/SavedPostCard";

const ProfileTabs = ({ data }) => {
  const [tabs, setTabs] = useState(0);

  const { userPostsData, userData } = data;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex items-center justify-center space-x-8 p-2">
        <div
          className={`flex cursor-pointer items-center gap-1 pb-1 ${
            tabs === 0 && "border-b-2 border-black font-medium"
          }`}
          onClick={() => setTabs(0)}
        >
          <MdGridOn /> POSTS
        </div>
        <div
          className={`flex cursor-pointer items-center gap-1 pb-1 ${
            tabs === 1 && "border-b-2 border-black font-medium"
          }`}
          onClick={() => setTabs(1)}
        >
          <MdOutlineBookmarkBorder /> SAVED
        </div>
      </div>
      <div className="grid h-fit w-full grid-cols-3 gap-4 border-t border-black py-4 px-0">
        {tabs === 0
          ? userPostsData.map((x) => <UserPostCard data={x} />)
          : userData.savedPost.map((x) => <SavedPostCard data={x} />)}
      </div>
    </div>
  );
};

export default ProfileTabs;
