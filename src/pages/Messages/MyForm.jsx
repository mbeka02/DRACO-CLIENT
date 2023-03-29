import React, { useState } from "react";
import { socket } from "./socket";
import axios from "axios";
axios.defaults.withCredentials = true;

const MyForm = ({ roomId }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(50).emit("emitMessage", value, () => {
      setIsLoading(false);
    });
    try {
      await axios.post(
        `http://localhost:3000/api/v1/messages/create/${roomId}`,
        {
          text: value,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

export default MyForm;
