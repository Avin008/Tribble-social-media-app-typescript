import { useParams } from "react-router-dom";
import { ProfileTabs, UserProfileCard } from "../../components";
import { ClipLoader } from "react-spinners";
import { useGetUserDataById } from "../../hooks/useGetUserDataById";
import { useGetUserPostsById } from "../../hooks/useGetUserPostsById";

const ProfilePage = () => {
  const { id } = useParams();

  const { data: userData, isLoading: userDataLoading } = useGetUserDataById(
    "current-user-data",
    id!
  );

  const { data: userPostsData, isLoading: isUserPostsLoading } =
    useGetUserPostsById("user-posts", id!);

  if (userDataLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader color="gray" size={40} loading={isUserPostsLoading} />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 flex w-3/5 flex-col gap-5">
      {/* @ts-ignore */}
      <UserProfileCard data={{ userData, userPostsData }} />
      {isUserPostsLoading ? (
        "<h1>Loading...</h1>"
      ) : (
        <ProfileTabs data={{ userData, userPostsData }} />
      )}
    </div>
  );
};

export default ProfilePage;
