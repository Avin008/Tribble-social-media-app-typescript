import { Link } from "react-router-dom";
import useGetSearchResult from "../../hooks/useGetSearchResults";
import { uuidv4 as uuid } from "@firebase/util";
// @ts-ignore
const SearchResults = ({ data: search }) => {
  const { data: result } = useGetSearchResult(search);

  return (
    <ul className="absolute top-12 -left-10 flex min-h-[4rem] w-80 list-none flex-col gap-1 rounded-md border border-black bg-white py-1">
      <p className="px-4 font-medium">Search Results</p>
      {search && result.length === 0 && (
        <span className="flex justify-center p-1 font-medium">
          user not found
        </span>
      )}
      {result?.map((x: any) => (
        <Link
          to={`/profile/${x.userId}`}
          className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
          key={uuid()}
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
