import {
  LoggedInUserCard,
  Navbar,
  PostOptions,
  Suggestions,
  VerticalPostCard,
} from "../../components";

const posts = [
  {
    profileImg:
      "https://images.unsplash.com/photo-1659701706985-077fc9eb5592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8aG1lbnZRaFVteE18fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    username: "Natasha Bora",
    postImg:
      "https://images.unsplash.com/photo-1659701706985-077fc9eb5592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8aG1lbnZRaFVteE18fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    caption: "this is just a post",
    dateOfCreation: Date.now(),
    comments: [
      {
        username: "Rajesh Bora",
        comment: "this is rajesh bora nice to meet you",
      },
      {
        username: "Avinav Bora",
        comment: "this is Avinav bora nice to meet you",
      },
    ],
  },
  {
    profileImg:
      "https://images.unsplash.com/photo-1660130906493-a87e68ac3a35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyODR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    username: "Amesh Mora",
    caption: "this is just a post",
    postImg:
      "https://images.unsplash.com/photo-1660211999938-01fdce62e793?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    dateOfCreation: Date.now(),
    comments: [
      {
        username: "Rajesh Bora",
        comment: "this is rajesh bora nice to meet you",
      },
      {
        username: "Avinav Bora",
        comment: "this is Avinav bora nice to meet you",
      },
    ],
  },
];

const suggestions = [
  {
    profileImg:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    username: "mikesh775",
    fullname: "Mikesh Nirav",
    followerUserId: "1",
  },
  {
    profileImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    username: "rajsinghania",
    fullname: "Raj Singhania",
    followerUserId: "2",
  },
  {
    profileImg:
      "https://images.unsplash.com/photo-1660316582501-f2697bbf76d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    username: "riya335",
    fullname: "Riya Awashti",
    followerUserId: "3",
  },
];

const HomePage = () => {
  return (
    <div className="mx-auto mt-20 mb-5 grid h-full w-3/5 grid-cols-2 gap-12">
      <Navbar />
      <div className="space-y-4">
        {posts.map((x) => (
          <VerticalPostCard data={x} />
        ))}
      </div>
      <div className="space-y-1">
        <LoggedInUserCard />
        <Suggestions data={suggestions} />
      </div>
      {false && <PostOptions />}
    </div>
  );
};

export default HomePage;
