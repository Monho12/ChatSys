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
    <div ref={lastMessage ? lastMessageRef : null} className="p-2 text-white">
      <div className="p-1 m-1 flex flex-col gap-1">
        {userData && creator.length > 0 && (
          <div className="flex text-xs justify-end">
            <h1>{creator[0].username}</h1>
            <h2>{creator[0]._id === userData._id && "(You)"}</h2>
          </div>
        )}
        <div className="rounded-md flex p-3 bg-blue-600 items-center justify-center">
          {mainText}
        </div>
      </div>
    </div>
  );
};
