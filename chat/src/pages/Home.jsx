import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const Home = () => {
  const { userData, Logout } = useContext(AuthContext);

  return (
    <div>
      {userData ? `Hello ${userData && userData.username}` : ""}
      {userData && <button onClick={Logout}>Logout</button>}
    </div>
  );
};
