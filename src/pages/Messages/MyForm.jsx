import React, { useState } from "react";
import { socket } from "./socket";
import axios from "axios";
axios.defaults.withCredentials = true;

const MyForm = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    socket.emit("emitMessage", { message, roomId }, () => {});
    try {
      await axios.post(
        `http://localhost:3000/api/v1/messages/create/${roomId}`,
        {
          text: message,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setMessage(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

export default MyForm;
