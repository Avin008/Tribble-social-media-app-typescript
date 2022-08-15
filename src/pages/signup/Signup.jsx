import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="grid h-screen grid-cols-2 border border-black">
      <div className="flex items-center justify-center bg-[#5A21B9]">
        <h1 className="text-5xl font-semibold text-rose-100">Tribble</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-5 bg-[#FEFEFE]">
        <h1 className="text-3xl">Sign Up</h1>
        <form className="w-3/4 space-y-3 border border-black p-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">First Name</label>
            <input
              className="border border-black p-2  px-2 outline-none ring-blue-800 focus:ring-1"
              type="text"
              placeholder="john"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Last Name</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="text"
              placeholder="doe"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="email"
              placeholder="john@doe"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="username">username</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              className="border border-black p-2 px-2 outline-none ring-blue-800 focus:ring-1"
              type="password"
              placeholder="**********"
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
