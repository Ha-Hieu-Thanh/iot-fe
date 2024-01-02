import { signin } from "api/authentication";
import { handleErrorMessage } from "i18n";
import Cookies from "js-cookie";
import _ from "lodash";
import { history } from "../../App";

export const login = async (payload: any) => {
  const params = _.pick(payload, ["email", "password"]);
  try {
    const data = await signin(params);
    const { accessToken, refreshToken } = data;
    Cookies.set("token", accessToken, {
      expires: payload.rememberMe ? 999999 : undefined,
    });
    Cookies.set("refreshToken", refreshToken, {
      expires: payload.rememberMe ? 999999 : undefined,
    });
    history.push("/");
  } catch (error) {
    handleErrorMessage(error);
  }
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  history.push("/login");
};
