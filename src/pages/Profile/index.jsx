import { useQuery } from "react-query";
import { getData, deleteData } from "../../services/requests";

import { AnimatePresence } from "framer-motion";

//components and forms
import UpdatePasswordForm from "./UpdatePasswordForm";
import TutorForm from "./TutorForm";
import UserDetailsForm from "./UserDetailsForm";
import UploadForm from "./UploadForm";
import Modal from "./Modal";

import AvatarSelector from "./AvatarSelector";
import { useState } from "react";

const Profile = () => {
  //fix UI bug for form population
  const [modalOpen, setModalOpen] = useState("closed");
  const { data, isLoading, error } = useQuery("Profile", () =>
    getData("/api/v1/user/profile")
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const avatar = "http://localhost:3000" + data.profile?.avatarUrl;

  const handleClose = () => {
    setModalOpen("closed");
  };

  return (
    <div className=" my-10 grid w-full gap-4 rounded-sm  px-6 md:mx-20 md:px-4">
      <div className=" grid bg-white shadow-sm  md:w-4/5 md:justify-self-center">
        <div className="grid h-fit bg-blue-700">
          <div className="relative top-1/2 z-10   block w-fit place-self-center">
            <img
              alt="avatar"
              src={avatar}
              className=" h-40 w-40 rounded-full border-8 border-solid border-white "
              //onError
            />
            <AvatarSelector />
          </div>
          <div className="relative  grid h-48 w-full  bg-white">
            <div className=" my-5 self-end justify-self-center text-3xl font-semibold ">
              {data.profile.name}
            </div>
          </div>
        </div>
      </div>
      <div className=" grid gap-4 justify-self-center  md:w-4/5">
        <UserDetailsForm
          name={data.profile.name}
          email={data.profile.email}
          phoneNumber={data.profile?.phoneNumber}
          City={data.profile?.City}
        />
        {data.profile.role === "Tutor" && (
          <div className="grid gap-4">
            <TutorForm
              Headline={data.profile?.Headline}
              Description={data.profile?.Description}
              Rate={data.profile?.Rate}
              Experience={data.profile?.Experience}
            />
            <div className="grid gap-4 bg-white p-3 shadow">
              <div className="flex items-center justify-between">
                <div className="grid h-fit ">
                  <h3 className="text-2xl font-semibold">Education</h3>
                  <span className=" text-sm italic  text-hr-custom">
                    Add information regarding your education
                  </span>
                </div>
                <button
                  className=" rounded-full text-4xl font-semibold text-blue-custom"
                  onClick={() => setModalOpen("Education")}
                >
                  +
                </button>
              </div>

              {data.profile?.EducationInfo.map((info) => {
                return (
                  <div key={info._id}>
                    <p className=" flex w-fit items-center gap-2 font-semibold">
                      {info.school}
                      <span className=" text-xs   font-normal">
                        {info.from}-{info.to}
                      </span>
                    </p>
                    <p className=" text-sm opacity-90">{info.degree}</p>
                  </div>
                );
              })}
            </div>
            <div className="grid gap-4 bg-white p-3 shadow">
              <div className="flex items-center justify-between">
                <div className="grid h-fit ">
                  <h3 className="text-2xl font-semibold">Courses</h3>
                  <span className=" text-sm italic  text-hr-custom">
                    Add information regarding the courses you teach
                  </span>
                </div>
                <button
                  className=" rounded-full text-4xl font-semibold text-blue-custom"
                  onClick={() => setModalOpen("Courses")}
                >
                  +
                </button>
              </div>
              <div className="flex h-fit gap-2 px-2">
                {data?.profile.Courses.map((course, index) => {
                  return (
                    <div
                      key={index}
                      className=" flex items-center gap-2 rounded bg-blue-200 px-4 py-2 font-bold text-blue-custom"
                    >
                      {course}
                      <div
                        className="cursor-pointer  font-bold"
                        onClick={() =>
                          deleteData(`/api/v1/tutors/deleteCourses/${course}`)
                        }
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <UploadForm />
          </div>
        )}
        <h3 className=" text-xl font-semibold">Change password</h3>
        <UpdatePasswordForm />
      </div>
      <AnimatePresence initial={false} mode={"wait"}>
        {
          /*Refactor this*/ (modalOpen === "Education") |
            (modalOpen === "Courses") && (
            <Modal handleClose={handleClose} modalOpen={modalOpen} />
          )
        }
      </AnimatePresence>
    </div>
  );
};

export default Profile;
