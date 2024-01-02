import configs from "constants/config";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
const token = Cookies.get("token") || "";

const socket = io(`${configs.API_DOMAIN}/socket-data`, {
  transports: ["websocket"],
  extraHeaders: { authorization: token },
  auth: {
    token,
  },
});

export default socket;
