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
import { Posts, SavedPosts, User, UserPost } from "../types/type";

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

type InitialUserData = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
};

const initializeUserData = (
  userID: string,
  { username, firstname, lastname, email }: InitialUserData
): User => {
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

type CreateNewUser = {
  email: string;
  password: string;
};

const createNewUser = async ({
  email,
  password,
}: CreateNewUser): Promise<string> => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user.uid;
};

type UserExist = {
  username: string;
};

const userExist = async ({ username }: UserExist): Promise<boolean> => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("username", "==", username));
  const res = (await getDocs(q)).docs.map((x) => x.data()).length === 0;
  return res;
};

const createUserData = async (
  userID: string,
  userData: InitialUserData
): Promise<void> => {
  const docRef = doc(db, "users", userID);
  await setDoc(docRef, initializeUserData(userID, userData));
};

// login user
const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//

// create new post

const uploadImg = async (
  userID: string,
  file: any,
  postID: string
): Promise<string> => {
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
): Promise<void> => {
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
): Promise<void> => {
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

const likePost = async (postID: string, userId: string): Promise<void> => {
  const postRef = doc(db, "posts", postID);
  return await updateDoc(postRef, { likes: arrayUnion({ userId }) });
};

// unlike post

const unlikePost = async (postID: string, userId: string): Promise<void> => {
  const postRef = doc(db, "posts", postID);
  return await updateDoc(postRef, { likes: arrayRemove({ userId }) });
};

// create saved post folder

const createCollection = async (
  userId: string,
  folderName: string
): Promise<void> => {
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
  savedPost: SavedPosts[],
  img: string,
  postID: string
): Promise<void> => {
  const data = savedPost.map((x): SavedPosts => {
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
  savedPost: SavedPosts[],
  postID: string
): Promise<void> => {
  const result = savedPost.map((x): SavedPosts => {
    if (x.posts.length > 0) {
      return { ...x, posts: x.posts.filter((x) => x.postID !== postID) };
    } else {
      return x;
    }
  });

  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, {
    savedPost: result,
  });
};

const getCurrentUser = async (userID: string): Promise<User> => {
  const userDocRef = doc(db, "users", userID);
  const res: any = await getDoc(userDocRef);
  return res.data();
};

// isPostSaved
const isPostSaved = (dataArr: SavedPosts[], postID: string): boolean => {
  const posts = dataArr.filter((x) => x.posts.length > 0).map((x) => x.posts);
  const postObj: Posts[] = [];
  posts.forEach((x) => {
    postObj.push(...x);
  });
  return postObj.map((x) => x.postID).includes(postID);
};

// filter followed and user posts

const getFollowedPosts = (
  allPosts: UserPost[],
  userFollowing: string[],
  token: string
): UserPost[] => {
  const filteredPosts: UserPost[] = [];
  allPosts.forEach((x) => {
    if (userFollowing.includes(x.userID) || x.userID === token) {
      filteredPosts.push(x);
    }
  });
  return filteredPosts.sort((a, b) => b.dateCreated - a.dateCreated);
};

const getSuggestions = (
  suggestions: User[],
  userFollowers: string[],
  userId: string
): User[] => {
  const filteredSuggestions: User[] = [];
  suggestions.forEach((x) => {
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
