import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/Signup.svg";
import { AuthContext } from "../contexts/AuthProvider";
import { client } from "../Client";

export const Signup = () => {
  const username = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const { Navigator, verifyToken } = useContext(AuthContext);

  const onSubmit = () => {
    client
      .post("/signup", {
        username: username.current.value,
        password: password.current.value,
        passwordConfirm: passwordConfirm.current.value,
      })
      .then((response) => {
        window.localStorage.setItem("token", response.data);
        verifyToken();
        Navigator("/");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="rounded-2xl flex p-10 justify-center items-center gap-20 shadow-2xl bg-sky-50 w-80 md:w-fit font-light">
        <div className="hidden md:block w-96">
          <img src={loginImg} alt="signupImg" className="rounded-2xl" />
        </div>
        <div className="rounded-2xl">
          <div className="w-72 md:w-80">
            <h1 className="text-3xl md:text-5xl text-center font-serif">
              Your daily listener
            </h1>
          </div>
          <h1 className="text-center text-lg">Sign Up</h1>
          <div className="flex flex-col h-fit w-72 md:w-80">
            <h5 className="text-base md:text-lg">Username</h5>
            <input
              placeholder="Username"
              ref={username}
              className="border-2 rounded-2xl p-2.5 outline-none focus:ring"
            />
            <h5 className="text-base md:text-lg">Password</h5>
            <input
              ref={password}
              placeholder="Password"
              className="border-2 rounded-2xl p-2.5 outline-none focus:ring"
            />
            <h5 className="text-base md:text-lg">Confirm Password</h5>
            <input
              ref={passwordConfirm}
              placeholder="Confirm Password"
              className="border-2 rounded-2xl p-2.5 outline-none focus:ring"
            />

            <button
              onClick={() => onSubmit()}
              className="rounded-2xl bg-indigo-200 hover:bg-indigo-300 active:bg-indigo-400 my-6 p-2.5"
            >
              Sign Up
            </button>
          </div>
          <Link to="/login" className="no-underline">
            <div className="text-center">Have an account?</div>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
