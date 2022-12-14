import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uuidv4 as uuid } from "@firebase/util";
import EmojiKeyBoard from "../emoji-keyboard/EmojiKeyboard";
import SavePost from "../save-post/SavePost";

import {
  MdOutlineEmojiEmotions,
  MdOutlineComment,
  MdMoreHoriz,
  MdOutlineFavorite,
  MdFavoriteBorder,
  MdOutlineBookmark,
  MdBookmarkBorder,
} from "../../icons";

import { isPostSaved } from "../../firebase/firebaseConfig";

import { toggleCollectionList } from "../../redux-toolkit/features/collectionListSlice";
import { openPostOptionsModal } from "../../redux-toolkit/features/postOptionsModalSlice";
import { useLikePost } from "../../hooks/useLikePost";
import { useUnLikePost } from "../../hooks/useUnLikePost";
import { usePostComment } from "../../hooks/usePostComment";
import { useRemovePostFromSavedPosts } from "../../hooks/useRemovePostFromSavedPosts";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { Comments, UserPost } from "../../types/type";

export const avatarImg =
  "https://png.pngitem.com/pimgs/s/649-6490124_katie-notopoulos-katienotopoulos-i-write-about-tech-round.png";

//

const VerticalPostCard = ({ data }: { data: UserPost }) => {
  const [toggleEmojiKeyboard, setToggleEmojiKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token } = useAppSelector((store) => store.authSlice);
  const { loggedInUser } = useAppSelector((store) => store.userSlice);
  const { isCollectionListOpen } = useAppSelector(
    (store) => store.collectionListSlice
  );

  const handleCommentFocus = () => {
    commentRef.current!.focus();
  };

  const queryClient = useQueryClient();

  const comments: Comments[] = [];

  const onLikeSuccess = () => {
    queryClient.invalidateQueries(["followed-user-post"]);
  };

  const { mutate: likePost } = useLikePost(data.postID, onLikeSuccess);

  const onUnlikeSuccess = () => {
    queryClient.invalidateQueries(["followed-user-post"]);
  };

  const { mutate: unlikePost } = useUnLikePost(data.postID, onUnlikeSuccess);

  const onPostCommentSuccess = () => {
    setComment("");
    queryClient.invalidateQueries(["followed-user-post"]);
  };

  const { mutate: postComment } = usePostComment(
    loggedInUser,
    data.postID,
    comment,
    onPostCommentSuccess
  );

  const onRemovePostFromSavedSuccess = () => {
    queryClient.invalidateQueries(["posts"]);
    queryClient.invalidateQueries(["users"]);
  };

  const { mutate: removePostFromSaved } = useRemovePostFromSavedPosts(
    loggedInUser,
    data.postID,
    onRemovePostFromSavedSuccess
  );

  // API CALLS END

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
              dispatch(
                openPostOptionsModal({
                  userID: data.userID,
                  postID: data.postID,
                  // @ts-ignore
                  postData: data,
                })
              )
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
            <span className="cursor-pointer rounded-full p-1  hover:text-gray-500 active:bg-gray-300">
              {data.likes.map((x) => x.userId).includes(token!) ? (
                <MdOutlineFavorite
                  className="cursor-pointer"
                  size={25}
                  onClick={() => unlikePost()}
                />
              ) : (
                <MdFavoriteBorder
                  className="cursor-pointer"
                  size={25}
                  onClick={() => likePost()}
                />
              )}
            </span>
            <span className="cursor-pointer rounded-full p-1 hover:text-gray-500 active:bg-gray-300">
              <MdOutlineComment
                size={28}
                className=""
                onClick={handleCommentFocus}
              />
            </span>
          </div>

          <span className="relative cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
            {isPostSaved(loggedInUser.savedPost, data.postID) ? (
              <MdOutlineBookmark
                size={28}
                className=""
                onClick={() => removePostFromSaved()}
              />
            ) : (
              <MdBookmarkBorder
                size={28}
                onClick={() => dispatch(toggleCollectionList())}
              />
            )}
            {isCollectionListOpen && (
              <SavePost
                data={{ userData: loggedInUser, postData: { post: data } }}
              />
            )}
          </span>
        </div>
        <div className="space-y-1 px-2">
          <span className="font-semibold">{data.likes.length} Likes</span>
          <div className="flex">
            <p className="text-sm font-medium">
              <span
                className="cursor-pointer font-semibold hover:underline"
                onClick={() => navigate(`/profile/${loggedInUser.userId}`)}
              >
                {data.username}
              </span>{" "}
              {data.caption}
            </p>
          </div>
          <div className="">
            <p
              className="cursor-pointer text-sm font-medium text-gray-700 hover:underline"
              onClick={() => navigate(`/post/${data.postID}`)}
            >
              View all comments
            </p>
          </div>
          <ul className="">
            <>
              {data.comments.forEach((x) => {
                if (x.userId === token) {
                  comments.push(x);
                }
              })}
              {comments
                .sort((a, b) => b.dateCreated - a.dateCreated)
                .map((x) => (
                  <li key={uuid()} className="text-sm font-medium">
                    <span
                      onClick={() => navigate(`/profile/${x.userId}`)}
                      className="cursor-pointer font-semibold hover:underline"
                    >
                      {x.username}
                    </span>{" "}
                    {x.comment}
                  </li>
                ))}
            </>
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
          onClick={() => postComment()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default VerticalPostCard;
