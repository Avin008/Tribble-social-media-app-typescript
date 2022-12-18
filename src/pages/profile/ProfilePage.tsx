import { useParams } from "react-router-dom";
import { ProfilePageContainer } from "../../components/profilePageContainer/ProfilePageContainer";

const ProfilePage = () => {
  const { id } = useParams();

  return <ProfilePageContainer key={id} />;
};

export default ProfilePage;
