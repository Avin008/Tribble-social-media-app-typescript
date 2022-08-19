import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";

const LoggedInUserCard = ({ data }) => {
  const { token } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();

  return (
    <div className="flex h-fit w-72 justify-between rounded-md p-2">
      <div className="flex items-center gap-2 font-medium">
        <div className="h-10 w-10">
          <img
            className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
            src={data.profileImg ? data.profileImg : avatarImg}
            alt=""
          />
        </div>
        <span className="leading-4">
          <h1>{data.username}</h1>
          <h2 className="text-sm">{data.fullName}</h2>
        </span>
      </div>
      <button
        className="font-medium text-purple-800"
        onClick={() => navigate(`/profile/${data.userId}`)}
      >
        Profile
      </button>
    </div>
  );
};

export default LoggedInUserCard;
