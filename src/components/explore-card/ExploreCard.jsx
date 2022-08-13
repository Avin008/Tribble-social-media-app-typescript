const ExploreCard = ({ data }) => {
  return (
    <div className="h-full w-full cursor-pointer">
      <img className="h-full w-full object-cover " src={data.img} alt="" />
    </div>
  );
};

export default ExploreCard;
