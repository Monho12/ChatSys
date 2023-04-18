import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import Loading from "../assets/Loading3.gif";

export const Home = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-screen flex-col HomeBGImage">
      <div className="flex flex-col text-center h-96 w-96 items-center justify-evenly">
        <h1 className="text-white text-3xl font-extralight">
          {userData ? `Hello ${userData && userData.username}!` : ""}
        </h1>
        {userData ? (
          <div className="flex flex-col md:flex md:flex-row z-10">
            <Link to="/chat">
              <button className="border-2 m-2 p-2 border-blue-400  text-white w-80 md:w-24 rounded-md">
                Public Chat
              </button>
            </Link>
            <Link to="/posts">
              <button className="border-2 m-2 p-2  border-teal-400 text-white w-80 md:w-24 rounded-md">
                Public Posts
              </button>
            </Link>
            <Link to="/explore">
              <button className="border-2 m-2 p-2  border-teal-400 text-white w-80 md:w-24 rounded-md">
                Search ur mortal
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen ">
            <img
              src={Loading}
              alt="LoadingGIF"
              className="w-80 md:w-96 rounded-md"
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 hidden sm:block p-6">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
