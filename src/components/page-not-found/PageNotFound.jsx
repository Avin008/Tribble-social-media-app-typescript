import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2">
      <span className="text-6xl">✋</span>
      <h1 className="text-2xl font-semibold">Oops! page not found</h1>
      <span className="mt-3">
        <Link
          className="rounded-md bg-purple-500 p-2 px-4 text-sm font-semibold text-white shadow-md"
          to={"/"}
        >
          GO TO HOMEPAGE
        </Link>
      </span>
    </div>
  );
};

export default PageNotFound;
