import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { userData } = useContext(AuthContext);
  const param = useLocation();

  return (
    <div
      className={`w-screen h-14 md:h-20 flex items-center text-white ${
        param.pathname === "/" ? "bg-transparent" : "bg-gray-600"
      }  absolute top-0 justify-between p-2`}
    >
      <Link to="/">
        <div
          className={`ml-3 border-2 border-black  ${
            param.pathname === "/" ? "border-white" : "border-black"
          }  rounded-md`}
        >
          <h1 className="text-lg font-light p-1.5  md:text-2xl">
            Your Daily Listener
          </h1>
        </div>
      </Link>

      <div
        className={`flex items-center justify-center  ${
          param.pathname === "/" ? "border-white" : "border-black"
        } border-2 border-black rounded-2xl h-8 px-3 py-4 mr-3`}
      >
        {userData ? (
          <Link to={`/profile/${userData && userData._id}`}>
            <div className="text-xl font-light text-white">
              {userData && userData.username}
            </div>
          </Link>
        ) : (
          <div className="text-white text-xs md:text-lg">
            I hope u doing well buddy :)
          </div>
        )}
      </div>
    </div>
  );
};
