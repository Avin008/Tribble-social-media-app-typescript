import { useNavigate } from "react-router-dom";

const SavedPostCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-72 w-full cursor-pointer"
      onClick={() => navigate(`/saved-posts/${data.folderName}`)}
    >
      <img
        className="h-full w-full object-cover"
        src={data.posts[0]?.img}
        alt=""
      />
      {!data.posts.length && (
        <div className="absolute top-24 left-12 font-medium">
          No Posts to Show
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-black/50 p-4">
        <h4 className="font-semibold text-white">{data.folderName}</h4>
      </div>
    </div>
  );
};

export default SavedPostCard;
