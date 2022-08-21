import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ProfileTabs, UserProfileCard } from "../../components";
import { db } from "../../firebase/firebaseConfig";

const ProfilePage = () => {
  const { id } = useParams();

  // fetch userData by userID
  const { data: userData, isLoading } = useQuery(
    ["current-user-data"],
    async () => {
      const userDocRef = doc(db, "users", id);
      return (await getDoc(userDocRef)).data();
    }
  );

  // fetch userPosts

  const { data: userPostsData, isLoading: isUserPostsLoading } = useQuery(
    ["user-posts"],
    async () => {
      const postsCollectionRef = collection(db, "posts");
      const queryKey = query(postsCollectionRef, where("userID", "==", id));
      return (await getDocs(queryKey)).docs.map((x) => x.data());
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-auto mt-20 flex w-3/5 flex-col gap-5">
      <UserProfileCard data={{ userData, userPostsData }} />
      {isUserPostsLoading ? (
        "<h1>Loading...</h1>"
      ) : (
        <ProfileTabs data={{ userData, userPostsData }} />
      )}
    </div>
  );
};

export default ProfilePage;
