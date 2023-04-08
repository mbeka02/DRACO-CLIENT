import { socket } from "./socket";
import { useState, useEffect } from "react";
import MyForm from "./MyForm";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import { getData } from "../../services/requests";
const ChatRoom = () => {
  const [isConnected, setisConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState([]);

  const { roomId } = useParams();
  const [userQuery, roomQuery] = useQueries([
    {
      queryKey: ["user"],
      queryFn: () => getData("/api/v1/user/showUser"),
    },
    {
      queryKey: ["room", roomId],
      queryFn: () => getData(`/api/v1/messages/${roomId}/messages`),
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocuse: false,
    },
  ]);

  //bugged
  // if (userQuery.isLoading) return "...loading";
  //if (roomQuery.isLoading) return "...loading";

  if (userQuery.error) return "An error has occurred ";
  if (roomQuery.error) return "An error has occurred";

  const onConnect = () => {
    setisConnected(true);
  };
  const onDisconnect = () => {
    setisConnected(false);
  };

  const onEvent = (val) => {
    setEvents((prev) => [...prev, val]);
  };
  const onType = () => {
    setIsTyping(true);
  };
  const offType = () => {
    setIsTyping(false);
  };
  useEffect(() => {
    /*reverting back to use effect for the messages , 
    until I come up with a more elegant solution , I only want messages to be fetched once from the DB , 
    tanstack query keeps on refetching my data causing the same message to appear twice
    (from the DB and also from the events array)*/
    getData(`/api/v1/messages/${roomId}/messages`).then((data) =>
      setData(data.messages)
    );
    onConnect();
    onEvent();
    socket.on("connect", onConnect);
    socket.emit("join", roomId);
    socket.on("onMessage", onEvent);
    socket.on("disconnect", onDisconnect);
    socket.on("...typing", onType);
    socket.on("...stopped", offType);

    return () => {
      socket.off("connect", onConnect);
      socket.off("onMessage", onEvent);
      socket.off("disconnect", onDisconnect);
      socket.off("...typing", onType);
      socket.off("...stopped", offType);
    };
  }, []);
  return (
    <div className="rb relative my-10 mx-6 grid w-full md:mx-20">
      <div>{isConnected && <p>...connected to socket</p>}</div>
      {isTyping && <div>...typing</div>}
      <ul className="grid w-full gap-2 px-4">
        {data?.map((message, index) => {
          return (
            <li
              key={index}
              className={`${
                message.sender === userQuery.data?.user?.userId
                  ? " justify-self-end bg-blue-custom text-white"
                  : "justify-self-start bg-white text-black"
              }  rb h-fit w-1/3 rounded-sm px-2`}
            >
              {message.text}
            </li>
          );
        })}
        {events.map((event, index) => (
          <li
            className={`${
              event?.sender === userQuery.data?.user?.userId
                ? " justify-self-end  bg-blue-custom text-white"
                : "justify-self-start  bg-white text-black"
            } rb h-fit w-1/3 rounded-sm px-2`}
            key={index}
          >
            {event?.message}
          </li>
        ))}
      </ul>
      <MyForm roomId={roomId} sender={userQuery.data?.user?.userId} />
    </div>
  );
};

export default ChatRoom;
