import { useDispatch } from "react-redux";
import { openPostModal } from "../../redux-toolkit/features/postModalSlice";

const UserPostCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="relative h-72 w-full cursor-pointer"
      onClick={() => dispatch(openPostModal({ postID: data.postID }))}
    >
      <img className="h-full w-full object-cover" src={data.img} alt="" />
    </div>
  );
};

export default UserPostCard;
