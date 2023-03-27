import { socket } from "./socket";
import { useState, useEffect } from "react";
import MyForm from "./MyForm";

const Messages = () => {
  const [isConnected, setisConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);

  const onConnect = () => {
    setisConnected(true);
  };
  const onDisconnect = () => {
    setisConnected(false);
  };

  const onEvent = (val) => {
    setEvents((prev) => [...prev, val]);
  };
  useEffect(() => {
    onConnect();
    onEvent();
    socket.on("connect", onConnect);
    socket.on("form", onEvent);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("form", onEvent);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return (
    <div className="rb my-10 mx-6 grid w-full md:mx-20">
      <div>{isConnected && <p>...connected to socket</p>}</div>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
      <MyForm />
    </div>
  );
};

export default Messages;
