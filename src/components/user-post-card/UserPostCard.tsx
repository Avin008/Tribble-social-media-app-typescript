import { useDispatch, useSelector } from "react-redux";
import { openPostModal } from "../../redux-toolkit/features/postModalSlice";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  img: string;
};

const UserPostCard = ({ data }: { data: Props }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return (
    <div
      className="relative h-72 w-full cursor-pointer"
      onClick={() => {
        dispatch(openPostModal(data));
        queryClient.clear();
      }}
    >
      <img className="h-full w-full object-cover" src={data.img} alt="" />
    </div>
  );
};

export default UserPostCard;
