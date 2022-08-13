import { ProfileTabs, UserProfileCard } from "../../components";

const ProfilePage = () => {
  return (
    <div className="mx-auto mt-20 w-3/5 space-y-5">
      <UserProfileCard />
      <ProfileTabs />
    </div>
  );
};

export default ProfilePage;
