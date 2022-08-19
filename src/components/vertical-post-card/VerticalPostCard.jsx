import { useRef, useState } from "react";
import {
  MdOutlineEmojiEmotions,
  MdOutlineBookmarkBorder,
  MdOutlineComment,
  MdOutlineFavoriteBorder,
  MdMoreHoriz,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmojiKeyBoard from "../emoji-keyboard/EmojiKeyboard";
import SavePost from "../save-post/SavePost";

export const avatarImg =
  "https://png.pngitem.com/pimgs/s/649-6490124_katie-notopoulos-katienotopoulos-i-write-about-tech-round.png";

const VerticalPostCard = ({ data }) => {
  const [toggleSavePost, setToggleSavePost] = useState(false);
  const [toggleEmojiKeyboard, setToggleEmojiKeyboard] = useState(false);
  const commentRef = useRef(null);
  const { token } = useSelector((store) => store.authSlice);

  const handleCommentFocus = () => {
    commentRef.current.focus();
  };

  const comments = [];

  console.log(data);

  return (
    <div className="h-fit w-96 rounded-lg border border-black bg-white">
      <div className="flex h-14 items-center justify-between border-b border-black p-2">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10">
            <img
              className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
              src={data.profileImg ? data.profileImg : `${avatarImg}`}
              alt=""
            />
          </div>
          <Link
            to={`/profile/${data.userID}`}
            className="text-sm font-semibold hover:underline"
          >
            {data.username}
          </Link>
        </div>
        <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
          <MdMoreHoriz size={25} />
        </span>
      </div>
      <div className="h-auto border-b border-black">
        <img className="aspect-auto h-full w-full" src={data.img} alt="" />
      </div>
      <div className="space-y-1 border border-b-black p-1">
        <div className="flex items-center justify-between p-1">
          <div className="flex gap-2">
            <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
              <MdOutlineFavoriteBorder size={28} className="" />
            </span>
            <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
              <MdOutlineComment
                size={28}
                className=""
                onClick={handleCommentFocus}
              />
            </span>
          </div>

          <span className="relative cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
            <MdOutlineBookmarkBorder
              size={28}
              className=""
              onClick={() => setToggleSavePost((prev) => !prev)}
            />
            {toggleSavePost && <SavePost />}
          </span>
        </div>
        <div className="space-y-1 px-2">
          <span className="font-semibold">{data.likes.length} Likes</span>
          <div className="flex">
            <p className="text-sm font-medium">
              <span className="font-semibold">{data.username}</span>{" "}
              {data.caption}
            </p>
          </div>
          <div className="">
            <p className="cursor-pointer text-sm font-medium text-gray-700 hover:underline">
              View all comments
            </p>
          </div>
          <ul className="">
            {data.comments.forEach((x) => {
              if (x.userId === token) {
                comments.push(x);
              }
            })}
            {comments.map((x) => (
              <li className="text-sm font-medium">
                <span className="font-semibold">{x.username}</span> {x.comment}
              </li>
            ))}
          </ul>
          <div className="">
            <p className="text-sm font-medium text-gray-500">
              {data.dateOfCreation}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1 p-2 px-2">
        <span
          className="relative cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => setToggleEmojiKeyboard((prev) => !prev)}
        >
          <MdOutlineEmojiEmotions size={25} />
          {toggleEmojiKeyboard && <EmojiKeyBoard />}
        </span>
        <textarea
          rows={1}
          className="w-full resize-none outline-none"
          name=""
          id=""
          placeholder="Add Comment"
          ref={commentRef}
        ></textarea>
        <button className="font-medium text-gray-500" disabled>
          Post
        </button>
      </div>
    </div>
  );
};

export default VerticalPostCard;
