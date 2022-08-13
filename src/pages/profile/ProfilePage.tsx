import { ProfileTabs, UserProfileCard, ViewPostCard } from "../../components";

const ProfilePage = () => {
  return (
    <div className="mx-auto mt-20 flex w-3/5 flex-col gap-5">
      <UserProfileCard />
      <ProfileTabs />
      {false && <ViewPostCard />}
    </div>
  );
};

export default ProfilePage;
