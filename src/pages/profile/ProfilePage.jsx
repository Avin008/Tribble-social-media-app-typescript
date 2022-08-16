import { useSelector } from "react-redux";
import { ProfileTabs, UserProfileCard, ViewPostCard } from "../../components";

const ProfilePage = () => {
  const { isModalOpen } = useSelector((store) => store.postModalSlice);

  return (
    <div className="mx-auto mt-20 flex w-3/5 flex-col gap-5">
      <UserProfileCard />
      <ProfileTabs />
      {isModalOpen && <ViewPostCard />}
    </div>
  );
};

export default ProfilePage;
