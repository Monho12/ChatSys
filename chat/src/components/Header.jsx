import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

export const Header = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="w-screen h-14 md:h-18 flex items-center text-white bg-gray-600 absolute top-0 justify-between">
      <Link to="/">
        <div className="ml-3 border border-black p-1 hidden md:block">
          <h1 className="text-2xl font-extralight">Your Daily Listener</h1>
        </div>
      </Link>
      <div className="flex items-center justify-center border border-black rounded-2xl h-8 px-3 py-4 mr-3">
        {userData ? (
          <Link to={`/profile/${userData && userData._id}`}>
            <div className="text-xl font-extralight text-white">
              {userData && userData.username}
            </div>
          </Link>
        ) : (
          <div className="text-white font-extralight">
            I hope u doing well buddy :)
          </div>
        )}
      </div>
    </div>
  );
};
