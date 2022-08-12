const LoggedInUserCard = () => {
  return (
    <div className="flex h-fit justify-between rounded-md p-2">
      <div className="flex items-center gap-2 font-medium">
        <div className="h-12 w-12">
          <img
            className="aspect-square h-full w-full rounded-full border-2 border-black object-cover"
            src="https://images.unsplash.com/photo-1660110583004-b9c1a8692076?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
        </div>
        <span className="leading-4">
          <h1>Natasha_Bora</h1>
          <h2 className="text-sm">Natasha Bora</h2>
        </span>
      </div>
      <button className="font-medium text-purple-800">Profile</button>
    </div>
  );
};

export default LoggedInUserCard;
