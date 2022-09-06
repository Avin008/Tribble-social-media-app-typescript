// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { uuidv4 as uuid } from "@firebase/util";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { avatarImg } from "../components/vertical-post-card/VerticalPostCard";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFCGsl6CdAtSRSuj2d7RYoheaFeI9acyw",
  authDomain: "tribble-social-media.firebaseapp.com",
  projectId: "tribble-social-media",
  storageBucket: "tribble-social-media.appspot.com",
  messagingSenderId: "330045885565",
  appId: "1:330045885565:web:9387b8c04858b64d6fb514",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// create new user && initialize with data

const initializeUserData = (
  userID: string,
  {
    username,
    firstname,
    lastname,
    email,
  }: { username: string; firstname: string; lastname: string; email: string }
) => {
  return {
    userId: userID,
    username: username,
    profileImg: avatarImg,
    fullname: `${firstname} ${lastname}`,
    emailAddress: email,
    bio: null,
    portfolio: null,
    following: [],
    followers: [],
    savedPost: [],
    dateCreated: Date.now(),
  };
};

const createNewUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user.uid;
};

const userExist = async ({ username }: { username: string }) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("username", "==", username));
  const res = (await getDocs(q)).docs.map((x) => x.data()).length === 0;
  return res;
};

const createUserData = async (userID: string, userData: any) => {
  const docRef = doc(db, "users", userID);
  await setDoc(docRef, initializeUserData(userID, userData));
};

// login user
const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//

// create new post

const uploadImg = async (userID: string, file: any, postID: string) => {
  const storageRef = ref(storage, `posts/${userID}/${postID}.jpg`);
  await uploadBytes(storageRef, file);
  const imgUrl = await getDownloadURL(storageRef);
  return imgUrl;
};

const createPost = async (
  userID: string,
  username: string,
  profileImg: string,
  file: any,
  caption: string
) => {
  const postID = uuid();
  const img = await uploadImg(userID, file, postID);
  const colllectionRef = doc(db, "posts", postID);
  await setDoc(colllectionRef, {
    userID,
    username,
    profileImg,
    img,
    postID,
    caption,
    likes: [],
    comments: [],
    dateCreated: Date.now(),
  });
};

// post a comment

const postComment = async (
  username: string,
  profileImg: string,
  userId: string,
  postID: string,
  comment: string
) => {
  const docRef = doc(db, "posts", postID);
  return await updateDoc(docRef, {
    comments: arrayUnion({
      username,
      userId,
      profileImg,
      comment,
      dateCreated: Date.now(),
    }),
  });
};

// like post

const likePost = async (postID: string, userId: string) => {
  const postRef = doc(db, "posts", postID);
  return await updateDoc(postRef, { likes: arrayUnion({ userId }) });
};

// unlike post

const unlikePost = async (postID: string, userId: string) => {
  const postRef = doc(db, "posts", postID);
  return await updateDoc(postRef, { likes: arrayRemove({ userId }) });
};

// create saved post folder

const createCollection = async (userId: string, folderName: string) => {
  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, {
    savedPost: arrayUnion({
      folderName: folderName,
      posts: [],
      collectionID: uuid(),
    }),
  });
};

const saveToCollection = async (
  userId: string,
  folderName: string,
  savedPost: any,
  img: any,
  postID: string
) => {
  console.log(userId, folderName, savedPost, img, postID);
  const data = savedPost.map((x: any) => {
    if (x.folderName === folderName) {
      return {
        ...x,
        posts: [...x.posts, { img, postID }],
      };
    } else {
      return x;
    }
  });

  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, {
    savedPost: data,
  });
};

const removedFromSavedPost = async (
  userId: string,
  savedPost: any,
  postID: string
) => {
  console.log(userId, savedPost, postID);
  const result = savedPost.map((x: any) => {
    if (x.posts.length > 0) {
      return { ...x, posts: x.posts.filter((x: any) => x.postID !== postID) };
    } else {
      return x;
    }
  });

  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, {
    savedPost: result,
  });
};

const getCurrentUser = async (userID: string) => {
  const userDocRef = doc(db, "users", userID);
  // @ts-ignore
  return await getDoc(userDocRef).data();
};

// isPostSaved
const isPostSaved = (dataArr: any, postID: string) => {
  const posts = dataArr
    .filter((x: any) => x.posts.length > 0)
    .map((x: any) => x.posts);
  const postObj: any = [];
  posts.forEach((x: any) => {
    postObj.push(...x);
  });
  return postObj.map((x: any) => x.postID).includes(postID);
};

// filter followed and user posts

const getFollowedPosts = (allPosts: any, userFollowing: any, token: string) => {
  const filteredPosts: any = [];
  allPosts.forEach((x: any) => {
    if (userFollowing.includes(x.userID) || x.userID === token) {
      filteredPosts.push(x);
    }
  });
  return filteredPosts.sort((a: any, b: any) => b.dateCreated - a.dateCreated);
};

const getSuggestions = (
  suggestions: any,
  userFollowers: any,
  userId: string
) => {
  const filteredSuggestions: any = [];
  suggestions.forEach((x: any) => {
    if (!userFollowers.includes(x.userId) && x.userId !== userId) {
      filteredSuggestions.push(x);
    }
  });
  return filteredSuggestions;
};

export {
  auth,
  db,
  storage,
  createNewUser,
  userExist,
  createUserData,
  createPost,
  postComment,
  likePost,
  unlikePost,
  createCollection,
  saveToCollection,
  removedFromSavedPost,
  loginUser,
  getCurrentUser,
  isPostSaved,
  getFollowedPosts,
  getSuggestions,
};
