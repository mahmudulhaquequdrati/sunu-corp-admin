import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { NotificationContext } from "../context/notificationC";

const Notification = () => {
  const { notificationLS, setNotificationLS } =
    React.useContext(NotificationContext);

  const navigate = useNavigate();
  const handleNotification = (category, id) => {
    navigate(`/all-lists/${category}`);
    setNotificationLS((prev) => {
      // remove the notification from local storage
      localStorage.setItem(
        "notification",
        JSON.stringify(prev.filter((item) => item._id !== id))
      );
      return prev.filter((item) => item._id !== id);
    });
  };

  return (
    <div>
      <div className="my-8">
        <div className="flex justify-between my-4 mx-20">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24 " />
          </Link>
          <Link to="/">
            <button className="bg-blue-500 text-white py-2 px-8 rounded-lg">
              Home
            </button>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-center text-2xl">Notification</h1>
        {notificationLS?.length < 1 && (
          <p className="text-center text-xl">You have no notification</p>
        )}
        <div>
          {notificationLS?.map((item) => (
            <div
              className="shadow w-3/4 mx-auto px-6 py-3 rounded-lg my-2 flex "
              key={item._id}
              onClick={() => handleNotification(item.category, item._id)}
            >
              <p className="my-2">
                {item.name} sents a request for {item.description} on
                {item.category} category. please review now.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
