import { useContext, useState } from "react";
import { BsFillTrashFill, BsHeartFill, BsHeart } from "react-icons/bs";
import { DataContext } from "../contexts/DataProvider";
import { client } from "../Client";

export const PostCard = ({ imageUrls, title, creatorId, createdAt, _id }) => {
  const { setPost } = useContext(DataContext);

  const deletePost = () => {
    client.delete(`/post/${_id}`).then(() => {
      client.get("posts").then((res) => {
        setPost(res.data);
      });
    });
  };

  return (
    <div className="bg-amber-50 rounded-md flex flex-col justify-center items-start">
      <div className="flex justify-between items-center w-80 h-12">
        <div className="ml-2">{creatorId && creatorId.username}</div>
        <div className="mr-2 text-xs text-gray-500">
          {createdAt && createdAt.slice(0, 10)}
        </div>
      </div>
      <img src={imageUrls && imageUrls[0]} alt="postImg" className="w-80" />
      <div className="p-2 w-80 flex justify-between items-center">
        <h1 className="text-lg">{title && title}</h1>
        <div onClick={deletePost} className="cursor-pointer mr-1">
          <BsFillTrashFill />
        </div>
      </div>
    </div>
  );
};
