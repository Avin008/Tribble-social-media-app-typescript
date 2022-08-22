import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../../firebase/firebaseConfig";
import { closePostModal } from "../../redux-toolkit/features/postModalSlice";
import { closeUpdatePostModal } from "../../redux-toolkit/features/updatePostModalSlice";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";
const UpdatePostModal = () => {
  const fileRef = useRef(null);
  const [files, setFile] = useState(null);
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.authSlice);
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const { postData } = useSelector((store) => store.postOptionsModalSlice);

  const [post, setPost] = useState(postData);

  const handleClick = () => {
    fileRef.current.click();
  };

  const queryClient = useQueryClient();

  const { mutate: mutateUpdatePost, isLoading } = useMutation(
    async () => {
      const userPostRef = doc(db, "posts", postData.postID);
      const storageRef = ref(storage, `/posts/${token}/${postData.postID}.jpg`);
      const newImg = files && (await uploadBytes(storageRef, files));
      const updatedPostObj = {
        caption: post.caption,
        img: (files && files) || post.img,
        dateCreated: Date.now(),
      };
      return await updateDoc(userPostRef, updatedPostObj);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["followed-user-post"]);
        window.location.reload();
        dispatch(closeUpdatePostModal());
        // dispatch(closePostModal());
      },
    }
  );

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
              src={(files && URL.createObjectURL(files)) || post.img}
              alt=""
            />

            <div
              className="absolute top-20 flex w-full cursor-pointer flex-col items-center justify-center"
              onClick={handleClick}
            >
              <input
                type="file"
                ref={fileRef}
                hidden
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
                placeholder="Update caption"
                className="h-32 w-full resize-none p-2 font-semibold outline-none"
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, caption: e.target.value }))
                }
                value={post.caption}
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
                onClick={() => mutateUpdatePost()}
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
