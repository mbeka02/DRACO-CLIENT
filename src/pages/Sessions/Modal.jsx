import Backdrop from "../../components/ui/Backdrop";
import { motion } from "framer-motion";
import { useState } from "react";

import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { getData } from "../../services/requests";
axios.defaults.withCredentials = true;
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

const Modal = ({ handleClose }) => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState({
    duration: "",
    subject: "",
    email: "",
    startedAt: "",
    recurrence: "",
  });
  const [message, setMessage] = useState("");
  const [recurring, setRecurring] = useState(false);

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  const { data, isLoading, error } = useQuery("courses", () =>
    getData("/api/v1/tutors/getCourses")
  );

  const sessionsMutation = useMutation(
    async (values) => {
      try {
        await axios.post("http://localhost:3000/api/v1/sessions", {
          ...values,
        });
      } catch (error) {
        console.log(error);
      }
    },
    { onSuccess: () => queryClient.invalidateQueries("sessions") }
  );

  const handleSubmit = (e) => {
    // Prevent the default action, which reloads the page.
    e.preventDefault();
    sessionsMutation.mutate(values);
  };

  const courseOptions = data?.courses?.Courses.map((course, index) => (
    <option key={index} value={course}>
      {course}
    </option>
  ));

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
            create session
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
        <form onSubmit={handleSubmit} className="grid  w-full gap-8 p-4">
          <div className="grid">
            <label className="font-semibold" htmlFor="Subject">
              Subject
              <span className="text-red-custom">*</span>
            </label>
            <select
              type="text"
              name="Subject"
              placeholder="subject"
              value={values.subject}
              onChange={(e) => handleChange({ subject: e.target.value })}
              className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
            >
              {courseOptions}
            </select>
          </div>
          <div className="grid">
            <label className="font-semibold" htmlFor="Email">
              Email
              <span className="text-red-custom">*</span>
            </label>
            <input
              type="text"
              name="Email"
              placeholder="email of the student"
              value={values.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
            />
          </div>
          <div className="grid">
            <label className="font-semibold" htmlFor="When">
              When
              <span className="text-red-custom">*</span>
            </label>
            <input
              type="datetime-local"
              className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
              name="When"
              placeholder="start date and time of the session"
              value={values.startedAt}
              onChange={(e) => handleChange({ startedAt: e.target.value })}
            />
          </div>
          <div className="grid">
            <label className="font-semibold" htmlFor="Duration">
              Duration
              <span className="text-red-custom">*</span>
            </label>
            <input
              type="text"
              name="Duration"
              placeholder="duration of the session"
              value={values.duration}
              onChange={(e) => handleChange({ duration: e.target.value })}
              className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
            />
          </div>
          <div className="flex items-center gap-2 ">
            <input
              onClick={() => setRecurring((prev) => !prev)}
              type="checkbox"
              className="h-4 w-4"
              name="Recurring"
            />
            <label className="font-semibold" htmlFor="Recurring">
              Recurring session
            </label>
          </div>
          {recurring && (
            <>
              <div className="grid">
                <label className="font-semibold" htmlFor="Recurrence">
                  Recurrence
                </label>
                <select
                  className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
                  value={values.recurrence}
                  onChange={(e) => handleChange({ recurrence: e.target.value })}
                >
                  <option value="">pick an option</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </>
          )}
          <button
            type="submit"
            className="m-3 h-fit w-1/2 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/3 lg:w-1/4 lg:text-base"
          >
            Schedule Session
          </button>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
