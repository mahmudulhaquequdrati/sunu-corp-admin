import { useContext } from "react";
import { NotificationContext } from "../context/notificationC";

const useNoti = () => {
  const noti = useContext(NotificationContext);
  return noti;
};
export default useNoti;
