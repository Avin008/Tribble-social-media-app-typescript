import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { ExploreCard } from "../../components";
import { db } from "../../firebase/firebaseConfig";
const ExplorePage = () => {
  const { token } = useSelector((store) => store.authSlice);

  const { data: posts, isLoading } = useQuery(["explore"], async () => {
    const postCollectionRef = collection(db, "posts");
    return (await getDocs(postCollectionRef)).docs.map((x) => x.data());
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-auto mt-20 mb-4 grid w-3/5 grid-flow-row auto-rows-[300px] grid-cols-3 gap-4">
      {posts.map((x) => (
        <ExploreCard data={x} />
      ))}
    </div>
  );
};

export default ExplorePage;
