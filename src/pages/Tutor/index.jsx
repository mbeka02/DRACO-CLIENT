import { useQuery } from "react-query";
import { getData } from "../../services/requests";
import defaultIcon from "../../assets/default.png";
import { Link } from "react-router-dom";

import { useState } from "react";

const Tutor = () => {
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const { data, isLoading, error } = useQuery(["Tutors", value], () =>
    getData(`/api/v1/tutors?search=${value}`)
  );

  //if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const origin = "http://localhost:3000";

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(encodeURIComponent(text));
  };
  return (
    <div className="   my-10 mx-6 grid  h-fit w-full md:mx-20">
      <form onSubmit={handleSubmit} className=" relative my-4 flex h-8 w-56">
        <input
          onChange={(e) => setText(e.target.value)}
          className=" h-full w-full  rounded-md border-2 border-solid border-grey-custom px-2 focus:outline-blue-custom "
          placeholder="search by subject"
        />

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-2 top-1/4 h-5 w-5 cursor-pointer"
          onClick={handleSubmit}
        >
          <path
            d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C3 7.68333 3.62933 6.146 4.888 4.888C6.14667 3.63 7.684 3.00067 9.5 3C11.3167 3 12.854 3.62933 14.112 4.888C15.37 6.14667 15.9993 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5623 12.688 12.687C13.5633 11.8117 14.0007 10.7493 14 9.5C14 8.25 13.5623 7.18733 12.687 6.312C11.8117 5.43667 10.7493 4.99933 9.5 5C8.25 5 7.18733 5.43767 6.312 6.313C5.43667 7.18833 4.99933 8.25067 5 9.5C5 10.75 5.43767 11.8127 6.313 12.688C7.18833 13.5633 8.25067 14.0007 9.5 14Z"
            fill="black"
          />
        </svg>
      </form>
      <div className=" grid w-full gap-5">
        {data?.tutors?.map((tutor) => {
          return (
            <div
              className=" flex h-fit w-full flex-col gap-6 rounded-lg border-[1px] border-solid  border-gray-300 bg-white p-3 py-6 md:flex-row md:py-4"
              key={tutor._id}
            >
              <div className="flex h-fit items-start justify-between gap-3 md:flex-col ">
                <img
                  alt="avatar"
                  src={
                    tutor?.avatarUrl ? origin + tutor.avatarUrl : defaultIcon
                  }
                  className="h-20 w-20 rounded-full"
                  //onError
                />
                <div className="grid h-min  md:w-max">
                  <p className="text-sm font-semibold md:hidden">
                    Ksh {tutor.Rate}
                    <span className=" font-medium text-gray-500">/hr</span>
                  </p>
                  <span className=" text-sm text-gray-500">
                    {tutor.Experience} yrs of tutoring
                  </span>
                  <div className="flex gap-1  text-sm">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M19.2516 5.61092V14.1469L20.5359 15.3609L15.5719 22.6078L12.1078 20.6484L11.8547 18.7875L3.49969 13.8937L5.21719 12.5344L2.92828 11.8594L5.2875 8.18435L5.25 5.28748L3.03516 2.42998L4.82344 1.53701L9.46406 1.39404C9.46406 1.39404 14.3953 3.92811 14.5359 3.89482C14.6813 3.85686 18.825 2.18014 18.825 2.18014L21.0703 3.28686L19.2516 5.61092Z"
                        fill="#777777"
                      />
                    </svg>

                    {tutor.City}
                  </div>
                </div>
              </div>
              <div className=" flex w-full  flex-col md:flex-row">
                <div className="  grid border-gray-300 md:mx-2  md:w-10/12 md:border-r-[1px] md:border-solid md:px-2">
                  <div className="text-xl font-semibold">{tutor.name}</div>
                  <div className="text-gray-500 ">{tutor.institute}</div>
                  <div
                    className="my-1
                  text-sm font-semibold text-blue-custom"
                  >
                    {tutor.Headline}
                  </div>
                  <div className="mt-1 ">{tutor.Description}</div>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-500">Subjects:</span>
                    {tutor.Courses.map((course, index) => (
                      <span
                        className="text-sm text-gray-500 underline"
                        key={index}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="  flex flex-col  justify-between md:w-2/12">
                  <p className=" hidden text-sm font-semibold md:flex ">
                    Ksh {tutor.Rate}
                    <span className=" font-medium text-gray-500">/hr</span>
                  </p>
                  <Link
                    className="m-3 h-fit rounded-md  bg-blue-custom p-2 text-center text-sm font-semibold text-white md:m-0 lg:text-base"
                    to={`/main/tutors/${tutor._id}`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tutor;
