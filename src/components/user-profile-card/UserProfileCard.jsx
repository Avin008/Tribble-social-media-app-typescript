import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useUnfollowUser } from "../../hooks/useUnfollowUser";
const UserProfileCard = ({ data }) => {
  const { userPostsData, userData } = data;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { token } = useSelector((store) => store.authSlice);

  const onFollowUserSuccess = () => {
    queryClient.invalidateQueries(["current-user-data"]);
  };

  const {
    mutate: followUser,
    isLoading,
    isError,
  } = useFollowUser(userData.userId, onFollowUserSuccess);

  const onUnfollowUserSuccess = () => {
    queryClient.invalidateQueries(["current-user-data"]);
  };

  const { mutate: unFollowUser } = useUnfollowUser(
    userData.userId,
    onUnfollowUserSuccess
  );

  return (
    <div className="relative flex h-fit w-full items-center gap-12 rounded-lg border border-gray-500 bg-white p-4">
      <div className="">
        <div className="h-32 w-32">
          <img
            src={userData.profileImg}
            alt=""
            className="h-full w-full rounded-full border-2 border-black object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col flex-wrap space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-3xl font-light">{userData.username}</h4>

          <div className="absolute right-40">
            {" "}
            {userData.userId === token ? (
              <button
                className="cursor-pointer rounded-md border-0 bg-purple-700 px-4 py-1 text-sm font-medium text-white"
                onClick={() => navigate(`/edit-profile/${userData.userId}`)}
              >
                Edit Profile
              </button>
            ) : userData.followers.includes(token) ? (
              <button
                className="cursor-pointer rounded-md border-0 bg-purple-700 px-4 py-1 text-sm font-medium text-white"
                onClick={() => unFollowUser()}
              >
                unfollow
              </button>
            ) : (
              <button
                className="cursor-pointer rounded-md border-0 bg-purple-700 px-4 py-1 text-sm font-medium text-white"
                onClick={() => followUser()}
              >
                follow
              </button>
            )}
          </div>
        </div>
        <div className="flex space-x-8">
          <h5 className="font-medium">
            <span className="font-semibold">
              {userPostsData?.length ? userPostsData.length : "0"}
            </span>{" "}
            Posts
          </h5>
          <h5 className="font-medium">
            <span className="font-semibold">{userData.followers.length}</span>{" "}
            Followers
          </h5>
          <h5 className="font-medium">
            <span className="font-semibold">{userData.following.length}</span>{" "}
            Following
          </h5>
        </div>
        <div className="space-y-1">
          <h5 className="font-semibold">{userData.fullname}</h5>
          <h5 className="text-base font-medium">{userData.bio}</h5>
          <a
            href={`https://www.{userData.portfolio}`}
            className="text-none font-medium text-purple-800"
          >
            {userData.portfolio}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
