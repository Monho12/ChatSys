import { useContext, useEffect } from "react";
import { client } from "../Client";
import { DataContext } from "../contexts/DataProvider";
import { PostCard } from "../components";
import { Link } from "react-router-dom";

export const Posts = () => {
  const { setPost, post } = useContext(DataContext);

  const getPosts = () => {
    client
      .get("posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts();
  }, [post]);

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gray-700 py-24">
      {post ? (
        <div className="flex flex-col gap-6 items-center h-screen overflow-y-scroll">
          {post &&
            post.map((item, index) => {
              return <PostCard {...item} index={index} key={index} />;
            })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl text-white animate-bounce">
            Loading...( SLOW AF! )
          </h1>
        </div>
      )}
      <div className="absolute bottom-4 md:absolute md:left-4 flex gap-2">
        <Link to="/createPost">
          <button className="border border-teal-400 text-white p-4">
            Publish Post
          </button>
        </Link>
        <Link to="/">
          <button className="border border-rose-400 text-white p-4">
            Back
          </button>
        </Link>
      </div>
      <div className="absolute bottom-0 hidden sm:block p-6">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
