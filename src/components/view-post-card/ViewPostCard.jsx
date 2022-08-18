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
import { useDispatch, useSelector } from "react-redux";
import { closePostModal } from "../../redux-toolkit/features/postModalSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import {
  db,
  isPostSaved,
  likePost,
  postComment,
  removedFromSavedPost,
  unlikePost,
} from "../../firebase/firebaseConfig";
import PostOptions from "../post-options/PostOptions";

const ViewPostCard = () => {
  const [toggleCollection, setToggleCollection] = useState(false);
  const [toggleEmojikeyboard, setTogglEmojiKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [togglePostOptions, setTogglePostOptions] = useState(false);

  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const postID = useSelector((store) => store.postModalSlice.postID);
  const token = useSelector((store) => store.authSlice.token);
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const { collectionModal } = useSelector(
    (store) => store.collectionModalSlice
  );

  // fetch post Data by postID

  const { data: postData, isLoading } = useQuery(["posts"], async () => {
    const post = { post: "", user: "" };
    const postDocRef = doc(db, "posts", postID);
    post.post = (await getDoc(postDocRef)).data();
    const userDocRef = doc(db, "users", post.post.userID);
    post.user = (await getDoc(userDocRef)).data();
    return post;
  });

  // remove post from saved

  const { isLoading: isWritingData, mutate } = useMutation(
    async () => {
      return await removedFromSavedPost(
        postData.user.userId,
        postData.user.savedPost,
        postData.post.postID
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // like post

  const { mutate: mutateLike } = useMutation(
    async () => {
      return await likePost(postData.post.postID, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // unlike post

  const { mutate: mutateUnLike } = useMutation(
    async () => {
      return await unlikePost(postData.post.postID, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
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
        postData.post.postID,
        comment
      );
    },
    {
      onSuccess: () => {
        setComment("");
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-black/50">
      <div className="absolute top-4 right-8">
        <MdClose
          size={30}
          className="cursor-pointer text-white"
          onClick={() => dispatch(closePostModal())}
        />
      </div>
      <div className="grid h-4/5 w-3/5 grid-flow-row auto-rows-[480px] grid-cols-2 bg-white">
        <div className="bg-black py-4 px-0">
          <div className="h-full w-full">
            <img
              className="h-full w-full object-cover"
              src={postData.post.img}
              alt=""
            />
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-between border-b border-gray-800 p-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10">
                <img
                  src={postData.user.profileImg}
                  alt=""
                  className="h-full w-full rounded-full border border-black object-cover"
                />
              </div>
              <h5 className="font-medium">{postData.user.username}</h5>
            </div>
            <div className="rounded-full p-1 hover:bg-gray-200">
              <MdOutlineMoreHoriz
                size={25}
                className="cursor-pointer"
                onClick={() => setTogglePostOptions((prev) => !prev)}
              />
            </div>
          </div>
          <div className="scrollbar-hide flex h-3/5 flex-col gap-4 overflow-scroll p-3">
            <p className="text-base font-normal">{postData.post.caption}</p>

            {postData.post.comments.map((x) => {
              return (
                <div className="flex items-center gap-2">
                  <div>
                    <div className="h-10 w-10">
                      <img
                        src={x.profileImg}
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
                    <p className="text-sm font-medium">{x.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 border border-gray-700 bg-white">
            <div className="space-y-2 p-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {postData.post.likes.map((x) => x.userId).includes(token) ? (
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
                  <MdOutlineComment className="cursor-pointer" size={25} />
                </div>
                <div className="card-secondary-actions">
                  {isPostSaved(postData.user.savedPost, postID) ? (
                    <MdOutlineBookmark
                      size={25}
                      className="cursor-pointer"
                      onClick={() => mutate()}
                    />
                  ) : (
                    <MdOutlineBookmarkBorder
                      size={25}
                      className="cursor-pointer"
                      onClick={() => setToggleCollection((prev) => !prev)}
                    />
                  )}
                  {toggleCollection && (
                    <div className="relative">
                      <SavePost data={postData} />
                    </div>
                  )}
                </div>
              </div>
              <div className="px-2">
                <h5 className="text-md font-medium">
                  <span className="font-semibold">
                    {postData.post.likes.length}
                  </span>{" "}
                  Likes
                </h5>
                <h5 className="text-sm font-medium text-gray-700">
                  {postData.post.dateCreated}
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
                {toggleEmojikeyboard && (
                  <EmojiKeyboard addEmojiFunc={setComment} />
                )}
                <input
                  className="relative w-full  border-0 bg-transparent outline-none"
                  type="text"
                  placeholder="Add comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </div>
              <button
                className={`border-0 bg-transparent p-0 text-sm font-semibold outline-none ${
                  !comment ? `: text-gray-500` : `text-black`
                }`}
                onClick={() => mutateAddComment()}
                disabled={comment ? false : true}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {collectionModal && <CreateCollectionModal />}
      {togglePostOptions && <PostOptions toggleFunc={setTogglePostOptions} />}
    </div>
  );
};

export default ViewPostCard;
