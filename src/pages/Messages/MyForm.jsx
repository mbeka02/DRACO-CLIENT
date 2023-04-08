import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";
axios.defaults.withCredentials = true;

const MyForm = ({ roomId, sender }) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

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
    <form onSubmit={onSubmit} className="flex w-full">
      <textarea
        onChange={handleChange}
        className=" max-h-16  w-10/12 resize-none  rounded-sm  border-2 border-solid border-grey-custom focus:outline-blue-custom  "
        placeholder="enter yor message"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
