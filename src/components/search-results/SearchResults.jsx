const SearchResults = () => {
  return (
    <ul className="absolute top-12 -left-10 flex w-80 list-none flex-col gap-1 rounded-md border border-black bg-white py-1">
      <li className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100">
        <div className="h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover"
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
        </div>
        <div className="leading-4">
          <p className="font-medium">Natasha Bora</p>
          <p className="text-sm font-medium">Natasha Bora</p>
        </div>
      </li>
    </ul>
  );
};

export default SearchResults;
