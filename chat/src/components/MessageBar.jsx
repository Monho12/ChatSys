import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";

export const MessageBar = ({ creator, mainText, index }) => {
  const { userData } = useContext(AuthContext);
  const { allMessageContainer } = useContext(DataContext);
  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  }, [lastMessageRef.current]);

  const lastMessage = allMessageContainer.length - 1 === index;

  return (
    <div ref={lastMessage ? lastMessageRef : null} className="p-2">
      {userData && creator.length > 0 && (
        <div className="flex text-xs justify-end">
          <h1>{creator[0].username}</h1>
          <h2>{creator[0]._id === userData._id && "(You)"}</h2>
        </div>
      )}
      <div className="rounded flex p-4 bg-blue-600 text-white items-center justify-center font-extralight">{mainText}</div>
    </div>
  );
};
