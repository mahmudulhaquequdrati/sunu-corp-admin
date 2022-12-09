import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { MdPendingActions } from "react-icons/md";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { io } from "socket.io-client";
import { NotificationContext } from "../context/notificationC";

// create a global variable for notification
export let allNotification = [];

const Details = () => {
  const [datas, setDatas] = React.useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const { notificationLS } = React.useContext(NotificationContext);

  // const { notification, setNotification } = useNoti();

  // use usememo for notifcation

  // const [notification, setNotification] = useState([]);
  useEffect(() => {
    const socket = io("https://sunu-corp-backend-production.up.railway.app");
    // setSocketUser(socket);
    socket.on("userInfo", (info) => {
      let userInfo = [];
      userInfo = JSON.parse(localStorage.getItem("notification")) || [];
      userInfo.push(info);
      localStorage.setItem("notification", JSON.stringify(userInfo));
      //  React.useEffect(() => {
      //    localStorage.setItem("notification", JSON.stringify(notification));
      //  }, [notification]);

      // allNotification = notification;
    });
  }, []);
  // console.log(notification);

  useEffect(() => {
    fetch(`https://sunu-corp-backend-production.up.railway.app/${category}`)
      .then((res) => res.json())
      .then((data) => setDatas(data.data));
  }, [category]);

  const handleNotification = () => {
    navigate("/notification");
  };

  const handleDetails = (id) => {
    navigate(`/all-lists/category/${id}`);
  };

  return (
    <div className="flex flex-col mt-8 mx-12">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24 mx-auto mb-4" />
          </Link>
          <div className="flex justify-between my-6">
            <h2 className="text-center font-medium text-xl mb-4">
              All lists are comming from {category} section.
            </h2>
            <p
              className="flex gap-4 items-center mb-0 relative"
              onClick={handleNotification}
            >
              <IoIosNotifications
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <span className="text-sm absolute top-0 -right-1">
                {notificationLS?.length ? notificationLS?.length : 0}
              </span>
            </p>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Picture
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Decription
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datas?.map((item) => (
                  <tr key={item?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {item?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.picture ? "Yes" : "No"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <button
                          onClick={() => {
                            handleDetails(item._id);
                          }}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item?.status === "Approved" ? (
                          <FcApproval
                            style={{
                              color: "green",
                              fontSize: "30px",
                            }}
                          />
                        ) : item?.status === "Denied" ? (
                          <RxCross2
                            style={{
                              color: "red",
                              fontSize: "30px",
                            }}
                          />
                        ) : (
                          <MdPendingActions
                            style={{
                              color: "orange",
                              fontSize: "30px",
                            }}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

/* <div className="flex flex-col mt-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item?.email}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */
