import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useGetUserDataById } from "../../hooks/useGetUserDataById";
import { useGetUserData } from "../../hooks/useGetUserInfo";
import { useMutationEditProfile } from "../../hooks/useMutatationEditProfile";

const EditProfile = () => {
  const [profileImg, setProfileImg] = useState(null);
  const fileRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});

  const { token } = useSelector((store) => store.authSlice);

  const onChangeHandler = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onSuccess = (data) => {
    setUserInfo(data);
  };

  const { data, isLoading: userDataLoading } = useGetUserData(
    "users",
    onSuccess
  );

  const onSuccessMutation = () => {
    console.log("successfully updated profile");
  };

  const onError = (err) => {
    console.log(err);
  };

  const { mutate: updateProfile, isLoading } = useMutationEditProfile(
    token,
    userInfo,
    profileImg,
    onSuccessMutation,
    onError
  );

  if (userDataLoading) {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <ClipLoader color="gray" size={40} loading={userDataLoading} />
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="mx-auto flex w-[50%] flex-col gap-1 border border-black bg-white p-4">
        <div className="relative mx-auto h-20 w-20 p-1">
          <img
            className="h-full w-full rounded-full border-2 border-black object-cover"
            src={
              (profileImg && URL.createObjectURL(profileImg)) ||
              userInfo.profileImg
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
          className="border border-black p-2 font-medium"
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
          className="h-20 resize-none border border-black p-2 font-medium"
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
          className="border border-black p-2 font-medium"
          type="text"
          placeholder="portfolio Link"
          value={userInfo.portfolio}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, portfolio: e.target.value }))
          }
        />

        <button
          className="active: mt-4  bg-purple-700 p-2 font-semibold text-white shadow-sm hover:bg-purple-600"
          onClick={() => updateProfile()}
        >
          {isLoading ? "Updating Profile..." : "update Profile"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
