import { useDispatch } from "react-redux";
import {
  CreateCollectionModal,
  LoggedInUserCard,
  PostOptions,
  Suggestions,
  UpdatePostModal,
  VerticalPostCard,
} from "../../components";
import { getFollowedPosts } from "../../firebase/firebaseConfig";
import { initiateUserData } from "../../redux-toolkit/features/userSlice";
import { ClipLoader } from "react-spinners";
import { useGetUserData } from "../../hooks/useGetUserInfo";
import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import { uuidv4 as uuid } from "@firebase/util";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { User } from "../../types/type";

const HomePage = () => {
  const { token } = useAppSelector(
    (store) => store.authSlice
  );
  const { isPostOptionsModalOpen } =
    useAppSelector(
      (store) => store.postOptionsModalSlice
    );
  const { collectionModal } = useAppSelector(
    (store) => store.collectionModalSlice
  );
  const { isUpdatePostModalOpen } =
    useAppSelector(
      (store) => store.updatePostModalSlice
    );

  const dispatch = useDispatch();

  const onSuccess = (data: User) => {
    dispatch(
      initiateUserData({ userInfo: data })
    );
  };

  const { data, isLoading } = useGetUserData(
    "users",
    onSuccess
  );
  const {
    data: followedPosts,
    isLoading: followedPostLoading,
  } = useGetAllPosts("followed-user-post");

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader
          size={40}
          color="gray"
          loading={isLoading}
        />
        ;
      </div>
    );
  }

  if (followedPostLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader
          size={40}
          loading={followedPostLoading}
          color="gray"
        />
        ;
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 mb-5 grid h-full w-3/5 grid-cols-2 gap-12">
      <div className="space-y-4">
        {getFollowedPosts(
          followedPosts,
          data?.following,
          token!
        ).length !== 0 ? (
          getFollowedPosts(
            followedPosts,
            data?.following,
            token!
          ).map((x) => (
            <VerticalPostCard
              key={uuid()}
              data={x}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <span className="p-4">
              <h1 className="text-5xl">😎</h1>
            </span>
            <h1 className="font-semibold">
              Currently you are not following
              anyone
            </h1>
            <h1 className="font-semibold">
              follow people to view posts
            </h1>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <LoggedInUserCard data={data} />
        <Suggestions />
      </div>
      {isPostOptionsModalOpen && <PostOptions />}
      {collectionModal && (
        <CreateCollectionModal />
      )}
      {isUpdatePostModalOpen && (
        <UpdatePostModal />
      )}
    </div>
  );
};

export default HomePage;
