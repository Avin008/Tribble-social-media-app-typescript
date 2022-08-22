import { SavedCard } from "../../components";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ClipLoader } from "react-spinners";

const SavedPostPage = () => {
  const { collectionID } = useParams();
  const { token } = useSelector((store) => store.authSlice);

  const { data, isLoading } = useQuery(["saved-post"], async () => {
    const userDocRef = doc(db, "users", token);
    return (await getDoc(userDocRef)).data();
  });

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader color="gray" size={40} loading={isLoading} />
      </div>
    );
  }

  const savedPosts = data.savedPost.filter(
    (x) => x.collectionID === collectionID
  );

  return (
    <div className="mx-auto mb-4 mt-20 flex w-3/5 flex-col gap-3">
      <h1 className="text-lg font-semibold">{savedPosts[0].folderName}</h1>
      {savedPosts[0].posts.length ? (
        <div className=" grid  grid-flow-row auto-rows-[300px] grid-cols-3 gap-4">
          {savedPosts[0]?.posts.map((x) => (
            <SavedCard data={x} />
          ))}
        </div>
      ) : (
        <h1>No post To Show</h1>
      )}
    </div>
  );
};

export default SavedPostPage;
