import { notification } from "antd";
import { INoticeProps } from "constants/interface";

const CustomNotification = ({ type, message, description }: INoticeProps) => {
  notification.destroy();
  return notification[type]({
    message,
    description,
  });
};

export default CustomNotification;
