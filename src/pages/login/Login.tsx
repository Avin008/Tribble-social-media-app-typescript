import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../firebase/firebaseConfig";
import { addAuth } from "../../redux-toolkit/features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const guestLogin = () => {
    setLoginInfo({ email: "ericasmoke@gmail.com", password: "123456" });
  };

  const signinUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await loginUser(email, password);
      dispatch(addAuth({ authStatus: true, token: res.user.uid }));
      navigate("/");
      toast.success("user successfully loggedin");
    } catch (error) {
      // @ts-ignore
      toast.error(error.code);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signinUser(loginInfo);
  };

  return (
    <div className="grid h-screen grid-cols-2 border border-black">
      <div className="flex items-center justify-center bg-[#5A21B9]">
        <h1 className="text-5xl font-semibold text-rose-100">Tribble</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-5 bg-[#FEFEFE]">
        <h1 className="text-3xl">Sign In</h1>
        <form
          className="w-3/4 space-y-3 border border-black p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="ring-blue border border-black p-1 outline-none focus:ring-1"
              type="email"
              name="email"
              placeholder="john@doe"
              onChange={handleInput}
              value={loginInfo.email}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Password</label>
            <input
              className="ring-blue border border-black p-1 outline-none focus:ring-1"
              type="password"
              name="password"
              placeholder="**********"
              onChange={handleInput}
              value={loginInfo.password}
              required
            />
          </div>
          <div className="space-x-3">
            <input
              className="cursor-pointer bg-purple-500 px-4 py-1 font-medium text-white"
              value="Login"
              type="submit"
            />
            <button
              className="cursor-pointer border border-purple-500 px-4 py-1 font-medium text-purple-500"
              onClick={guestLogin}
            >
              Login As Guest
            </button>
          </div>
          <div>
            <Link to="/signup" className="cursor-pointer font-medium">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
