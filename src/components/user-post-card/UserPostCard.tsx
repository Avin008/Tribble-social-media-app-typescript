type Props = {
  img: string;
};

const UserPostCard = ({ data }: { data: Props }) => {
  return (
    <div className="relative h-72 w-full cursor-pointer">
      <img className="h-full w-full object-cover" src={data.img} alt="" />
    </div>
  );
};

export default UserPostCard;
