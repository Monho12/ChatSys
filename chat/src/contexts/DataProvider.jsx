import { createContext, useState } from "react";
import { client } from "../Client";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allMessageContainer, setAllMessageContainer] = useState([]);
  const [post, setPost] = useState(null);

  const GETAllMessages = () => {
    client
      .get("/msgs")
      .then((res) => {
        console.log(res.data);
        setAllMessageContainer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DataContext.Provider
      value={{
        post,
        setPost,
        GETAllMessages,
        allMessageContainer,
        setAllMessageContainer,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
