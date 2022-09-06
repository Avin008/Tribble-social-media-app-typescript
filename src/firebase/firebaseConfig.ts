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
<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
  userID,
  { username, firstname, lastname, email }
) => {
=======
  userID: string,
  { username, firstname, lastname, email }: InitialUserData
): User => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
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

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const createNewUser = async ({ email, password }) => {
=======
type CreateNewUser = {
  email: string;
  password: string;
};

const createNewUser = async ({
  email,
  password,
}: CreateNewUser): Promise<string> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user.uid;
};

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const userExist = async ({ username }) => {
=======
type UserExist = {
  username: string;
};

const userExist = async ({ username }: UserExist): Promise<boolean> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("username", "==", username));
  const res = (await getDocs(q)).docs.map((x) => x.data()).length === 0;
  return res;
};

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const createUserData = async (userID, userData) => {
=======
const createUserData = async (userID: string, userData: InitialUserData) => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const docRef = doc(db, "users", userID);
  await setDoc(docRef, initializeUserData(userID, userData));
};

// login user
const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//

// create new post

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const uploadImg = async (userID, file, postID) => {
=======
const uploadImg = async (
  userID: string,
  file: any,
  postID: string
): Promise<string> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const storageRef = ref(storage, `posts/${userID}/${postID}.jpg`);
  await uploadBytes(storageRef, file);
  const imgUrl = await getDownloadURL(storageRef);
  return imgUrl;
};

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const createPost = async (userID, username, profileImg, file, caption) => {
=======
const createPost = async (
  userID: string,
  username: string,
  profileImg: string,
  file: any,
  caption: string
): Promise<void> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
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

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const postComment = async (username, profileImg, userId, postID, comment) => {
=======
const postComment = async (
  username: string,
  profileImg: string,
  userId: string,
  postID: string,
  comment: string
): Promise<void> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
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

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const likePost = async (postID, userId) => {
=======
const likePost = async (postID: string, userId: string): Promise<void> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const postRef = doc(db, "posts", postID);
  return await updateDoc(postRef, { likes: arrayUnion({ userId }) });
};

// unlike post

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const unlikePost = async (postID, userId) => {
=======
const unlikePost = async (postID: string, userId: string): Promise<void> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const postRef = doc(db, "posts", postID);
  return await updateDoc(postRef, { likes: arrayRemove({ userId }) });
};

// create saved post folder

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const createCollection = async (userId, folderName) => {
=======
const createCollection = async (
  userId: string,
  folderName: string
): Promise<void> => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  const userRef = doc(db, "users", userId);
  return await updateDoc(userRef, {
    savedPost: arrayUnion({
      folderName: folderName,
      posts: [],
      collectionID: uuid(),
    }),
  });
};

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const saveToCollection = async (userId, folderName, savedPost, img, postID) => {
  console.log(userId, folderName, savedPost, img, postID);
  const data = savedPost.map((x) => {
=======
const saveToCollection = async (
  userId: string,
  folderName: string,
  savedPost: SavedPosts[],
  img: string,
  postID: string
): Promise<void> => {
  const data = savedPost.map((x): SavedPosts => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
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

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const removedFromSavedPost = async (userId, savedPost, postID) => {
  console.log(userId, savedPost, postID);
  const result = savedPost.map((x) => {
=======
const removedFromSavedPost = async (
  userId: string,
  savedPost: SavedPosts[],
  postID: string
): Promise<void> => {
  const result = savedPost.map((x): SavedPosts => {
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
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

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const getCurrentUser = async (userID) => {
  const userDocRef = doc(db, "users", userID);
  return await getDoc(userDocRef).data();
};

// isPostSaved
const isPostSaved = (dataArr, postID) => {
  const posts = dataArr.filter((x) => x.posts.length > 0).map((x) => x.posts);
  const postObj = [];
=======
const getCurrentUser = async (userID: string): Promise<User> => {
  const userDocRef = doc(db, "users", userID);
  const res: any = await getDoc(userDocRef);
  return res.data();
};

// isPostSaved
const isPostSaved = (dataArr: SavedPosts[], postID: string): boolean => {
  const posts = dataArr.filter((x) => x.posts.length > 0).map((x) => x.posts);
  const postObj: Posts[] = [];
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  posts.forEach((x) => {
    postObj.push(...x);
  });
  return postObj.map((x) => x.postID).includes(postID);
};

// filter followed and user posts

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const getFollowedPosts = (allPosts, userFollowing, token) => {
  const filteredPosts = [];
=======
const getFollowedPosts = (
  allPosts: UserPost[],
  userFollowing: string[],
  token: string
): UserPost[] => {
  const filteredPosts: UserPost[] = [];
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
  allPosts.forEach((x) => {
    if (userFollowing.includes(x.userID) || x.userID === token) {
      filteredPosts.push(x);
    }
  });
  return filteredPosts.sort((a, b) => b.dateCreated - a.dateCreated);
};

<<<<<<< Updated upstream:src/firebase/firebaseConfig.js
const getSuggestions = (suggestions, userFollowers, userId) => {
  const filteredSuggestions = [];
=======
const getSuggestions = (
  suggestions: User[],
  userFollowers: string[],
  userId: string
): User[] => {
  const filteredSuggestions: User[] = [];
>>>>>>> Stashed changes:src/firebase/firebaseConfig.ts
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
