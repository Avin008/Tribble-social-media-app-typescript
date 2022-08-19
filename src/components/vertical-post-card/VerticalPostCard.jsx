import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  MdOutlineEmojiEmotions,
  MdOutlineBookmarkBorder,
  MdOutlineComment,
  MdOutlineFavoriteBorder,
  MdMoreHoriz,
  MdOutlineFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeCollectionList } from "../../redux-toolkit/features/collectionListSlice";
import { openPostModal } from "../../redux-toolkit/features/postModalSlice";
import { openPostOptionsModal } from "../../redux-toolkit/features/postOptionsModalSlice";
import EmojiKeyBoard from "../emoji-keyboard/EmojiKeyboard";
import SavePost from "../save-post/SavePost";
import {
  likePost,
  unlikePost,
  postComment,
} from "../../firebase/firebaseConfig";

export const avatarImg =
  "https://png.pngitem.com/pimgs/s/649-6490124_katie-notopoulos-katienotopoulos-i-write-about-tech-round.png";

const VerticalPostCard = ({ data }) => {
  const [toggleSavePost, setToggleSavePost] = useState(false);
  const [toggleEmojiKeyboard, setToggleEmojiKeyboard] = useState(false);
  const [toggleCollection, setToggleCollection] = useState(false);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const { token } = useSelector((store) => store.authSlice);
  const { postID } = useSelector((store) => store.postModalSlice);
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  const handleCommentFocus = () => {
    commentRef.current.focus();
  };

  const queryClient = useQueryClient();

  const comments = [];

  // like post

  const { mutate: mutateLike } = useMutation(
    async () => {
      return await likePost(data.postID, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followed-user-post"]);
      },
    }
  );

  // unlike post

  const { mutate: mutateUnLike } = useMutation(
    async () => {
      return await unlikePost(data.postID, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followed-user-post"]);
      },
    }
  );

  // post comment

  const { mutate: mutateAddComment } = useMutation(
    async () => {
      return await postComment(
        loggedInUser.username,
        loggedInUser.profileImg,
        loggedInUser.userId,
        data.postID,
        comment
      );
    },
    {
      onSuccess: () => {
        setComment("");
        queryClient.invalidateQueries(["followed-user-post"]);
      },
    }
  );

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
          <MdMoreHoriz
            size={25}
            onClick={() =>
              dispatch(openPostOptionsModal({ userID: data.userID }))
            }
          />
        </span>
      </div>
      <div className="h-auto border-b border-black">
        <img className="aspect-auto h-full w-full" src={data.img} alt="" />
      </div>
      <div className="space-y-1 border border-b-black p-1">
        <div className="flex items-center justify-between p-1">
          <div className="flex gap-2">
            <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
              {data.likes.map((x) => x.userId).includes(token) ? (
                <MdOutlineFavorite
                  className="cursor-pointer"
                  size={25}
                  onClick={() => mutateUnLike()}
                />
              ) : (
                <MdFavoriteBorder
                  className="cursor-pointer"
                  size={25}
                  onClick={() => mutateLike()}
                />
              )}
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
              onClick={() => setToggleCollection((prev) => !prev)}
            />
            {toggleCollection && (
              <SavePost data={{ post: data, user: loggedInUser }} />
            )}
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
            <p
              className="cursor-pointer text-sm font-medium text-gray-700 hover:underline"
              onClick={() => dispatch(openPostModal({ postID: data.postID }))}
            >
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
        <span className="relative cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
          <MdOutlineEmojiEmotions
            size={25}
            onClick={() => setToggleEmojiKeyboard((prev) => !prev)}
          />
          {toggleEmojiKeyboard && <EmojiKeyBoard addEmojiFunc={setComment} />}
        </span>
        <textarea
          rows={1}
          className="w-full resize-none outline-none"
          value={comment}
          placeholder="Add Comment"
          ref={commentRef}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="font-medium"
          disabled={comment ? false : true}
          onClick={() => mutateAddComment()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default VerticalPostCard;
