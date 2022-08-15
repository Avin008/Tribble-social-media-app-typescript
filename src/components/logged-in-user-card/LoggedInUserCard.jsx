import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

const LoggedInUserCard = () => {
  const { token } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(["users"], async () => {
    const docRef = doc(db, "users", token);
    return (await getDoc(docRef)).data();
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex h-fit w-72 justify-between rounded-md p-2">
      <div className="flex items-center gap-2 font-medium">
        <div className="h-12 w-12">
          <img
            className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
            src={data.profileImg}
            alt=""
          />
        </div>
        <span className="leading-4">
          <h1>{data.username}</h1>
          <h2 className="text-sm">{data.fullName}</h2>
        </span>
      </div>
      <button
        className="font-medium text-purple-800"
        onClick={() => navigate(`/profile/${data.userId}`)}
      >
        Profile
      </button>
    </div>
  );
};

export default LoggedInUserCard;
