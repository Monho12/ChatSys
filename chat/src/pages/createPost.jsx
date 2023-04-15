import { useContext, useRef, useState } from "react";
import { DataContext } from "../contexts/DataProvider";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../Client";
import { AuthContext } from "../contexts/AuthProvider";
export const CreatePost = () => {
  const { userData } = useContext(AuthContext);
  const { setPost, post } = useContext(DataContext);
  const title = useRef();
  const nav = useNavigate();

  const [uploadImgs, setUploadImgs] = useState([]);

  function convertToBase64(event) {
    if (uploadImgs) var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setUploadImgs((imgs) => [...imgs, reader.result]);
    };
    reader.onerror = (error) => {
      console.log("upload image error:", error);
    };
  }

  const create = () => {
    if (title) {
      if (uploadImgs.length > 0) {
        client
          .post("/post", {
            title: title.current.value,
            creatorId: userData._id,
            imageUrls: uploadImgs,
          })
          .then((res) => {
            nav("/posts");
            console.log(res);
            setPost([...post, res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-700">
      <div className="absolute top-1 left-4 md:hidden">
        <Link to="/">
          <button className="border border-rose-400 text-white p-3">
            Back
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-extralight pb-3 text-white pt-8">
        Share your day!
      </h1>
      <div className="flex flex-col gap-2">
        <input
          placeholder="title"
          ref={title}
          className="border-2 rounded p-2.5 outline-none focus:ring"
        />
        <input type="file" onChange={convertToBase64} />
        <div>
          {uploadImgs.map((src, i) => {
            return <img key={i} src={src} alt="postImg" className="w-80" />;
          })}
        </div>
      </div>

      <div className="py-9">
        <button
          onClick={create}
          className="border-2 m-2 p-2 border-green-400 text-white w-24"
        >
          Post
        </button>
        <Link to="/">
          <button className="border-2 m-2 p-2 border-rose-400 text-white w-24">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};
