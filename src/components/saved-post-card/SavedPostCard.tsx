type Props = {
  img: string;
  collectionName: string;
};

const SavedPostCard = ({ data }: { data: Props }) => {
  return (
    <div className="relative h-72 w-full cursor-pointer">
      <img className="h-full w-full object-cover" src={data.img} alt="" />
      <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-black/50 p-4">
        <h4 className="font-semibold text-white">{data.collectionName}</h4>
      </div>
    </div>
  );
};

export default SavedPostCard;
