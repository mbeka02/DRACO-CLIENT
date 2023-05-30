import { useQuery } from "react-query";
import { getData } from "../../services/requests";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../utilities/DateFormatter";

import Loader from "../../components/ui/Loader";

//placeholder for now
//import { Outlet } from "react-router-dom";

const origin = "http://localhost:3000";

const Messages = () => {
  const { data, isLoading, error } = useQuery("messages", () =>
    getData("/api/v1/rooms")
  );

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: ";

  return (
    <div className="mx-6 my-16 grid h-fit  w-full  md:mx-20 md:my-4 md:grid-cols-custom_2 ">
      <div className=" grid ">
        <div className=" my-4 flex"></div>
        <div className="grid gap-4">
          {data?.rooms.map((room) => {
            return (
              <Link
                key={room._id}
                to={`/main/messages/${room._id}`}
                className=" relative flex  h-16 w-full items-center   gap-2 rounded border-[1px] border-solid border-gray-400  bg-white p-2 px-4 shadow-md   hover:border-blue-custom "
              >
                <span className="absolute right-4 top-1/3 text-xxs uppercase">
                  {dateFormatter(room.updatedAt)}
                </span>
                <img
                  src={
                    //don't want to map since there's only one index
                    origin + room?.userIds[0]?.avatarUrl
                  }
                  alt="avatar"
                  className="h-10 w-10 rounded-full border-2 border-solid border-blue-custom"
                />
                <div className="grid">
                  <div className=" font-semibold text-blue-custom">
                    {room?.userIds[0]?.name}
                  </div>
                  <div className="flex">
                    {room.messages.map((message, index) => {
                      return (
                        <div
                          className="flex gap-1 text-sm text-gray-700"
                          key={index}
                        >
                          <span>{message.createdBy}:</span>
                          <span>{message.text?.substring(0, 15)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className=" hidden md:grid"></div>
    </div>
  );
};

export default Messages;
