const UserProfileCard = () => {
  return (
    <div className="flex h-fit w-full items-center gap-12 rounded-lg border border-gray-500 bg-white p-4">
      <div className="">
        <div className="h-32 w-32">
          <img
            src={
              "https://images.unsplash.com/photo-1570015652016-f4d63e51b2c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM0fHxwcm9maWxlJTIwcGljdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
            }
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-3xl font-light">{"Natasha Bora"}</h4>

          <button className="cursor-pointer rounded-md border-0 bg-purple-700 px-4 py-1 text-sm font-medium text-white">
            Follow
          </button>
        </div>
        <div className="flex space-x-8">
          <h5 className="font-medium">
            <span className="font-semibold">{10}</span> Posts
          </h5>
          <h5 className="font-medium">
            <span className="font-semibold">{5}</span> Followers
          </h5>
          <h5 className="font-medium">
            <span className="font-semibold">{20}</span> Following
          </h5>
        </div>
        <div className="space-y-1">
          <h5 className="font-semibold">{"Natasha Bora"}</h5>
          <h5 className="text-base font-medium">
            {"Web Developer 😎 | Javascript ❤"}
          </h5>
          <a
            href="www.google.com"
            className="text-none font-medium text-purple-800"
          >
            natashabora.netlify.app
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
