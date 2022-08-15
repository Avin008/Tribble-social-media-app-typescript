import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="grid h-screen grid-cols-2 border border-black">
      <div className="flex items-center justify-center bg-[#5A21B9]">
        <h1 className="text-5xl font-semibold text-rose-100">Tribble</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-5 bg-[#FEFEFE]">
        <h1 className="text-3xl">Sign In</h1>
        <form className="w-3/4 space-y-3 border border-black p-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              className="ring-blue border border-black p-1 outline-none focus:ring-1"
              type="email"
              placeholder="john@doe"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Password</label>
            <input
              className="ring-blue border border-black p-1 outline-none focus:ring-1"
              type="password"
              placeholder="**********"
            />
          </div>
          <div className="space-x-3">
            <input
              className="cursor-pointer bg-purple-500 px-4 py-1 font-medium text-white"
              value="Login"
              type="submit"
            />
            <button className="cursor-pointer border border-purple-500 px-4 py-1 font-medium text-purple-500">
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
