import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

const Suggestions = () => {
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const { data: suggestions, isLoading } = useQuery(
    ["suggestions"],
    async () => {
      const userCollectionRef = collection(db, "users");
      return (await getDocs(userCollectionRef)).docs.map((x) => x.data());
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-fit w-72 p-3">
      <h1 className="font-semibold text-gray-500">Suggestions for you</h1>
      {suggestions.map((x) => (
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
              <Link to={`/profile/${x.userId}`}>{x.username}</Link>
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
