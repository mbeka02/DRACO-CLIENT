import Modal from "../components/Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const Placeholder = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open</button>
      <AnimatePresence initial={false} mode={"wait"}>
        {modalOpen && <Modal handleClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Placeholder;
