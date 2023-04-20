import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { PostCard } from "../components";
import { Link, useParams } from "react-router-dom";
import { client } from "../Client";
import { DataContext } from "../contexts/DataProvider";
import Loading from "../assets/Loading4.gif";

export const Profile = () => {
  const { userData, Logout } = useContext(AuthContext);
  const { post } = useContext(DataContext);
  const { id } = useParams();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data);
        console.log("profile: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, post]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      {profile.Posts && (
        <>
          <div className="flex flex-col text-center pt-14">
            <div className="text-2xl text-white font-extralight">
              Username: {profile && profile.username}
            </div>
            <div className="text-2xl text-white font-extralight">
              Posts: {profile.Posts && profile.Posts.length}
            </div>
            <div className="text-2xl text-white font-extralight">
              Joined: {profile.createdAt && profile.createdAt.slice(0, 10)}
            </div>
          </div>
          {userData && userData._id === id && (
            <button
              onClick={Logout}
              className="border-2 m-2 p-2 border-rose-400  text-white w-80 md:w-24 rounded-md active:bg-rose-500"
            >
              Logout
            </button>
          )}
        </>
      )}

      {profile.Posts ? (
        <div className="flex gap-6 items-center overflow-x-scroll h-2/3 w-80 md:w-4/5">
          {profile.Posts.length !== 0 ? (
            profile.Posts.map((item, index) => {
              return <PostCard {...item} index={index} key={index} />;
            })
          ) : (
            <div className="flex justify-center items-center h-96">
              <div className="text-4xl text-white">
                This guy doesn't have any posts
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-96">
          <h1 className="text-4xl text-white animate-bounce">Loading...</h1>
          <img
            src={Loading}
            alt="loadingGIF"
            className="w-80 md:w-96 rounded-md"
          />
        </div>
      )}
      <div className="hidden md:block md:absolute md:bottom-4 md:left-4">
        <Link to="/">
          <button className="border-2 border-rose-400 text-white p-3 rounded-md">
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
