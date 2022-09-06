import { addAuth, removeAuth } from "../redux-toolkit/features/authSlice";
import reducer from "../redux-toolkit/features/authSlice";

describe("add auth", () => {
  test("initialize user data", () => {
    const initialState = {
      authStatus: false,
      token: null,
    };

    const expectedOutput = { authStatus: true, token: "123" };

    expect(
      reducer(initialState, addAuth({ authStatus: true, token: "123" }))
    ).toEqual(expectedOutput);
  });
});

describe("remove auth", () => {
  test("remove currenly loggedin user data", () => {
    const initialState = {
      authStatus: true,
      token: 123,
    };

    const expectedOutput = { authStatus: false, token: "" };

    expect(reducer(initialState, removeAuth())).toEqual(expectedOutput);
  });
});
