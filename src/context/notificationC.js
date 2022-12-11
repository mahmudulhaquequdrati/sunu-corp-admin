import { io } from "socket.io-client";
import React, { createContext, useEffect } from "react";

export const NotificationContext = createContext();

const NotiProvider = ({ children }) => {
  // const [notification, setNotification] = useState([]);
  // save an array of notification in local storage

  const [notificationLS, setNotificationLS] = React.useState([]);

  useEffect(() => {
    const socket = io("https://sunu-corp-backend-production.up.railway.app");
    // setSocketUser(socket);
    socket.on("userInfo", (info) => {
      let userInfo = [];
      userInfo = JSON.parse(localStorage.getItem("notification")) || [];
      userInfo.push(info);
      localStorage.setItem("notification", JSON.stringify(userInfo));
      const notificationLSB = JSON.parse(localStorage.getItem("notification"));
      setNotificationLS(notificationLSB);
    });

    // }
  }, [setNotificationLS]);

  useEffect(() => {
    const notificationLSB = JSON.parse(localStorage.getItem("notification"));
    // if (notificationLSB) {
    setNotificationLS(notificationLSB);
    // }
  }, []);

  // get an array of notification from local storage

  return (
    <NotificationContext.Provider
      value={{
        // notification,
        // setNotification,
        notificationLS,
        setNotificationLS,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotiProvider;
