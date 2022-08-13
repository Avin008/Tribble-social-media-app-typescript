type Props = {
  profileImg: string;
  username: string;
  fullname: string;
  followerUserId: string;
};

const Suggestions = ({ data }: { data: Props[] }) => {
  return (
    <div className="h-fit w-72 p-3">
      <h1 className="font-semibold text-gray-500">Suggestions for you</h1>
      {data.map((x) => (
        <div className="flex h-fit justify-between py-2">
          <div className="flex items-center gap-2 px-2 font-medium">
            <div className="h-10 w-10">
              <img
                className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
                src={x.profileImg}
                alt=""
              />
            </div>
            <span className="leading-4">
              <h1>{x.username}</h1>
              <h2 className="text-sm">{x.fullname}</h2>
            </span>
          </div>
          <button className="font-medium text-purple-800">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
