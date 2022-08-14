import { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
const CreatePostModal = () => {
  const fileRef = useRef(null);
  const [files, setFile] = useState({});

  const handleClick = () => {
    // @ts-ignore: Object is possibly 'null'.
    fileRef.current.click();
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/50">
      <div className="h-2/4 w-2/4 rounded-xl border bg-white">
        <div className="flex justify-center border-b border-black p-2">
          <h1 className="font-semibold">Create new post</h1>
        </div>
        <div className="grid h-[70%] grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-1">
            <div
              className="absolute flex flex-col items-center"
              onClick={handleClick}
            >
              <input
                ref={fileRef}
                // @ts-ignore: Object is possibly 'null'.

                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                hidden
              />
              <MdOutlineAddPhotoAlternate className="text-gray-500" size={50} />
              <p className="text-sm font-medium">Click here to upload Image</p>
            </div>
          </div>
          <div className="border-l border-black">
            <div className="flex items-center gap-2 p-2">
              <div className="h-8 w-8">
                <img
                  className="h-full w-full rounded-full border border-gray-500 object-cover"
                  src="https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                />
              </div>
              <h1 className="text-sm font-bold text-gray-800">Natasha Bora</h1>
            </div>
            <div className="p-1">
              <textarea
                placeholder="Write a caption"
                className="h-32 w-full resize-none p-2 font-semibold outline-none"
                name=""
                id=""
              ></textarea>
            </div>
            <div className="flex justify-end border-t border-black p-2">
              <button className="rounded-lg bg-purple-500 px-4 py-1 font-normal text-white">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostModal;
