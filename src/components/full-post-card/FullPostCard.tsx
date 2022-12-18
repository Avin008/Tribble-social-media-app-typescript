import {
  MdOutlineMoreHoriz,
  MdFavoriteBorder,
  MdOutlineComment,
  MdOutlineBookmarkBorder,
  MdOutlineEmojiEmotions,
  MdOutlineFavorite,
  MdOutlineBookmark,
} from "../../icons";
import { useRef, useState } from "react";
import SavePost from "../save-post/SavePost";
import EmojiKeyboard from "../emoji-keyboard/EmojiKeyboard";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import CreateCollectionModal from "../create-collection-modal/CreateCollectionModal";
import { useDispatch } from "react-redux";
import { closePostModal } from "../../redux-toolkit/features/postModalSlice";
import { useQueryClient } from "@tanstack/react-query";
import { isPostSaved } from "../../firebase/firebaseConfig";
import PostOptions from "../post-options/PostOptions";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";
import { openPostOptionsModal } from "../../redux-toolkit/features/postOptionsModalSlice";
import UpdatePostModal from "../update-post-modal/UpdatePostModal";
import { ClipLoader } from "react-spinners";
import { toggleCollectionList } from "../../redux-toolkit/features/collectionListSlice";
import { useGetUserData } from "../../hooks/useGetUserInfo";
import { useRemovePostFromSavedPosts } from "../../hooks/useRemovePostFromSavedPosts";
import { useLikePost } from "../../hooks/useLikePost";
import { useUnLikePost } from "../../hooks/useUnLikePost";
import { usePostComment } from "../../hooks/usePostComment";
import { useGetSinglePost } from "../../hooks/useGetSinglePost";
import { uuidv4 as uuid } from "@firebase/util";
import { useAppSelector } from "../../redux-toolkit/hooks";
import {
  Comments,
  UserPost,
} from "../../types/type";

