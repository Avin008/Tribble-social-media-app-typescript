import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCollectionModal,
  LoggedInUserCard,
  PostOptions,
  Suggestions,
  UpdatePostModal,
  VerticalPostCard,
} from "../../components";
import { db } from "../../firebase/firebaseConfig";
import { initiateUserData } from "../../redux-toolkit/features/userSlice";

const HomePage = () => {
  const { token } = useSelector((store) => store.authSlice);
  const { isPostOptionsModalOpen } = useSelector(
    (store) => store.postOptionsModalSlice
  );
  const { collectionModal } = useSelector(
    (store) => store.collectionModalSlice
  );

  const { isUpdatePostModalOpen } = useSelector(
    (store) => store.updatePostModalSlice
  );
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery(
    ["users"],
    async () => {
      const docRef = doc(db, "users", token);
      const res = (await getDoc(docRef)).data();
      return res;
    },
    {
      onSuccess: (data) => {
        dispatch(initiateUserData({ userInfo: data }));
      },
    }
  );

  const { data: followedPosts, isLoading: followedPostLoading } = useQuery(
    ["followed-user-post"],
    async () => {
      const postCollection = collection(db, "posts");
      return (await getDocs(postCollection)).docs.map((x) => x.data());
    }
  );

  const getFollowedPosts = (allPosts, userFollowing) => {
    const filteredPosts = [];
    allPosts.forEach((x) => {
      if (userFollowing.includes(x.userID) || x.userID === token) {
        filteredPosts.push(x);
      }
    });
    return filteredPosts.sort((a, b) => b.dateCreated - a.dateCreated);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (followedPostLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-auto mt-20 mb-5 grid h-full w-3/5 grid-cols-2 gap-12">
      <div className="space-y-4">
        {getFollowedPosts(followedPosts, data.following).length !== 0 ? (
          getFollowedPosts(followedPosts, data.following).map((x) => (
            <VerticalPostCard data={x} />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <span className="p-4">
              <h1 className="text-5xl">😎</h1>
            </span>
            <h1 className="font-semibold">
              Currently you are not following anyone
            </h1>
            <h1 className="font-semibold">follow people to view posts</h1>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <LoggedInUserCard data={data} />
        <Suggestions data={data} />
      </div>
      {isPostOptionsModalOpen && <PostOptions />}
      {collectionModal && <CreateCollectionModal />}
      {isUpdatePostModalOpen && <UpdatePostModal />}
    </div>
  );
};

export default HomePage;
