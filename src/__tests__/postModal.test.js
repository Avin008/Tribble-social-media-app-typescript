import {
  closePostModal,
  openPostModal,
} from "../redux-toolkit/features/postModalSlice";
import reducer from "../redux-toolkit/features/postModalSlice";

describe("add auth", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      isModalOpen: false,
      postID: "",
    });
  });
});

describe("open post modal", () => {
  const previousState = { isModalOpen: false, postID: "" };

  test("should handle post modal open, and add post Id to the initial state", () => {
    expect(
      reducer(
        previousState,
        openPostModal({ isModalOpen: true, postID: "12345" })
      )
    ).toEqual({ isModalOpen: true, postID: "12345" });
  });
});

describe("close post modal", () => {
  const previousState = { isModalOpen: true, postID: "12345" };

  test("should close and post the post modal and reset the post id", () => {
    expect(
      reducer(previousState, closePostModal({ isModalOpen: false, postID: "" }))
    ).toEqual({ isModalOpen: false, postID: "" });
  });
});