const FullPostCard = () => {
  const [
    toggleEmojikeyboard,
    setTogglEmojiKeyboard,
  ] = useState(false);
  const [comment, setComment] = useState("");
  const commentRef =
    useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { postID } = useParams();

  const queryClient = useQueryClient();

  const focusCommentBox = () => {
    commentRef.current!.focus();
  };

  const dispatch = useDispatch();
  const { collectionModal } = useAppSelector(
    (store) => store.collectionModalSlice
  );
  const { isPostOptionsModalOpen } =
    useAppSelector(
      (store) => store.postOptionsModalSlice
    );

  const { isUpdatePostModalOpen } =
    useAppSelector(
      (store) => store.updatePostModalSlice
    );

  const { isCollectionListOpen } = useAppSelector(
    (store) => store.collectionListSlice
  );

  const { data: postData, isLoading } =
    useGetSinglePost("current-post", postID!);

  const {
    data: userData,
    isLoading: userDataLoading,
  } = useGetUserData("users");

  const onLikePostSuccess = () => {
    queryClient.invalidateQueries([
      "current-post",
    ]);
  };

  const { mutate: likePost } = useLikePost(
    postID!,
    onLikePostSuccess
  );

  const onUnlikePostSuccess = () => {
    queryClient.invalidateQueries([
      "current-post",
    ]);
  };

  const { mutate: unLikePost } = useUnLikePost(
    postID!,
    onUnlikePostSuccess
  );

  const onRemoveSavedPostSuccess = () => {
    queryClient.invalidateQueries(["users"]);
  };

  const { mutate: removePostFromSaved } =
    useRemovePostFromSavedPosts(
      userData,
      postID!,
      onRemoveSavedPostSuccess
    );

  const onPostCommentSuccess = () => {
    queryClient.invalidateQueries([
      "current-post",
    ]);
    setComment("");
    setTogglEmojiKeyboard(false);
  };

  const { mutate: postComment } = usePostComment(
    userData,
    postID!,
    comment,
    onPostCommentSuccess
  );

  const sortedComments = (
    comments: Comments[]
  ) => {
    return [...comments].sort(
      (a, b) => b.dateCreated - a.dateCreated
    );
  };

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader
          color="gray"
          size={40}
          loading={isLoading}
        />
      </div>
    );
  }

  if (userDataLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader
          color="gray"
          size={40}
          loading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid h-4/5 w-3/5 grid-flow-row auto-rows-[460px] grid-cols-2 border border-black bg-white">
      <div className="bg-black py-4 px-0 shadow-md">
        <div className="h-full w-full">
          <img
            className="h-full w-full object-cover"
            src={postData?.img}
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
                  postData?.profileImg
                    ? postData.profileImg
                    : avatarImg
                }
                alt=""
                className="h-full w-full rounded-full border border-black object-cover"
              />
            </div>
            <h5
              className="cursor-pointer font-medium hover:underline"
              onClick={() => {
                navigate(
                  `/profile/${postData?.userID}`
                );
                dispatch(closePostModal());
              }}
            >
              {postData?.username}
            </h5>
          </div>
          <div className="rounded-full p-1 hover:bg-gray-200">
            <MdOutlineMoreHoriz
              size={25}
              className="cursor-pointer"
              onClick={() =>
                dispatch(
                  openPostOptionsModal({
                    userID: postData?.userID,
                    postID: postData?.postID,
                    // @ts-ignore
                    postData: postData,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="flex h-3/5 flex-col gap-4 overflow-y-scroll p-3 scrollbar-hide">
          <p className="text-base font-medium">
            {postData?.caption}
          </p>

          {sortedComments(postData?.comments).map(
            (x) => {
              return (
                <div
                  className="flex items-center gap-2"
                  key={uuid()}
                >
                  <div>
                    <div className="h-10 w-10">
                      <img
                        src={
                          x.profileImg
                            ? x.profileImg
                            : avatarImg
                        }
                        alt=""
                        className="h-full w-full rounded-full border border-black object-cover"
                      />
                    </div>
                  </div>
                  <div className="leading-3">
                    <Link
                      to={`/profile/${x.userId}`}
                      className="text-xs font-semibold hover:underline"
                    >
                      {x.username}
                    </Link>
                    <p className="text-sm font-medium">
                      {x.comment}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 border-t border-gray-500 bg-white">
          <div className="space-y-2 p-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                {postData?.likes
                  .map((x: any) => x.userId)
                  .includes(userData?.userId) ? (
                  <MdOutlineFavorite
                    className="cursor-pointer"
                    size={25}
                    onClick={() => unLikePost()}
                  />
                ) : (
                  <MdFavoriteBorder
                    className="cursor-pointer"
                    size={25}
                    onClick={() => likePost()}
                  />
                )}
                <MdOutlineComment
                  className="cursor-pointer"
                  size={25}
                  onClick={() =>
                    focusCommentBox()
                  }
                />
              </div>
              <div className="card-secondary-actions">
                {isPostSaved(
                  userData?.savedPost,
                  postID!
                ) ? (
                  <MdOutlineBookmark
                    size={25}
                    className="cursor-pointer"
                    onClick={() =>
                      removePostFromSaved()
                    }
                  />
                ) : (
                  <MdOutlineBookmarkBorder
                    size={25}
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(
                        toggleCollectionList()
                      );
                    }}
                  />
                )}

                {isCollectionListOpen && (
                  <div className="relative">
                    <SavePost
                      data={{
                        userData,
                        postData: {
                          post: postData as UserPost,
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="px-2">
              <h5 className="text-md font-medium">
                <span className="font-semibold">
                  {postData?.likes.length}
                </span>{" "}
                Likes
              </h5>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-black p-3">
            <div className="relative flex w-full items-center gap-1">
              <MdOutlineEmojiEmotions
                className="cursor-pointer"
                size={25}
                onClick={() =>
                  setTogglEmojiKeyboard(
                    (prev) => !prev
                  )
                }
              />
              {toggleEmojikeyboard && (
                <EmojiKeyboard
                  addEmojiFunc={setComment}
                />
              )}
              <input
                className="relative w-full  border-0 bg-transparent outline-none"
                type="text"
                placeholder="Add comment"
                onChange={(e) =>
                  setComment(e.target.value)
                }
                value={comment}
                ref={commentRef}
              />
            </div>
            <button
              className={`border-0 bg-transparent p-0 text-sm font-semibold outline-none ${
                !comment
                  ? `: text-gray-500`
                  : `text-black`
              }`}
              onClick={() => postComment()}
              disabled={comment ? false : true}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {collectionModal && (
        <CreateCollectionModal />
      )}
      {isPostOptionsModalOpen && <PostOptions />}
      {isUpdatePostModalOpen && (
        <UpdatePostModal />
      )}
    </div>
  );
};

export default FullPostCard;
