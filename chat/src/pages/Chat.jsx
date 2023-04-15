import { useContext, useEffect, useState } from "react";
import { client } from "../Client";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { userData } = useContext(AuthContext);
  const { GETAllMessages, allMessageContainer, setAllMessageContainer } =
    useContext(DataContext);

  const sendMessage = () => {
    client
      .post("msg", {
        mainText: message,
        creator: userData._id,
      })
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
        setAllMessageContainer([...allMessageContainer, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GETAllMessages();
  }, [message]);

  return (
    <div>
      <input
        placeholder="Message..."
        className="border-2 border-rose-400"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage} className="border-2">
        Send Message
      </button>
      <h1>
        Messages:
        {allMessageContainer &&
          allMessageContainer.map((item, index) => {
            console.log();
            return (
              <div className="border-2 border-rose-600" key={index}>
                <div>{item.creator.length > 0 && item.creator[0].username}</div>
                <div key={index}>{item.mainText}</div>
              </div>
            );
          })}
      </h1>
    </div>
  );
};
