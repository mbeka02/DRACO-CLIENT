import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import axios from "axios";
axios.defaults.withCredentials = true;

const MyForm = ({ roomId, setIsTyping, isTyping }) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    socket.emit("emitMessage", { message, roomId } /*, () => {}*/);
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
    <form onSubmit={onSubmit}>
      <input onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
