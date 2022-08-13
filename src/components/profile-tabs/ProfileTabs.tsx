import { useState } from "react";
import { MdGridOn, MdOutlineBookmarkBorder } from "../../icons";
import UserPostCard from "../user-post-card/UserPostCard";
import SavedPostCard from "../saved-post-card/SavedPostCard";

type PostData = {
  img: string;
  collectionName: string;
};

const postData: PostData[] = [
  {
    img: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    collectionName: "Anime",
  },
  {
    img: "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhhcHB5JTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    collectionName: "Ui Ux",
  },
  {
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhcHB5JTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    collectionName: "Dragon Ball Z",
  },
  {
    img: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhhcHB5JTIwaW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    collectionName: "Rent a Girlfriend",
  },
];

const ProfileTabs = () => {
  const [tabs, setTabs] = useState(0);
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
          ? postData.map((x) => <UserPostCard data={x} />)
          : postData.map((x) => <SavedPostCard data={x} />)}
      </div>
    </div>
  );
};

export default ProfileTabs;
