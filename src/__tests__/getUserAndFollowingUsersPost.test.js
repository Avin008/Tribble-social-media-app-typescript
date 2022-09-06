import { getFollowedPosts } from "../firebase/firebaseConfig";

describe("get followed posts", () => {
  const userID = "123";
  const allPosts = [
    {
      userID: "123",
      username: "ericwang334",
      img: "https://www.unsplash.com/334rw-fwr45-rer53.jpg",
      caption: "test caption one",
      dateCreated: "776",
    },
    {
      userID: "456",
      username: "peterparker001",
      img: "https://www.unsplash.com/232rw4-tet35.jpg",
      caption: "test caption two",
      dateCreated: "667",
    },
    {
      userID: "457",
      username: "maryeika454",
      img: "https://www.unsplash.com/232rw4-tet35.jpg",
      caption: "test caption three",
      dateCreated: "243",
    },
  ];

  const expectedOutput = [
    {
      userID: "123",
      username: "ericwang334",
      img: "https://www.unsplash.com/334rw-fwr45-rer53.jpg",
      caption: "test caption one",
      dateCreated: "776",
    },
    {
      userID: "456",
      username: "peterparker001",
      img: "https://www.unsplash.com/232rw4-tet35.jpg",
      caption: "test caption two",
      dateCreated: "667",
    },
  ];
  const userFollowing = ["123", "456"];

  test("return an sorted by time array of user followers posts includes user posts", () => {
    expect(getFollowedPosts(allPosts, userFollowing, userID)).toEqual(
      expectedOutput
    );
  });
});
