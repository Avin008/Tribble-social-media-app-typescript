import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
const UserProfileCard = () => {
  const { token } = useSelector((store) => store.authSlice);

  const { data, isLoading } = useQuery(["users"], async () => {
    const userDocRef = doc(db, "users", token);
    return (await getDoc(userDocRef)).data();
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex h-fit w-full items-center gap-12 rounded-lg border border-gray-500 bg-white p-4">
      <div className="">
        <div className="h-32 w-32">
          <img
            src={data.profileImg}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-3xl font-light">{data.username}</h4>

          <button className="cursor-pointer rounded-md border-0 bg-purple-700 px-4 py-1 text-sm font-medium text-white">
            Follow
          </button>
        </div>
        <div className="flex space-x-8">
          <h5 className="font-medium">
            <span className="font-semibold">{data.posts.length}</span> Posts
          </h5>
          <h5 className="font-medium">
            <span className="font-semibold">{data.followers.length}</span>{" "}
            Followers
          </h5>
          <h5 className="font-medium">
            <span className="font-semibold">{data.following.length}</span>{" "}
            Following
          </h5>
        </div>
        <div className="space-y-1">
          <h5 className="font-semibold">{data.fullname}</h5>
          <h5 className="text-base font-medium">{data.bio}</h5>
          <a
            href={`https://www.{data.portfolio}`}
            className="text-none font-medium text-purple-800"
          >
            {data.portfolio}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
