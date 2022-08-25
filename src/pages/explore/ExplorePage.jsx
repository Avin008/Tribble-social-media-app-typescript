import { ExploreCard } from "../../components";
import { ClipLoader } from "react-spinners";
import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import { uuidv4 as uuid } from "@firebase/util";
const ExplorePage = () => {
  const { data: posts, isLoading } = useGetAllPosts("explore");

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader color="gray" size={40} loading={isLoading} />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 mb-4 grid w-3/5 grid-flow-row auto-rows-[300px] grid-cols-3 gap-4">
      {posts.map((x) => (
        <ExploreCard key={uuid()} data={x} />
      ))}
    </div>
  );
};

export default ExplorePage;
