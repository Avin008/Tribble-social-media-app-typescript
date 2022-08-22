import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openPostModal } from "../../redux-toolkit/features/postModalSlice";

const UserPostCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="relative h-72 w-full cursor-pointer"
      onClick={() => navigate(`/post/${data.postID}`)}
    >
      <img className="h-full w-full object-cover" src={data.img} alt="" />
    </div>
  );
};

export default UserPostCard;
