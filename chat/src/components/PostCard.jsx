import { useContext, useState } from "react";
import { BsFillTrashFill, BsHeartFill, BsHeart } from "react-icons/bs";
import { DataContext } from "../contexts/DataProvider";
import { client } from "../Client";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

export const PostCard = ({ imageUrls, title, creatorId, createdAt, _id }) => {
  const { setPost } = useContext(DataContext);
  const { userData } = useContext(AuthContext);

  const deleted = () => {
    toast.error("Deleted, Resresh it!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 1000,
    });
  };

  const deletePost = () => {
    client
      .delete(`post/${_id}`)
      .then(() => {
        client
          .get("posts")
          .then((res) => {
            deleted();
            setPost(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-amber-50 rounded-md flex flex-col justify-center items-start">
      <div className="flex justify-between items-center w-80 h-12">
        <Link to={`/profile/${creatorId && creatorId._id}`}>
          <div className="ml-2 border rounded-md bg-slate-100 px-2 py-1 w-20 text-center">
            {creatorId && creatorId.username}
          </div>
        </Link>
        <div className="mr-2 text-xs text-gray-500">
          {createdAt && createdAt.slice(0, 10)}
        </div>
      </div>
      <img src={imageUrls && imageUrls[0]} alt="postImg" className="w-80" />
      <div className="p-2 w-80 flex justify-between items-center">
        <h1 className="text-lg">{title && title}</h1>
        {userData && userData._id === creatorId._id && (
          <div onClick={() => deletePost()} className="cursor-pointer mr-1">
            <BsFillTrashFill />
          </div>
        )}
      </div>
    </div>
  );
};
