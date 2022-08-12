import {
  MdOutlineEmojiEmotions,
  MdOutlineBookmarkBorder,
  MdOutlineComment,
  MdOutlineFavoriteBorder,
  MdMoreHoriz,
} from "react-icons/md";
const VerticalPostCard = () => {
  return (
    <div className="h-fit w-96 rounded-lg border border-black bg-white">
      <div className="flex h-14 items-center justify-between border-b border-black p-2">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10">
            <img
              className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
              src="https://images.unsplash.com/photo-1660110583004-b9c1a8692076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
              alt=""
            />
          </div>
          <h1 className="text-sm font-semibold">Natasha Bora</h1>
        </div>
        <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
          <MdMoreHoriz size={25} />
        </span>
      </div>
      <div className="h-auto border-b border-black">
        <img
          className="aspect-auto h-full w-full"
          src={
            "https://images.unsplash.com/photo-1660075119027-8ad18e0925b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80"
          }
          alt=""
        />
      </div>
      <div className="space-y-1 border border-b-black p-1">
        <div className="flex items-center justify-between p-1">
          <div className="flex gap-2">
            <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
              <MdOutlineFavoriteBorder size={28} className="" />
            </span>
            <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
              <MdOutlineComment size={28} className="" />
            </span>
          </div>

          <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
            <MdOutlineBookmarkBorder size={28} className="" />
          </span>
        </div>
        <div className="space-y-1 px-2">
          <div className="flex">
            <p className="text-sm font-medium">
              <span className="font-semibold">Natasha Bora</span> Lorem, ipsum
              dolor sit amet.
            </p>
          </div>
          <div className="">
            <p className="cursor-pointer text-sm font-medium text-gray-700 hover:underline">
              View all comments
            </p>
          </div>
          <ul className="">
            <li className="text-sm font-medium">
              <span className="font-semibold">Natasha Bora</span> Lorem ipsum
              dolor sit amet.
            </li>
            <li className="text-sm font-medium">
              <span className="font-semibold">Natasha Bora</span> Lorem ipsum
              dolor sit amet.
            </li>
          </ul>
          <div className="">
            <p className="text-sm font-medium text-gray-500">2 DAY AGO</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1 p-2 px-2">
        <span className="cursor-pointer rounded-full p-1 hover:bg-gray-200 active:bg-gray-300">
          <MdOutlineEmojiEmotions size={25} />
        </span>
        <textarea
          rows={1}
          className="w-full resize-none outline-none"
          name=""
          id=""
          placeholder="Add Comment"
        ></textarea>
        <button className="font-medium text-gray-500" disabled>
          Post
        </button>
      </div>
    </div>
  );
};

export default VerticalPostCard;
