export type Posts = { img: string; postID: string };

export type SavedPosts = {
  collectionID: string;
  folderName: string;
  posts: Posts[];
};

export type User = {
  userId: string;
  username: string;
  profileImg: string;
  fullname: string;
  emailAddress: string;
  bio: null | string;
  portfolio: null | string;
  following: string[];
  followers: string[];
  savedPost: SavedPosts[];
  dateCreated: number | null;
};

export type LikePost = {
  userId: string;
};

export type Comments = {
  comment: string;
  dateCreated: number;
  profileImg: string;
  userId: string;
  username: string;
};

export type UserPost = {
  userID: string;
  profileImg: string;
  postID: string;
  likes: LikePost[];
  img: string;
  dateCreated: number;
  comments: Comments[];
  caption: string;
  username?: string;
  dateOfCreation?: string;
};

export type functionVoid = () => void;
