import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import arrow from "../../assets/216279_location_arrow_icon.svg";

const CreateComment = ({ postId }) => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const updatePostComments = useMutation(
    (text) => {
      //post request for the new comment
      return axios.post(`http://localhost:3000/api/v1/test/posts/${postId}`, {
        text: text,
      });
    },

    // query invalidation that causes re-fetching
    { onSuccess: () => queryClient.invalidateQueries(["postComments", postId]) }
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      updatePostComments.mutate(text);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" z-5 my-3 grid w-full items-center  self-center  bg-white lg:w-10/12"
    >
      <div className=" m-auto flex w-full items-center justify-center gap-2">
        <textarea
          type="text"
          name="Text"
          placeholder="enter yor comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" max-h-16  w-10/12 resize-none  rounded-sm  border-2 border-solid border-grey-custom focus:outline-blue-custom lg:w-full lg:resize-x"
        />
        <button type="submit">
          <img src={arrow} className="h-10 w-10" />
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
