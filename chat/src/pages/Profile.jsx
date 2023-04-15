import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useEffect } from "react";
import { PostCard } from "../components";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataProvider";

export const Profile = () => {
  const { userData, verifyToken, Logout } = useContext(AuthContext);
  const { post } = useContext(DataContext);

  useEffect(() => {
    verifyToken();
  }, [post]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <div className="absolute left-4 top-1 md:hidden">
        <Link to="/">
          <button className="border border-rose-400 text-white p-3">
            Back
          </button>
        </Link>
      </div>
      <div className="flex flex-col text-center">
        <div className="text-2xl text-white font-extralight">
          Username: {userData && userData.username}
        </div>
        <div className="text-2xl text-white font-extralight">
          Posts: {userData && userData.Posts.length}
        </div>
        <div className="text-2xl text-white font-extralight">
          Joined: {userData && userData.createdAt.slice(0, 10)}
        </div>
      </div>
      {userData && (
        <button
          onClick={Logout}
          className="border-2 m-2 p-2 border-rose-400  text-white w-80 md:w-24"
        >
          Logout
        </button>
      )}
      <div className="flex gap-6 items-center overflow-x-scroll h-2/3 w-96 md:w-4/5">
        {userData &&
          userData.Posts.map((item, index) => {
            return <PostCard {...item} index={index} key={index} />;
          })}
      </div>
      <div className="hidden md:block md:absolute md:bottom-4 md:left-4">
        <Link to="/">
          <button className="border border-rose-400 text-white p-3">
            Back
          </button>
        </Link>
      </div>
      <div className="absolute bottom-5">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
