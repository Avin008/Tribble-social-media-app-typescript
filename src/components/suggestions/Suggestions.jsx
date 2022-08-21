import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { avatarImg } from "../vertical-post-card/VerticalPostCard";

const Suggestions = () => {
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const queryClient = useQueryClient();
  const { data: suggestions, isLoading } = useQuery(
    ["suggestions"],
    async () => {
      const userCollectionRef = collection(db, "users");
      return (await getDocs(userCollectionRef)).docs.map((x) => x.data());
    }
  );

  const { mutate } = useMutation(
    async (followerId) => {
      const userDoc = doc(db, "users", loggedInUser.userId);
      await updateDoc(userDoc, { following: arrayUnion(followerId) });
      const followerDocRef = doc(db, "users", followerId);
      await updateDoc(followerDocRef, {
        followers: arrayUnion(loggedInUser.userId),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const getSuggestions = (suggestions, userFollowers, userId) => {
    const filteredSuggestions = [];
    suggestions.forEach((x) => {
      if (!userFollowers.includes(x.userId) && x.userId !== userId) {
        filteredSuggestions.push(x);
      }
    });
    return filteredSuggestions;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-fit w-72 p-3">
      <h1 className="font-semibold text-gray-500">Suggestions for you</h1>
      {getSuggestions(
        suggestions,
        loggedInUser.following,
        loggedInUser.userId
      ).map((x) => (
        <div className="flex h-fit justify-between py-2">
          <div className="flex items-center gap-2 px-2 font-medium">
            <div className="h-10 w-10">
              <img
                className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
                src={x.profileImg ? x.profileImg : avatarImg}
                alt=""
              />
            </div>
            <span className="leading-4">
              <Link to={`/profile/${x.userId}`}>{x.username}</Link>
              <h2 className="text-sm">{x.fullname}</h2>
            </span>
          </div>
          {!loggedInUser.following.includes(x.userId) && (
            <button
              className="font-medium text-purple-800"
              onClick={() => mutate(x.userId)}
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
