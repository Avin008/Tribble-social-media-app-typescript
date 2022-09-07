import { useNavigate } from "react-router-dom";
import { Posts } from "../../types/type";

type Props = {
  data: Posts;
};

const ExploreCard = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-full w-full cursor-pointer transition hover:bg-black/100"
      onClick={() => navigate(`/post/${data.postID}`)}
    >
      <img className="h-full w-full object-cover " src={data?.img} alt="" />
    </div>
  );
};

export default ExploreCard;
