import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../Client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const Navigator = useNavigate();

  const verifyToken = () => {
    if (window.localStorage.token) {
      const token = window.localStorage.token;
      client
        .get("verify", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data === "Token Required")
            return console.log("Why No Token!");
          setUserData(response.data);
          console.log(response.data);
        });
    }
  };

  const Logout = () => {
    window.localStorage.removeItem("token");
    setUserData(null);
    Navigator("/login");
  };

  useEffect(() => {
    verifyToken();
    if (!window.localStorage.getItem("token")) {
      Navigator("/login");
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ userData, setUserData, verifyToken, Logout, Navigator }}
    >
      {children}
    </AuthContext.Provider>
  );
};
