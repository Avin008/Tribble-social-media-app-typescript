import reducer from "../redux-toolkit/features/postOptionsModalSlice";
import { openPostOptionsModal } from "../redux-toolkit/features/postOptionsModalSlice";

describe("post options modal", () => {
  const initialState = {
    isPostOptionsModalOpen: false,
    userID: "",
    postID: "",
    postData: {},
  };

  test("should open the postOptionsModal and initialize post data", () => {
    expect(
      reducer(
        initialState,
        openPostOptionsModal({
          isPostOptionsModalOpen: true,
          userID: "1234",
          postID: "456",
          postData: { userID: 1234, postID: 4567 },
        })
      )
    ).toEqual({
      isPostOptionsModalOpen: true,
      userID: "1234",
      postID: "456",
      postData: { userID: 1234, postID: 4567 },
    });
  });
});
