import { useContext, useRef, useState } from "react";
import { DataContext } from "../contexts/DataProvider";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../Client";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
export const CreatePost = () => {
  const { userData } = useContext(AuthContext);
  const { setPost, post } = useContext(DataContext);
  const [warn, setWarn] = useState("");
  const title = useRef();
  const nav = useNavigate();

  const [uploadImgs, setUploadImgs] = useState([]);

  const notify = () => {
    toast.success("Posted!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 3000,
    });
  };

  function convertToBase64(event) {
    setWarn("");
    if (uploadImgs) var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setUploadImgs([reader.result]);
    };
    reader.onerror = (error) => {
      console.log("upload image error:", error);
    };
  }

  const create = () => {
    notify();
    if (title) {
      client
        .post("/post", {
          title: title.current.value,
          creatorId: userData._id,
          imageUrls: uploadImgs,
        })
        .then((res) => {
          console.log(res);
          setWarn("");
          setPost([...post, res.data]);
          nav("/posts");
        })
        .catch((err) => {
          console.log(err);
          setWarn("We cant mate, Your image is too large!");
        });
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
      {warn && <h1 className="text-rose-500">{warn && warn}!</h1>}
      <h1 className="text-blue-500 text-xl">Your image must be under 1mb</h1>
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
        <Link to="/posts">
          <button className="border-2 m-2 p-2 border-rose-400 text-white w-24">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};
