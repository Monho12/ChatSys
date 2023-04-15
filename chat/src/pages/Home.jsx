import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

export const Home = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700 flex-col">
      <h1 className="text-white text-3xl">
        {userData ? `Hello ${userData && userData.username}!` : ""}
      </h1>
      <div className="flex flex-col md:flex md:flex-row">
        <Link to="/chat">
          <button className="border-2 m-2 p-2 border-blue-400  text-white w-80 md:w-24">
            Public Chat
          </button>
        </Link>
        <Link to="/posts">
          <button className="border-2 m-2 p-2  border-teal-400 text-white w-80 md:w-24">
            Public Posts
          </button>
        </Link>
      </div>

      <div className="absolute bottom-0 hidden sm:block p-6">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
