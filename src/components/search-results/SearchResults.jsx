import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

const SearchResults = ({ data: search }) => {
  const { data: result, isLoading } = useQuery(
    ["search-key"],
    async () => {
      const userCollectionRef = collection(db, "users");
      return (await getDocs(userCollectionRef)).docs.map((x) => x.data());
    },
    {
      select: (data = "") => {
        return data.filter((x) => x.username.includes(search ? search : null));
      },
    }
  );

  return (
    <ul className="absolute top-12 -left-10 flex min-h-[4rem] w-80 list-none flex-col gap-1 rounded-md border border-black bg-white py-1">
      {search && result.length === 0 && (
        <span className="flex justify-center p-1 font-semibold">
          user not found
        </span>
      )}
      {result?.map((x) => (
        <Link
          to={`/profile/${x.userId}`}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
          onClick
        >
          <div className="h-10 w-10">
            <img
              className="h-full w-full rounded-full object-cover"
              src={x.profileImg}
              alt=""
            />
          </div>
          <div className="leading-4">
            <p className="font-medium">{x.fullname}</p>
            <p className="text-sm font-medium">{x.username}</p>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default SearchResults;
