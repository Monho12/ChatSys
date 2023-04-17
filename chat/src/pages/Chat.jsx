import { MessageBar } from "../components/MessageBar";
import { ChatBar } from "../components/ChatBar";
import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import { Link } from "react-router-dom";

export const Chat = () => {
  const { allMessageContainer } = useContext(DataContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 p-6 md:p-0">
      <div className="pt-16 text-center">
        <h1 className="text-3xl font-extralight pb-3 text-white pt-8 hidden md:block">
          Start Chatting
        </h1>
      </div>

      <div className="flex flex-col m-2 overflow-y-scroll shadow-md rounded-lg w-full md:w-1/2 h-screen ChatBGImage">
        {allMessageContainer &&
          allMessageContainer.map((item, index) => {
            return (
              <div
                className="flex flex-col items-end justify-center"
                key={index}
              >
                <MessageBar {...item} key={index} index={index} />
              </div>
            );
          })}
      </div>
      <ChatBar />
      <div className="hidden md:block md:absolute md:bottom-4 md:left-4">
        <Link to="/">
          <button className="border-2 border-rose-400 text-white p-3 rounded-md">
            Back
          </button>
        </Link>
      </div>
      <div className="hidden sm:block p-6">
        <div className="text-xs">Developed by Someone</div>
      </div>
    </div>
  );
};
