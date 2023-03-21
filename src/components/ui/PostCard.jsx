import { Link } from "react-router-dom";

const PostCard = ({ _id, comment, topic, title, createdBy, createdAt }) => {
  //formats createdAt timestamp to something more readable
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
  const date = dateFormatter.format(Date.parse(createdAt));
  return (
    <Link to={`/main/posts/${_id}`}>
      <div className="flex flex-col  border-t-[1px] border-solid border-grey-custom bg-light-secondary p-3  lg:rounded-md lg:border-2">
        <div className=" flex w-fit self-end p-1 text-xs font-semibold lg:p-2 lg:text-sm ">
          <p>{comment.length} comments</p>
        </div>
        <div className=" grid  gap-1">
          <div className="h-fit w-fit rounded-md bg-blue-custom p-2 text-center font-semibold text-white ">
            {topic}
          </div>
          <h3 className=" text-base font-semibold lg:text-lg ">{title}</h3>
          <div className="text-sm  lg:text-base">
            asked by {createdBy}-
            <span className="text-xs text-indigo-custom ">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
