import { useQuery } from "react-query";
import { useState } from "react";
import { getData } from "../../services/requests";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const Sessions = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const { data, isLoading, error } = useQuery("sessions", () =>
    getData("/api/v1/sessions")
  );
  if (isLoading) return "...loading";
  if (error) return "...error";
  return (
    <div className="rb grid h-full w-full justify-end">
      <div className="">
        <div
          className=" flex h-8 w-8  cursor-pointer items-center  justify-center  rounded-full bg-blue-custom text-3xl  font-semibold text-white"
          onClick={() => setOpenModal(true)}
        >
          +
        </div>
        {data?.sessions.map((session) => {
          return (
            <Link to={`/main/sessions/${session._id}`} key={session._id}>
              <div className="grid">
                <div>{session.duration}</div>
                <div>{session.subject}</div>
                <div>{session.email}</div>
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
