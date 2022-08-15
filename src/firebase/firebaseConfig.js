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
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBStHd4ile-mrI3ZaFoK2Ab-CIs-qkJA0",
  authDomain: "social-media-19487.firebaseapp.com",
  projectId: "social-media-19487",
  storageBucket: "social-media-19487.appspot.com",
  messagingSenderId: "921388339387",
  appId: "1:921388339387:web:233c9dd1b7dad56b2bd99e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// create new user && initialize with data

const initializeUserData = (
  userID,
  { username, firstName, lastName, email }
) => {
  return {
    userId: userID,
    username: username,
    profileImg: "",
    fullName: `${firstName} ${lastName}`,
    emailAddress: email,
    following: [],
    followers: [],
    savedPost: [],
    dateCreated: Date.now(),
  };
};

const createNewUser = async ({ email, password }) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res.user.uid;
};

const userExist = async ({ username }) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("username", "==", username));
  const res = (await getDocs(q)).docs.map((x) => x.data()).length === 0;
  return res;
};

const createUserData = async (userID, userData) => {
  const docRef = doc(db, "users", userID);
  await setDoc(docRef, initializeUserData(userID, userData));
};

// login user
const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//

// create new post

const uploadImg = async (userID, file, postID) => {
  const storageRef = ref(storage, `posts/${userID}/${postID}.jpg`);
  await uploadBytes(storageRef, file);
  alert("img uploaded");
  const imgUrl = await getDownloadURL(storageRef);
  return imgUrl;
};

const createPost = async (userID, file, caption) => {
  const postID = uuid();
  const img = await uploadImg(userID, file, postID);
  const colllectionRef = doc(db, "posts", postID);
  await setDoc(colllectionRef, {
    userID,
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
  { username, profileImg, userId },
  postID,
  comment
) => {
  try {
    const docRef = doc(db, "posts", postID);
    await updateDoc(docRef, {
      comments: arrayUnion({
        username,
        userId,
        profileImg,
        comment,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

// like post

const likePost = async (postID, userId) => {
  try {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, { likes: arrayUnion({ userId }) });
  } catch (error) {
    console.log(error);
  }
};

// unlike post

const unlikePost = async (postID, userId) => {
  try {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, { likes: arrayRemove({ userId: userId }) });
  } catch (error) {
    console.log(error);
  }
};

// create saved post folder

const createSavedPostFolder = async (userId, folderName) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      savedPost: arrayUnion({ folderName: folderName, posts: [] }),
    });
    alert("created folder successfully");
  } catch (error) {
    console.log(error);
  }
};

const saveToCollection = async (
  userId,
  folderName,
  savedPost,
  { img, postID }
) => {
  const data = savedPost.map((x) => {
    if (x.folderName === folderName) {
      return {
        ...x,
        posts: [...x.posts, { img, postID }],
      };
    } else {
      return x;
    }
  });

  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      savedPost: data,
    });
    alert("post added to saved");
  } catch (error) {
    console.log(error);
  }
};

const removedFromSavedPost = async (userId, savedPost, postID) => {
  const result = savedPost.map((x) => {
    if (x.posts.length > 0) {
      return { ...x, posts: x.posts.filter((x) => x.postID !== postID) };
    } else {
      return x;
    }
  });

  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      savedPost: result,
    });
    alert("post removed from savedPost");
  } catch (error) {
    console.log(error);
  }
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
  createSavedPostFolder,
  saveToCollection,
  removedFromSavedPost,
  loginUser,
};
