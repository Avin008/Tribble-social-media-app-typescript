import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSuggestions } from "../../firebase/firebaseConfig";
import { useFollowSuggestedUsers } from "../../hooks/useFollowSuggestedUsers";
import { useGetAllUsers } from "../../hooks/useGetAllUsers";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";

const Suggestions = () => {
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const queryClient = useQueryClient();

  const { data: suggestions, isLoading } = useGetAllUsers("suggestions");

  const onFollowSuggestedUserSuccess = () => {
    queryClient.invalidateQueries(["users"]);
  };

  const { mutate: followUser } = useFollowSuggestedUsers(
    loggedInUser.userId,
    onFollowSuggestedUserSuccess
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-fit w-72 p-3">
      <h1 className="font-semibold text-gray-500">Suggestions for you</h1>
      {getSuggestions(
        suggestions,
        loggedInUser.following,
        loggedInUser.userId
      ).map((x) => (
        <div className="flex h-fit justify-between py-2">
          <div className="flex items-center gap-2 px-2 font-medium">
            <div className="h-10 w-10">
              <img
                className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
                src={x.profileImg ? x.profileImg : avatarImg}
                alt=""
              />
            </div>
            <span className="leading-4">
              <Link to={`/profile/${x.userId}`}>{x.username}</Link>
              <h2 className="text-sm">{x.fullname}</h2>
            </span>
          </div>
          {!loggedInUser.following.includes(x.userId) && (
            <button
              className="font-medium text-purple-800"
              onClick={() => followUser(x.userId)}
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
