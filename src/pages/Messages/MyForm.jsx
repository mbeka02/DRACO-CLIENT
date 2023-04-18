import React, { useState, useEffect } from "react";
import { socket } from "../../utilities/socket";
import axios from "axios";
axios.defaults.withCredentials = true;

const MyForm = ({ roomId, sender }) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    //account for null value
    socket.emit("emitMessage", { message, roomId, sender } /*, () => {}*/);
    try {
      await axios.post(
        `http://localhost:3000/api/v1/messages/create/${roomId}`,
        {
          text: message,
        }
      );
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);

    // setIsTyping(true);
    socket.emit("typing", { roomId });

    const lastTypingTime = new Date().getTime();
    const timer = 2000;
    setTimeout(() => {
      const now = new Date().getTime();
      const timediff = now - lastTypingTime;
      // console.log(timediff);
      if (timediff >= timer) {
        socket.emit("stopped", { roomId });
        // console.log("stopping");
      }
    }, timer);
  };
  return (
    <form
      onSubmit={onSubmit}
      className=" flex h-12 w-full items-center gap-1 px-3 "
    >
      <textarea
        onChange={handleChange}
        className="  max-h-12 w-full resize-none  rounded-sm  border-2 border-solid border-grey-custom focus:outline-blue-custom  "
        placeholder="enter yor message"
        value={message}
      />

      <button
        type="submit"
        className=" flex h-full w-12 justify-center rounded-sm bg-blue-custom"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="h-full w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
};

export default MyForm;
