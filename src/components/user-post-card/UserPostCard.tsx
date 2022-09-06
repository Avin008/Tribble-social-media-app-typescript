import { useNavigate } from "react-router-dom";
import { UserPost } from "../../types/type";

const UserPostCard = ({ data }: { data: UserPost }) => {
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
