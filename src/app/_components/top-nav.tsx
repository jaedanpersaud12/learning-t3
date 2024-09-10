function TopNav() {
  return (
    <div className="flex items-center justify-between border-b bg-gray-800 p-4">
      <div className="text-white">
        <h1 className="text-2xl font-bold">Gallery</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-md bg-gray-700 px-4 py-2 text-white">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default TopNav;
