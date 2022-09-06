import { getSuggestions } from "../firebase/firebaseConfig";

describe("get suggestions", () => {
  test("return an array suggested followers, excluding user profile", () => {
    const userID = "123";
    const userFollowers = ["345"];
    const allUsers = [{ userId: "123" }, { userId: "345" }, { userId: "564" }];

    const expectedOutput = [{ userId: "564" }];

    expect(getSuggestions(allUsers, userFollowers, userID)).toEqual(
      expectedOutput
    );
  });
});
