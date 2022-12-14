import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useCreatePost } from "../../hooks/useCreatePost";
import { closeCreatePostModal } from "../../redux-toolkit/features/createPostModalSlice";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";
import { toast } from "react-toastify";

const CreatePostModal = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFile] = useState<null | Blob>(
    null
  );
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  const { loggedInUser } = useAppSelector(
    (store) => store.userSlice
  );

  const handleClick = () => {
    fileRef.current!.click();
  };

  const queryClient = useQueryClient();

  const onSuccess = () => {
    dispatch(closeCreatePostModal());
    queryClient.invalidateQueries([
      "followed-user-post",
    ]);
  };

  const { mutate: createPost, isLoading } =
    useCreatePost(
      loggedInUser,
      files!,
      caption,
      onSuccess
    );

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/50">
      <div className="h-2/4 w-2/4 rounded-xl border bg-white">
        <div className="flex justify-center border-b border-black p-2">
          <h1 className="font-semibold">
            Create new post
          </h1>
        </div>
        <div className="grid h-[70%] grid-cols-2">
          <div
            className={`relative h-60 w-full p-1`}
          >
            <img
              className="h-full w-full object-contain"
              src={
                files! &&
                URL.createObjectURL(files)
              }
              alt=""
            />

            <div
              className="absolute top-20 flex w-full flex-col items-center justify-center"
              onClick={handleClick}
            >
              <input
                type="file"
                ref={fileRef}
                hidden
                onChange={(e) =>
                  setFile(e.target.files![0])
                }
              />
              <MdOutlineAddPhotoAlternate
                size={40}
                className={
                  files === null
                    ? `text-black`
                    : `text-white`
                }
              />
              <p
                className={
                  files === null
                    ? `text-black`
                    : `font-semibold text-white`
                }
              >
                {files &&
                  "Click here to change Image"}
                {!files &&
                  "Click here to Upload Image"}
              </p>
            </div>
          </div>
          <div className="border-l border-black">
            <div className="flex items-center gap-2 p-2">
              <div className="h-8 w-8">
                <img
                  className="h-full w-full rounded-full border border-gray-500 object-cover"
                  src={
                    loggedInUser.profileImg
                      ? loggedInUser.profileImg
                      : avatarImg
                  }
                  alt=""
                />
              </div>
              <h1 className="text-sm font-bold text-gray-800">
                {loggedInUser.username}
              </h1>
            </div>
            <div className="p-1">
              <textarea
                placeholder="Write a caption"
                className="h-32 w-full resize-none p-2 font-semibold outline-none"
                onChange={(e) =>
                  setCaption(e.target.value)
                }
                value={caption}
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 border-t border-black px-4 py-2">
              <button
                className="rounded-md border  border-purple-500 bg-white px-6 py-1 font-medium text-purple-500"
                onClick={() =>
                  dispatch(closeCreatePostModal())
                }
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-purple-500 px-6 py-1 font-normal text-white"
                onClick={() => {
                  if (caption && files !== null) {
                    createPost();
                    toast.success(
                      "post created successfully"
                    );
                  } else {
                    toast.warn(
                      "post image and caption cannot be empty"
                    );
                  }
                }}
              >
                {!isLoading
                  ? "post"
                  : "posting..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostModal;
