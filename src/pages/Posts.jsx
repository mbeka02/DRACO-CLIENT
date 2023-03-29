import { getData } from "../services/requests";

import { useQueries } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostCard from "../components/ui/PostCard";

const Posts = () => {
  const [postHandler, setPostHandler] = useState(false);
  const navigate = useNavigate();

  const [allPostsQuery, myPostsQuery] = useQueries([
    {
      queryKey: "AllPosts",
      queryFn: () => getData("/api/v1/test/posts"),
    },
    {
      queryKey: "MyPosts",
      queryFn: () => getData("/api/v1/test/posts/myPosts"),
      enabled: postHandler,
    },
  ]);
  if (allPostsQuery.isLoading) return "Loading...";
  if (myPostsQuery.isLoading) return "Loading...";

  if (allPostsQuery.error) return "An error has occurred ";
  if (myPostsQuery.error) return "An error has occurred";

  const displayUsersPosts = myPostsQuery.data?.posts?.map((post) => {
    return (
      /*<Link to={`/main/posts/${post._id}`} key={post._id}>
        <div className="flex flex-col  border-t-[1px] border-solid border-hr-custom bg-light-secondary p-3  lg:rounded-md lg:border-2">
          <div className=" flex w-fit self-end p-1 text-xs font-semibold lg:p-2 lg:text-sm ">
            <p>{post.comment.length} comments</p>
          </div>
          <div className=" grid  gap-1">
            <div className="h-fit w-fit rounded-md bg-blue-custom p-2 text-center font-semibold text-white ">
              {post?.topic}
            </div>
            <h3 className=" text-base font-semibold lg:text-lg ">
              {post.title}
            </h3>
            <span className="text-sm  lg:text-base">
              asked by {post.createdBy}
            </span>
          </div>
        </div>
      </Link>*/
      <PostCard
        _id={post._id}
        key={post._id}
        comment={post.comment}
        topic={post?.topic}
        title={post.title}
        createdBy={post.createdBy}
        createdAt={post.createdAt}
      />
    );
  });
  const displayAllPosts = allPostsQuery.data?.posts?.map((post) => {
    return (
      <PostCard
        _id={post._id}
        key={post._id}
        comment={post.comment}
        topic={post?.topic}
        title={post.title}
        createdBy={post.createdBy}
        createdAt={post.createdAt}
      />
    );
  });

  return (
    <div className=" grid w-full items-start">
      <div className="flex items-center gap-3 justify-self-end p-2 ">
        <button
          onClick={() => setPostHandler(false)}
          className={`${
            !postHandler && "underline"
          }  "  hover:underline" decoration-blue-custom decoration-solid  decoration-2 underline-offset-4`}
        >
          All questions
        </button>
        <button
          onClick={() => setPostHandler(true)}
          className={`${
            postHandler && "underline"
          }  "  hover:underline" decoration-blue-custom decoration-solid  decoration-2 underline-offset-4`}
        >
          My questions
        </button>
      </div>

      <div className=" my-2 flex justify-end py-4 lg:w-2/3 lg:justify-self-center">
        <div
          className="m-3 h-fit cursor-pointer rounded-md bg-blue-custom p-2 text-sm font-semibold text-white lg:text-base"
          onClick={() => navigate("/main/createpost")}
        >
          Ask a question
        </div>
      </div>
      <div className="grid gap-2 lg:w-2/3 lg:justify-self-center">
        {postHandler ? displayUsersPosts : displayAllPosts}
      </div>
    </div>
  );
};

export default Posts;
