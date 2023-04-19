import { useQuery } from "react-query";
import { useState } from "react";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
const Sessions = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="rb grid h-full w-full justify-end">
      <div className="">
        <div
          className=" flex h-8 w-8  cursor-pointer items-center  justify-center  rounded-full bg-blue-custom text-3xl  font-semibold text-white"
          onClick={() => setOpenModal(true)}
        >
          +
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {openModal && <Modal handleClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Sessions;
