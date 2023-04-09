import { Outlet } from "react-router-dom";
import Messages from "./Messages";

const MessageLayout = () => {
  return (
    <div className="grid">
      <Messages />
      <Outlet />
    </div>
  );
};

export default MessageLayout;
