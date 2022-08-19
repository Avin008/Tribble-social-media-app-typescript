import { ExploreCard } from "../../components";
export const posts = [
  {
    img: "https://images.unsplash.com/photo-1659282676834-5a712eb7c7f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659259540123-72eb0eb77357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659205619507-e3892b32947a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659226678225-c300bec345ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=754&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659273145173-4f96f722b317?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659263524000-fddc6627d029?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659259906927-eb207ff241c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659258826784-5651053ce0fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659205544013-440f4cae4798?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659217781456-da22969db783?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659200936483-65f3fd694065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659251249412-57796de37ad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=343&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1659204958264-7983132db085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1588431153380-dd3a8197b876?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];

const ExplorePage = () => {
  return (
    <div className="mx-auto mt-20 mb-4 grid w-3/5 grid-flow-row auto-rows-[300px] grid-cols-3 gap-4">
      {posts.map((x) => (
        <ExploreCard data={x} />
      ))}
    </div>
  );
};

export default ExplorePage;
