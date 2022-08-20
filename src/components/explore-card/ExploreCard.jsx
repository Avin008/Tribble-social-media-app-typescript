import { useDispatch } from "react-redux";
import { openPostModal } from "../../redux-toolkit/features/postModalSlice";

const ExploreCard = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="h-full w-full cursor-pointer transition hover:bg-black/100"
      onClick={() => dispatch(openPostModal({ postID: data.postID }))}
    >
      <img className="h-full w-full object-cover " src={data?.img} alt="" />
    </div>
  );
};

export default ExploreCard;
