import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "../../icons";
import { useDispatch } from "react-redux";
import { useGetUserData } from "../../hooks/useGetUserInfo";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import { closeUpdatePostModal } from "../../redux-toolkit/features/updatePostModalSlice";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";
import { useAppSelector } from "../../redux-toolkit/hooks";
const UpdatePostModal = () => {
  const fileRef = useRef<HTMLImageElement>(null);
  const [files, setFile] = useState(null);
  const dispatch = useDispatch();
  const { postData } = useAppSelector((store) => store.postOptionsModalSlice);

  const [post, setPost] = useState(postData);

  const handleClick = () => {
    fileRef.current!.click();
  };

  const queryClient = useQueryClient();

  const onUpdatePostSuccess = () => {
    queryClient.invalidateQueries(["posts"]);
    queryClient.invalidateQueries(["followed-user-post"]);
    window.location.reload();
  };

  const {
    mutate: updatePost,
    isLoading,
    // @ts-ignore
  } = useUpdatePost(postData.postID, files, post.caption, onUpdatePostSuccess);

  const { data: userData, isLoading: isUserDataLoading } =
    useGetUserData("users");

  if (isUserDataLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-black/50">
      <div className="h-2/4 w-2/4 rounded-xl border bg-white">
        <div className="flex justify-center border-b border-black p-2">
          <h1 className="font-semibold">Update post</h1>
        </div>
        <div className="grid h-[70%] grid-cols-2">
          <div className={`relative h-60 w-full p-1`}>
            <img
              className="h-full w-full object-contain"
              // @ts-ignore
              src={(files && URL.createObjectURL(files)) || post.img}
              alt=""
            />

            <div
              className="absolute top-20 flex w-full cursor-pointer flex-col items-center justify-center"
              onClick={handleClick}
            >
              <input
                type="file"
                // @ts-ignore
                ref={fileRef}
                hidden
                // @ts-ignore
                onChange={(e) => setFile(e.target.files[0])}
              />
              <MdOutlineAddPhotoAlternate size={40} className={`text-white`} />
              <p className="text-sm font-semibold text-white">
                {!files && "Click here update Image"}
                {files && "Click here Change Image"}
              </p>
            </div>
          </div>
          <div className="border-l border-black">
            <div className="flex items-center gap-2 p-2">
              <div className="h-8 w-8">
                <img
                  className="h-full w-full rounded-full border border-gray-500 object-cover"
                  src={userData?.profileImg ? userData?.profileImg : avatarImg}
                  alt=""
                />
              </div>
              <h1 className="text-sm font-bold text-gray-800">
                {userData?.username}
              </h1>
            </div>
            <div className="p-1">
              <textarea
                placeholder="Update caption"
                className="h-32 w-full resize-none p-2 font-semibold outline-none"
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, caption: e.target.value }))
                }
                // @ts-ignore
                value={post?.caption}
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 border-t border-black px-4 py-2">
              <button
                className="rounded-md border  border-purple-500 bg-white px-4 py-1 font-medium text-purple-500"
                onClick={() => dispatch(closeUpdatePostModal())}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-purple-500 px-4 py-1 font-normal text-white"
                onClick={() => updatePost()}
              >
                {!isLoading ? "update post" : "updating..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePostModal;
