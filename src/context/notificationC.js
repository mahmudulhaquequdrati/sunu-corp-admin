import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotiProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  // save an array of notification in local storage

  const [notificationLS, setNotificationLS] = React.useState([]);
  // get an array of notification from local storage
  React.useEffect(() => {
    const notificationLS = JSON.parse(localStorage.getItem("notification"));
    setNotificationLS(notificationLS);
  }, [notification, notificationLS]);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
        notificationLS,
        setNotificationLS,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotiProvider;
