import Modal from "../components/ui/Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Icon from "../assets/sea.png";
import Image from "../assets/img1.jpg";

const Placeholder = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="h-full bg-white">
      <div className="  flex items-center justify-between px-3 py-2">
        <div className=" flex items-baseline gap-2">
          <img src={Icon} alt="" className="h-9 w-9" />
          <div className="text-2xl font-bold">TutorWave</div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="  m-3  h-fit  w-32 rounded-md bg-blue-custom  p-2 text-sm font-semibold text-white md:mt-4  lg:text-base"
        >
          Sign Up
        </button>
      </div>
      <div className=" grid  grid-cols-2">
        <div className=" px-1">
          <div className="grid h-fit gap-2">
            <h1 className="text-4xl font-black">
              Welcome to TutorWave, your gateway
            </h1>
            <div className="static flex text-4xl font-black">
              to personalized online
              <ul className="dynamic-text  ml-2">
                <li>
                  <span>tutoring </span>
                </li>
                <li>
                  <span>learning </span>
                </li>
              </ul>
            </div>
          </div>
          <article>
            Empower your education journey with TutorWave, the tutoring platform
            designed to deliver personalized and engaging learning experiences.
            Whether you're a student seeking academic support or a tutor looking
            to share your knowledge, TutorWave is here to connect you with the
            perfect match.
          </article>
        </div>
        <img src={Image} alt="" className="  w-3/4  justify-self-end" />
      </div>
      <AnimatePresence initial={false} mode={"wait"}>
        {modalOpen && <Modal handleClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Placeholder;
