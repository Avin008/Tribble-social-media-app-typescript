import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNewUser,
  createUserData,
  userExist,
} from "../../firebase/firebaseConfig";
import { addAuth } from "../../redux-toolkit/features/authSlice";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupInfo, setSignupInfo] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: name === "username" ? value.toLowerCase() : value,
    }));
  };

  const signupUser = async (signupInfo: any) => {
    try {
      const usernameExist = await userExist(signupInfo);
      if (usernameExist) {
        const userID = await createNewUser(signupInfo);
        await createUserData(userID, signupInfo);
        navigate(`/edit-profile/${userID}`);
        dispatch(addAuth({ authStatus: true, token: userID }));
        toast.success("user successfully signedup");
      } else {
        toast.error("username already exist");
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error.code);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signupUser(signupInfo);
  };

  return (
    <div className="grid h-screen grid-cols-2 border border-black">
      <div className="flex items-center justify-center bg-[#5A21B9]">
        <h1 className="text-5xl font-semibold text-rose-100">Tribble</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-5 bg-[#FEFEFE]">
        <h1 className="text-3xl">Sign Up</h1>
        <form
          className="w-3/4 space-y-3 border border-black p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">First Name</label>
            <input
              className="border border-black p-2  px-2 outline-none ring-blue-800 focus:ring-1"
              type="text"
              name="firstname"
              placeholder="john"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Last Name</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="text"
              name="lastname"
              placeholder="doe"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="email"
              name="email"
              placeholder="john@doe"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="username">username</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="text"
              name="username"
              placeholder="username"
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="password"
              name="password"
              placeholder="**********"
              onChange={handleInput}
            />
          </div>
          <div className="">
            <input
              className="cursor-pointer bg-purple-500 px-4 py-1 text-white"
              value="Create Account"
              type="submit"
            />
          </div>
          <div>
            <Link to="/login" className="cursor-pointer font-medium">
              Already had a account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
