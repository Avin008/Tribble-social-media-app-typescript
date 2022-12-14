import { SavedCard } from "../../components";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGetUserDataById } from "../../hooks/useGetUserDataById";
import { uuidv4 as uuid } from "@firebase/util";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { SavedPosts } from "../../types/type";

const SavedPostPage = () => {
  const { collectionID } = useParams();
  const { token } = useAppSelector((store) => store.authSlice);

  const { data, isLoading } = useGetUserDataById("saved-post", token!);

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader color="gray" size={40} loading={isLoading} />
      </div>
    );
  }

  const savedPosts = data?.savedPost.filter(
    (x: SavedPosts) => x.collectionID === collectionID
  );

  return (
    <div className="mx-auto mb-4 mt-20 flex w-3/5 flex-col gap-3">
      <h1 className="text-lg font-semibold">{savedPosts[0].folderName}</h1>
      {savedPosts[0].posts.length ? (
        <div className=" grid  grid-flow-row auto-rows-[300px] grid-cols-3 gap-4">
          {savedPosts[0]?.posts.map((x: any) => (
            <SavedCard key={uuid()} data={x} />
          ))}
        </div>
      ) : (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <h1 className="text-lg font-medium">
            Collection Empty. No posts To Show
          </h1>
        </div>
      )}
    </div>
  );
};

export default SavedPostPage;
