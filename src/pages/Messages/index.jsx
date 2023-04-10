import { useQuery } from "react-query";
import { getData } from "../../services/requests";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../utilities/DateFormatter";
//placeholder for now
import avatar from "../../assets/default.png";

const Messages = () => {
  const { data, isLoading, error } = useQuery("messages", () =>
    getData("/api/v1/rooms")
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";
  console.log(data.rooms);

  return (
    <div className="my-12 grid h-fit w-full   px-2 md:mx-20 md:grid-cols-custom_2 md:px-4">
      <div className="rb grid gap-4">
        {data?.rooms.map((room) => {
          return (
            <Link
              key={room._id}
              to={`/main/messages/${room._id}`}
              className="rb relative flex h-fit items-center gap-2 py-2 "
            >
              <span className="absolute top-1/4 right-4 text-xxs uppercase">
                {dateFormatter(room.updatedAt)}
              </span>
              <img
                src={avatar}
                alt="avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="grid">
                <div className=" font-semibold text-blue-custom">
                  {room.userNames}
                </div>
                <div className="flex">
                  {room.messages.map((message, index) => {
                    return (
                      <div
                        className="flex gap-1 text-sm text-gray-700"
                        key={index}
                      >
                        <span>{message.createdBy}:</span>
                        <span>{message.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="rb hidden md:grid"></div>
    </div>
  );
};

export default Messages;
