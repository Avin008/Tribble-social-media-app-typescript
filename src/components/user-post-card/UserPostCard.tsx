const UserPostCard = () => {
  return (
    <div className="relative h-72 w-full cursor-pointer">
      <img
        className="h-full w-full object-cover"
        src={
          "https://images.unsplash.com/photo-1657299143363-621ba0a1e6ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
        }
        alt=""
      />
    </div>
  );
};

export default UserPostCard;
