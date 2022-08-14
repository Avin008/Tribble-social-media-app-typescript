import { SavedCard, ViewPostCard } from "../../components";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useParams } from "react-router-dom";

const SavedPostPage = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto mb-4 mt-20 flex w-3/5 flex-col gap-3">
      <Link
        className="flex items-center text-sm font-semibold text-gray-500"
        to="/"
      >
        <MdKeyboardArrowLeft size={25} /> Saved
      </Link>
      <h1 className="text-lg font-semibold">{"folderName"}</h1>
      <div className=" grid  grid-flow-row auto-rows-[300px] grid-cols-3 gap-4">
        {<SavedCard />}
      </div>
      {false && <ViewPostCard />}
    </div>
  );
};

export default SavedPostPage;
