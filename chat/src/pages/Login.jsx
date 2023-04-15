import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import loginImg from "../assets/Login.svg";
import { client } from "../Client";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { verifyToken, Navigator } = useContext(AuthContext);

  const onSubmit = () => {
    client
      .post("/login", {
        username,
        password,
      })
      .then((response) => {
        window.localStorage.setItem("token", response.data);
        verifyToken();
        Navigator("/");
      });
  };

  return (
    <div className="flex flex-col p-28 justify-center items-center h-screen bg-gray-700">
      <div className="rounded-2xl flex p-10 justify-center items-center gap-20 shadow-2xl bg-sky-50 w-80 md:w-fit">
        <div className="hidden md:block w-96">
          <img src={loginImg} alt="loginImg" className="rounded-2xl" />
        </div>
        <div className="rounded-2xl">
          <div className="w-72 md:w-80">
            <h1 className="text-3xl md:text-5xl text-center font-serif">
              Your daily listener
            </h1>
          </div>
          <h1 className="text-center text-lg">Log In</h1>
          <div className="flex flex-col h-fit w-72 md:w-80">
            <h5 className="text-base md:text-lg">Username</h5>
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-2xl p-2.5 outline-none focus:ring"
            />
            <h5 className="text-base md:text-lg">Password</h5>
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-2xl p-2.5 outline-none focus:ring"
            />
            <button
              onClick={() => onSubmit()}
              className="rounded-2xl bg-indigo-200 hover:bg-indigo-300 active:bg-indigo-400 my-6 p-2.5"
            >
              Log In
            </button>
          </div>
          <Link to="/signup" className="no-underline">
            <div className="text-center">Dont have an account?</div>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
