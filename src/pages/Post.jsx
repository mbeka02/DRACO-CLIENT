import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getData } from "../services/requests";
import CreateComment from "../components/forms/CreateComment";
import { motion } from "framer-motion";
import { useState } from "react";

const Post = () => {
  const { postId } = useParams();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  //post Id enusres that every queryKey is unique
  const { data, isLoading, error } = useQuery(["postComments", postId], () =>
    getData(`/api/v1/test/posts/${postId}`)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="  relative flex w-full flex-col">
      <div className="p-2">
        <h2 className=" text-2xl">{data.postComments.title}</h2>
        <article className="italic">{data.postComments.description}</article>
      </div>
      <h3 className="my-3 p-2 font-semibold uppercase">Comments</h3>
      <div className=" border-grey-custom  md:grid md:w-10/12 md:self-center md:rounded-md md:border-solid md:bg-light-secondary md:px-2 md:shadow-md lg:px-4">
        {data.postComments?.comment?.map((comment) => {
          return (
            <div
              key={comment._id}
              className=" relative flex flex-col  border-t-[1px] border-solid border-grey-custom  p-2  md:w-11/12 md:justify-self-center md:border-none md:p-4"
            >
              <p className=" text-hr-custom">
                {comment.text}-
                <span className="text-sm font-semibold not-italic text-blue-custom">
                  {comment.createdBy}
                </span>
              </p>
              <hr className="hidden md:my-3 md:inline"></hr>
            </div>
          );
        })}
      </div>
      <motion.div
        className=" absolute bottom-1/3 right-5 z-10 flex  h-10 w-10 cursor-pointer rounded-full bg-blue-custom p-1 transition-all duration-300 ease-linear hover:rounded-md hover:bg-indigo-800 md:bottom-10 "
        onClick={handleToggle}
        drag
        dragConstraints={{ bottom: 0, right: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="m-auto h-3/4 w-3/4 fill-white  "
        >
          <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
        </svg>
      </motion.div>
      {toggle && <CreateComment postId={postId} />}
    </div>
  );
};

export default Post;
