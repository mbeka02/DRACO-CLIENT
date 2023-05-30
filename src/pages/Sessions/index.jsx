import { useQueries, useQuery } from "react-query";
import { useState } from "react";
import { getData } from "../../services/requests";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../../components/ui/Loader";

import SearchBar from "../../components/ui/SearchBar";

const Sessions = () => {
  const [openModal, setOpenModal] = useState(false);

  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const [sessions, user] = useQueries([
    {
      queryKey: ["sessions", value],
      queryFn: () => getData(`/api/v1/sessions?search=${value}`),
      keepPreviousData: true,
    },
    {
      queryKey: "userInfo",
      queryFn: () => getData("/api/v1/user/showUser"),
    },
  ]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(encodeURIComponent(text));
  };
  if (sessions.isLoading) return <Loader />;
  if (sessions.error) return "...error";
  const origin = "http://localhost:3000";

  return (
    <div className=" mx-6 my-10 grid h-fit  w-full  md:mx-20 md:my-0">
      <div className="my-4 grid items-center justify-between md:flex">
        <div className="grid">
          <SearchBar
            placeholder={"search for session"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {value && (
            <span className=" text-xs text-indigo-custom ">
              showing results for {decodeURIComponent(value)}
            </span>
          )}
        </div>

        <div
          className={`${
            user?.data?.user?.role === "Tutor"
              ? " flex h-9 cursor-pointer items-center justify-center  gap-2  rounded-md bg-green-custom px-3   py-2 font-semibold text-white"
              : "hidden"
          }`}
          onClick={() => setOpenModal(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z"
              fill="#F2F2F2"
            />
            <path
              d="M9 15C6.33 15 1 16.34 1 19V21H17V19C17 16.34 11.67 15 9 15ZM16.76 5.36L15.08 7.05C15.92 8.23 15.92 9.76 15.08 10.94L16.76 12.63C18.78 10.61 18.78 7.56 16.76 5.36ZM20.07 2L18.44 3.63C21.21 6.65 21.21 11.19 18.44 14.37L20.07 16C23.97 12.11 23.98 6.05 20.07 2Z"
              fill="white"
            />
          </svg>
          create a new session
        </div>
      </div>
      <div className="  flex  flex-wrap  gap-5  ">
        {sessions?.data?.sessions.map((session) => {
          return (
            <Link
              to={`/main/sessions/${session._id}`}
              key={session._id}
              className="grid w-full rounded-lg border-[1px] border-solid border-gray-400  bg-white p-2 px-4 shadow-md   hover:border-blue-custom md:h-36 md:w-80"
            >
              <div className="grid h-fit gap-2">
                <div className="text-xl font-semibold ">{session.subject}</div>
                <div className="  grid grid-cols-custom items-start">
                  <div className=" relative h-20 ">
                    {session.userIds.map((user, index) => {
                      return (
                        <img
                          src={origin + user.avatarUrl}
                          alt="avatar"
                          key={index}
                          className="absolute h-10 w-10 rounded-full border-2 border-solid border-blue-custom last:left-5 last:top-5"
                        />
                      );
                    })}
                  </div>
                  <div className=" mx-4 grid h-fit justify-start  font-semibold opacity-90">
                    {session.userIds.map((user, index) => {
                      return (
                        <div className="flex items-center gap-1" key={index}>
                          <span>{user.name}</span>
                          {user.role === "Tutor" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 17C20.5304 17 21.0391 16.7893 21.4142 16.4142C21.7893 16.0391 22 15.5304 22 15V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2H9.46C9.81 2.61 10 3.3 10 4H20V15H11V17M15 7V9H9V22H7V16H5V22H3V14H1.5V9C1.5 8.46957 1.71071 7.96086 2.08579 7.58579C2.46086 7.21071 2.96957 7 3.5 7H15ZM8 4C8 4.53043 7.78929 5.03914 7.41421 5.41421C7.03914 5.78929 6.53043 6 6 6C5.46957 6 4.96086 5.78929 4.58579 5.41421C4.21071 5.03914 4 4.53043 4 4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2C6.53043 2 7.03914 2.21071 7.41421 2.58579C7.78929 2.96086 8 3.46957 8 4Z"
                                fill="black"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8L8.11 7.06L5 5.5L12 2L19 5.5V10.5H18V6L15.89 7.06L16 8ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
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
