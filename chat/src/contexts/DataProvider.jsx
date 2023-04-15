import { createContext, useState } from "react";
import { client } from "../Client";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allMessageContainer, setAllMessageContainer] = useState([]);

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
      value={{ GETAllMessages, setAllMessageContainer, allMessageContainer }}
    >
      {children}
    </DataContext.Provider>
  );
};
