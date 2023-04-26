import { useQueries, useQuery } from "react-query";
import { useState } from "react";
import { getData } from "../../services/requests";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import SearchBar from "../../components/ui/SearchBar";
const Sessions = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  /*const { data, isLoading, error } = useQuery("sessions", () =>
    getData("/api/v1/sessions")
  );*/
  const [sessions, user] = useQueries([
    {
      queryKey: "sessions",
      queryFn: () => getData("/api/v1/sessions"),
    },
    {
      queryKey: "userInfo",
      queryFn: () => getData("/api/v1/user/showUser"),
    },
  ]);
  if (sessions.isLoading) return "...loading";
  if (sessions.error) return "...error";
  const origin = "http://localhost:3000";

  return (
    <div className="rb mx-6 my-10 grid h-fit  w-full  md:mx-20 md:my-0">
      <div className="mb-8 flex items-center justify-between">
        <SearchBar placeholder={"search for session"} />
        <div
          className={`${
            user?.data?.user?.role === "Tutor"
              ? " flex h-9 cursor-pointer items-center justify-center  rounded-md  bg-green-custom px-3 py-2   font-semibold text-white"
              : "hidden"
          }`}
          onClick={() => setOpenModal(true)}
        >
          + create a new session
        </div>
      </div>
      <div className=" flex  flex-wrap  gap-3 ">
        {sessions?.data?.sessions.map((session) => {
          return (
            <Link
              to={`/main/sessions/${session._id}`}
              key={session._id}
              className="w-full md:w-fit"
            >
              <div className="grid w-full rounded bg-white p-2 px-2  shadow-lg md:w-72">
                <div className="text-xl font-semibold">{session.subject}</div>
                {session.userIds.map((user, index) => {
                  return (
                    <div className=" flex items-center gap-2" key={index}>
                      <img
                        src={origin + user.avatarUrl}
                        alt="avatar"
                        className="h-10 w-10 rounded-full border-2 border-solid border-blue-custom"
                      />
                      <span className=" text-sm font-semibold opacity-75">
                        {user.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {openModal && <Modal handleClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Sessions;
