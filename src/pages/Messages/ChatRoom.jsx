import { socket } from "./socket";
import { useState, useEffect } from "react";
import MyForm from "./MyForm";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getData } from "../../services/requests";
const ChatRoom = () => {
  const [isConnected, setisConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);

  const { roomId } = useParams();
  const { data, error, isLoading } = useQuery(["room", roomId], () =>
    getData(`/api/v1/messages/${roomId}/messages`)
  );

  const onConnect = () => {
    setisConnected(true);
  };
  const onDisconnect = () => {
    setisConnected(false);
  };

  const onEvent = (val) => {
    setEvents((prev) => [...prev, val]);
    //console.log(val);
  };
  useEffect(() => {
    onConnect();
    onEvent();
    socket.on("connect", onConnect);
    socket.emit("join", roomId);
    socket.on("onMessage", onEvent);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("onMessage", onEvent);
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
      <MyForm roomId={roomId} />
    </div>
  );
};

export default ChatRoom;

/*{data?.messages.map((message) => {
  return <li key={message._id}>{message.text}</li>;
})}*/
