const UserNotification = () => {
  return (
    <ul className="absolute top-12 -right-0 flex h-fit w-80 flex-col gap-1 rounded-md border border-black bg-white py-1 shadow-md">
      <li className="flex cursor-pointer justify-between p-1 hover:bg-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.unsplash.com/photo-1600600423621-70c9f4416ae9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
              alt=""
            />
          </div>
          <div className="leading-5">
            <h5 className="font-medium">Natasha Bora</h5>
            <h5>Liked your Pic</h5>
          </div>
        </div>
        <div className="h-12 w-12">
          <img
            className="h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1600600423621-70c9f4416ae9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
        </div>
      </li>
    </ul>
  );
};

export default UserNotification;
