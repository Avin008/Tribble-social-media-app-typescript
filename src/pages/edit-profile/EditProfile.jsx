import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { avatarImg } from "../../components/vertical-post-card/VerticalPostCard";
import { db, storage } from "../../firebase/firebaseConfig";

const EditProfile = () => {
  const [profileImg, setProfileImg] = useState(null);
  const fileRef = useRef(null);
  const { loggedInUser } = useSelector((store) => store.userSlice);
  const [userInfo, setUserInfo] = useState(loggedInUser);

  const onChangeHandler = (e) => {
    setProfileImg(e.target.files[0]);
  };

  console.log(userInfo);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async () => {
      const userDocRef = doc(db, "users", userInfo.userId);
      const profileImgRef = ref(storage, `/profileImg/${userInfo.userId}.jpg`);
      const res = profileImg && (await uploadBytes(profileImgRef, profileImg));
      const imgUrl = profileImg && (await getDownloadURL(profileImgRef, res));

      const updatedUserobj = {
        fullname: userInfo.fullname,
        bio: userInfo.bio,
        portfolio: userInfo.portfolio,
        profileImg: (profileImg && imgUrl) || userInfo.profileImg,
      };
      return await updateDoc(userDocRef, updatedUserobj);
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <div className="m-20">
      <div className="mx-auto flex w-[50%] flex-col gap-1 border border-black bg-white p-4">
        <div className="relative mx-auto h-20 w-20 p-1">
          <img
            className="h-full w-full rounded-full border-2 border-black object-cover"
            src={
              (profileImg && URL.createObjectURL(profileImg)) ||
              userInfo.profileImg ||
              avatarImg
            }
            alt=""
          />
          <input onChange={onChangeHandler} ref={fileRef} type="file" hidden />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="active: w-25 p-2 text-base font-semibold text-purple-500"
            onClick={() => fileRef.current.click()}
          >
            Upload Image
          </button>
        </div>

        <label className="font-medium" htmlFor="">
          Full Name
        </label>
        <input
          className="border border-black p-2"
          placeholder="First Name"
          type="text"
          value={userInfo.fullname}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, fullname: e.target.value }))
          }
        />
        <label className="font-medium" htmlFor="">
          Bio
        </label>
        <textarea
          className="h-20 resize-none border border-black p-2"
          placeholder="Bio"
          value={userInfo.bio}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, bio: e.target.value }))
          }
        />
        <label className="font-medium" htmlFor="">
          PortFolio Link
        </label>
        <input
          className="border border-black p-2"
          type="text"
          placeholder="portfolio Link"
          value={userInfo.portfolio}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, portfolio: e.target.value }))
          }
        />

        <button
          className="active: mt-4  bg-purple-700 p-2 font-semibold text-white shadow-sm hover:bg-purple-600"
          onClick={() => mutate()}
        >
          {isLoading ? "Updating Profile" : "update Profle"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
