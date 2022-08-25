import { useNavigate } from "react-router-dom";

const ExploreCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-full w-full cursor-pointer transition hover:bg-black/100"
      onClick={() => navigate(`/post/${data.postID}`)}
    >
      <img className="h-full w-full object-cover " src={data?.img} alt="post" />
    </div>
  );
};

export default ExploreCard;
