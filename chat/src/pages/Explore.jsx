import { useEffect, useState } from "react";
import { client } from "../Client";
import { Link } from "react-router-dom";

export const Explore = () => {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(null);

  const getUsers = () => {
    client
      .get("users")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div>
        <input
          placeholder="Search ur friends and wipe them away, hehe"
          className="w-96 h-12 p-2 focus:ring outline-none rounded"
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {user ? (
          <div className="border-2 h-72 overflow-y-scroll">
            {user &&
              user.map((item, index) => {
                return (
                  item.username &&
                  item.username
                    .toLowerCase()
                    .includes(searchInput && searchInput.toLowerCase()) && (
                    <div key={index} className="p-2">
                      <Link to={`/profile/${item._id}`}>
                        <div className="border-2 p-1.5 rounded bg-slate-100">
                          {item.username}
                        </div>
                      </Link>
                    </div>
                  )
                );
              })}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-4xl text-white animate-bounce">Loading... (i know its too slow..)</h1>
          </div>
        )}
      </div>
    </div>
  );
};
