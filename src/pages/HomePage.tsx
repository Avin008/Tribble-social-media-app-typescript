import { Navbar, VerticalPostCard } from "../components";

const HomePage = () => {
  return (
    <div className="mx-auto mt-20 mb-5 grid h-full w-3/5 grid-cols-2">
      <Navbar />
      <div className="space-y-4">
        <VerticalPostCard />
        <VerticalPostCard />
        <VerticalPostCard />
      </div>
    </div>
  );
};

export default HomePage;
