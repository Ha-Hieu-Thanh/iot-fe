import { message } from "antd";
import CustomNotification from "components/CustomNotification";
import configs from "constants/config";
import { isString } from "lodash";

export const handleSuccessMessage = (mes: string) => {
  CustomNotification({
    type: "success",
    message: mes,
    description: "",
  });
};

export const handleErrorMessage = (errorMessage: any) => {
  message.destroy();
  message.error(errorMessage);
  if (configs.APP_ENV !== "production") {
    console.log({ errorMessage });
  }
};
