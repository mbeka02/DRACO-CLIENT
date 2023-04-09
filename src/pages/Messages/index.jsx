import { useQuery } from "react-query";
import { getData } from "../../services/requests";
import { Link } from "react-router-dom";

const Messages = () => {
  const { data, isLoading, error } = useQuery("messages", () =>
    getData("/api/v1/rooms")
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div>
      {data?.rooms.map((room) => {
        return (
          <Link key={room._id} to={`/main/messages/${room._id}`}>
            <div className="grid">{room.users}</div>
            <div className="flex">
              {room.messages.map((message, index) => (
                <div className="flex gap-1" key={index}>
                  <span>{message.createdBy}:</span>
                  <span>{message.text}</span>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Messages;
