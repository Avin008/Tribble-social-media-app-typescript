import {
  MdOutlineMoreHoriz,
  MdFavoriteBorder,
  MdOutlineComment,
  MdOutlineBookmarkBorder,
  MdOutlineEmojiEmotions,
  MdClose,
  MdOutlineFavorite,
  MdOutlineBookmark,
} from "../../icons";
import { useState } from "react";
import SavePost from "../save-post/SavePost";
import EmojiKeyboard from "../emoji-keyboard/EmojiKeyboard";
import { Link } from "react-router-dom";
import CreateCollectionModal from "../create-collection-modal/CreateCollectionModal";

const ViewPostCard = () => {
  const [toggleCollection, setToggleCollection] = useState(false);
  const [toggleEmojikeyboard, setTogglEmojiKeyboard] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-black/50">
      <div className="absolute top-4 right-8">
        <MdClose size={30} className="cursor-pointer text-white" />
      </div>
      <div className="grid h-4/5 w-3/5 grid-flow-row auto-rows-[480px] grid-cols-2 bg-white">
        <div className="bg-black py-4 px-0">
          <div className="h-full w-full">
            <img
              className="h-full w-full object-cover"
              src={
                "https://images.unsplash.com/photo-1660252696878-e6407a230ab2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
              }
              alt=""
            />
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-between border-b border-gray-800 p-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10">
                <img
                  src={
                    "https://images.unsplash.com/photo-1660252696878-e6407a230ab2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                  }
                  alt=""
                  className="h-full w-full rounded-full border border-black object-cover"
                />
              </div>
              <h5 className="font-medium">{"Natasha Vora"}</h5>
            </div>
            <MdOutlineMoreHoriz size={20} className="cursor-pointer" />
          </div>
          <div className="scrollbar-hide flex h-3/5 flex-col gap-4 overflow-scroll p-3">
            <p className="text-base font-normal">{"this is just a post"}</p>

            <div className="flex items-center gap-2">
              <div>
                <div className="h-10 w-10">
                  <img
                    src={
                      "https://images.unsplash.com/photo-1660252696878-e6407a230ab2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                    }
                    alt=""
                    className="h-full w-full rounded-full border border-black object-cover"
                  />
                </div>
              </div>
              <div className="leading-3">
                <Link
                  to={`/profile/${""}`}
                  className="text-xs font-semibold hover:underline"
                >
                  {"Natasha Vora"}
                </Link>
                <p className="text-xs font-medium">
                  {"this is just a post this is just a post to check "}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 border border-gray-700 bg-white">
            <div className="space-y-2 p-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <MdOutlineFavorite className="cursor-pointer" size={25} />
                  <MdOutlineComment className="cursor-pointer" size={25} />
                </div>
                <div className="card-secondary-actions">
                  <MdOutlineBookmark
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setToggleCollection((prev) => !prev)}
                  />
                  {toggleCollection && (
                    <div className="relative">
                      <SavePost />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium">{"100"} Likes</h5>
                <h5 className="text-sm font-medium text-gray-700">
                  {"2 DAYS AGO"}
                </h5>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-black p-3">
              <div className="relative flex w-full items-center gap-1">
                <MdOutlineEmojiEmotions
                  className="cursor-pointer"
                  size={25}
                  onClick={() => setTogglEmojiKeyboard((prev) => !prev)}
                />
                {toggleEmojikeyboard && <EmojiKeyboard />}
                <input
                  className="relative w-full  border-0 bg-transparent outline-none"
                  type="text"
                  placeholder="Add comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>
              <button
                className="border-0 bg-transparent p-0 text-sm font-semibold text-gray-500 outline-none"
                disabled={true}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {false && <CreateCollectionModal />}
    </div>
  );
};

export default ViewPostCard;
