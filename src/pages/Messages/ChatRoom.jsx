import { socket } from "../../utilities/socket";
import { useState, useEffect } from "react";
import MyForm from "./MyForm";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
//placeholder

const origin = "http://localhost:3000";
//switch to dynamic imports for fns
import { dateFormatter } from "../../utilities/DateFormatter";
import { getData } from "../../services/requests";
const ChatRoom = () => {
  const [isConnected, setisConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);

  const { roomId } = useParams();
  const { data, isLoading, error } = useQuery(["user"], () =>
    getData("/api/v1/user/showUser")
  );

  //bugged
  // if (userQuery.isLoading) return "...loading";
  //if (isLoading) console.log("...loading");

  if (error) return "An error has occurred ";

  const onConnect = () => {
    setisConnected(true);
  };
  const onDisconnect = () => {
    setisConnected(false);
  };

  const onEvent = (val) => {
    //prevents undefined from being pushed into events on initial page renders
    if (val) {
      setEvents((prev) => [...prev, val]);
    }
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
      setSavedMessages(data.roomMessages)
    );

    // console.log(events);

    //  onConnect();
    // onEvent();
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
    <div className=" relative mx-2 my-2 flex  h-screen w-full flex-col justify-between overflow-hidden  md:mx-0 md:my-0 md:ml-14 ">
      <div className="  grid bg-white p-2 shadow ">
        <div className="  flex  w-3/4 items-center gap-3 justify-self-end font-semibold md:justify-self-start lg:w-1/5">
          {
            //refactor
            savedMessages?.userIds?.map((user, index) => {
              return (
                <div key={index} className="flex items-center gap-2 ">
                  <img
                    src={origin + user.avatarUrl}
                    alt="avatar"
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="grid font-medium">{user.name}</div>
                </div>
              );
            })
          }
          <div className=" grid ">
            {isTyping && (
              <div className="m-0 text-sm font-semibold text-blue-custom">
                ...typing
              </div>
            )}
          </div>
        </div>
      </div>
      <ul className="grid w-full gap-2 overflow-y-auto px-4">
        {savedMessages.messages?.map((message, index) => {
          return (
            <li
              key={index}
              className={`${
                message.sender === data?.user?.userId
                  ? " justify-self-end bg-blue-custom text-white"
                  : "justify-self-start bg-white text-black"
              }  grid h-fit w-fit  min-w-custom max-w-custom rounded-md px-2 py-1 text-sm shadow md:text-base`}
            >
              {message.text}
              <span className="justify-self-end  text-xxs uppercase">
                {dateFormatter(message.createdAt)}
              </span>
            </li>
          );
        })}
        {events.map((event, index) => (
          <li
            className={`${
              event?.sender === data?.user?.userId
                ? " justify-self-end  bg-blue-custom text-white"
                : "justify-self-start  bg-white text-black"
            }  grid h-fit w-fit  min-w-custom max-w-custom  rounded-md  px-2 py-1 text-sm shadow md:text-base`}
            key={index}
          >
            {event?.message}
            <span className=" justify-self-end text-xxs uppercase">
              {event?.dateTimeFormat}
            </span>
          </li>
        ))}
      </ul>
      <div className=" flex h-msgbox items-center bg-white">
        <MyForm roomId={roomId} sender={data?.user?.userId} />
      </div>
    </div>
  );
};

export default ChatRoom;
