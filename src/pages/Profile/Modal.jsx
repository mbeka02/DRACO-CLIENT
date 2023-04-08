import Backdrop from "../../components/ui/Backdrop";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

import { useMutation, useQueryClient } from "react-query";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 35,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, modalOpen }) => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState({
    school: "",
    degree: "",

    from: 2023,
    to: 2023,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  const mutateInfo = useMutation(
    async (values) => {
      try {
        if (values.from > values.to) {
          setError("invalid date range");
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/v1/tutors/education",
            {
              ...values,
            }
          );
          setMessage(response.data.msg);
          setError("");
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.msg);
        setMessage("");
      }
    },
    { onSuccess: () => queryClient.invalidateQueries("Profile") }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateInfo.mutate(values);
  };

  const offset = 50;
  const startYear = new Date().getFullYear();
  const options = [];
  for (let i = 0; i < offset; ++i) {
    const year = startYear - i;
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="  m-auto grid h-fit w-10/12 rounded  bg-white p-4  md:w-1/2 "
      >
        <div className=" flex items-center justify-between border-b-2 border-solid border-grey-custom p-2 pb-2">
          <h3 className=" text-xl  font-semibold leading-4 opacity-80">
            {modalOpen === "Education" ? "Add Education" : "Add Courses"}
          </h3>
          <button onClick={handleClose} className="h-4 w-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="hover:fill-red-custom"
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </svg>
          </button>
        </div>
        {(() => {
          switch (modalOpen) {
            case "Education":
              return (
                <form
                  onSubmit={handleSubmit}
                  className="grid  w-full gap-8 p-4"
                >
                  <div className="grid">
                    <label className="font-semibold" htmlFor="School">
                      School
                      <span className="text-red-custom">*</span>
                    </label>
                    <input
                      type="text"
                      name="School"
                      placeholder="Name of the school/institute"
                      value={values.school}
                      onChange={(e) => handleChange({ school: e.target.value })}
                      className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
                    />
                  </div>
                  <div className="grid">
                    <label className="font-semibold" htmlFor="Degree">
                      Degree
                    </label>
                    <input
                      type="text"
                      name="Degree"
                      placeholder="Degree attained"
                      value={values.degree}
                      onChange={(e) => handleChange({ degree: e.target.value })}
                      className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
                    />
                  </div>

                  <div className="grid">
                    <label className="font-semibold" htmlFor="From">
                      From
                      <span className="text-red-custom">*</span>
                    </label>
                    <select
                      name="From"
                      value={values.from}
                      onChange={(e) => handleChange({ from: e.target.value })}
                      className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
                    >
                      {options}
                    </select>
                  </div>
                  <div className="grid">
                    <label className="font-semibold" htmlFor="To">
                      To
                      <span className="text-red-custom">*</span>
                    </label>
                    <select
                      //type="number"
                      name="To"
                      value={values.to}
                      onChange={(e) => handleChange({ to: e.target.value })}
                      className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
                    >
                      {options}
                    </select>
                  </div>
                  {message && <p className="text-green-600">{message}</p>}
                  {error && <p className="text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="m-3 h-fit w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
                  >
                    Save
                  </button>
                </form>
              );
            case "Courses":
              return (
                <form>
                  <div></div>
                </form>
              );
            default:
              return null;
          }
        })()}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
