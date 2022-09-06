import { isPostSaved } from "../firebase/firebaseConfig";

describe("is post saved", () => {
  const savedPosts = [
    {
      collectionID: "12345",
      folderName: "memes",
      posts: [{ img: "https://images.unsplash/123.jpg", postID: "6789" }],
    },
  ];

  const postID = "6789";

  test("check if post saved in any of user collections and return a boolean", () => {
    expect(isPostSaved(savedPosts, postID)).toBe(true);
  });
});
