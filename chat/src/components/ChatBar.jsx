import { useContext, useEffect, useState } from "react";
import { DataContext } from "../contexts/DataProvider";
import { client } from "../Client";
import { AuthContext } from "../contexts/AuthProvider";

export const ChatBar = () => {
  const [message, setMessage] = useState("");
  const { userData } = useContext(AuthContext);
  const { GETAllMessages, allMessageContainer, setAllMessageContainer } =
    useContext(DataContext);

  const sendMessage = () => {
    if (message)
      client
        .post("msg", {
          mainText: message,
          creator: userData._id,
        })
        .then((res) => {
          console.log(res.data);
          setMessage("");
          setAllMessageContainer([...allMessageContainer, res.data]);
          GETAllMessages();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    if (userData) {
      GETAllMessages();
    }
  }, []);

  return (
    <div className="h-32 flex justify-center pt-4 gap-3 w-full md:w-1/2">
      <input
        placeholder="Message..."
        className="border-2 w-96 h-14 p-2 rounded-md focus:border-indigo-300 outline-none font-extralight"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={sendMessage}
        className="w-24 h-14 bg-indigo-200 hover:bg-indigo-300 active:bg-indigo-400 rounded-md font-extralight"
      >
        Send
      </button>
    </div>
  );
};
