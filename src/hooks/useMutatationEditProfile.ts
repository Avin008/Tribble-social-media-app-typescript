import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig";
import { functionVoid, User } from "../types/type";

const useMutationEditProfile = (
  loggedInUserID: string,
  userInfo: User,
  profileImg: Blob,
  onSuccess?: functionVoid,
  onError?: functionVoid
) => {
  const mutateEditProfileApiCall = async () => {
    const userDocRef = doc(db, "users", loggedInUserID);
    const profileImgRef = ref(storage, `/profileImg/${loggedInUserID}.jpg`);
    profileImg && (await uploadBytes(profileImgRef, profileImg));
    const imgUrl = profileImg && (await getDownloadURL(profileImgRef));

    const updatedUserobj = {
      fullname: userInfo.fullname,
      bio: userInfo.bio,
      portfolio: userInfo.portfolio,
      profileImg: (profileImg && imgUrl) || userInfo.profileImg,
    };

    return await updateDoc(userDocRef, updatedUserobj);
  };

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      return await mutateEditProfileApiCall();
    },
    {
      onSuccess,
      onError,
    }
  );

  return { mutate, isLoading, isError };
};

export { useMutationEditProfile };
