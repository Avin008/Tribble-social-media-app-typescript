import { useNavigate } from "react-router-dom";
import { Posts } from "../../types/type";

const SavedCard = ({ data }: { data: Posts }) => {
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

export default SavedCard;
