import { useQuery } from "react-query";
import { fetchProfile } from "../../services/requests";
import defaultIcon from "../../assets/default.png";

import { AnimatePresence } from "framer-motion";

//components and forms
import UpdatePasswordForm from "./UpdatePasswordForm";
import TutorForm from "./TutorForm";
import UserDetailsForm from "./UserDetailsForm";
import UploadForm from "./UploadForm";
import Modal from "./Modal";

//import axios from "axios";
//axios.defaults.withCredentials = true;

//import { useMutation, useQueryClient } from "react-query";
import AvatarSelector from "./AvatarSelector";
import { useState } from "react";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, error } = useQuery("Profile", fetchProfile);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const avatar = "http://localhost:3000" + data.profile?.avatarUrl;
  const profileImage = data.profile?.avatarUrl ? avatar : defaultIcon;

  const handleClose = () => {
    setModalOpen(false);
  };
  //const queryClient = useQueryClient();

  /*const updateAvatar = useMutation(
    (formData) => {
      return axios.post(
        "http://localhost:3000/api/v1/user/updateProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
    // { onSuccess: () => queryClient.invalidateQueries(["Profile"]) }
  );*/

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const upload = e.currentTarget.files[0];
      formData.append("upload", upload);
      // updateAvatar.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };*/

  return (
    <div className=" rb my-10 grid w-full md:mx-20">
      <div className="relative w-fit">
        <img
          alt="avatar"
          src={profileImage}
          className="h-36 w-36 rounded-full"
          //onError
        />
        <AvatarSelector />
      </div>

      <div>{data.profile.name}</div>
      <div>{data.profile.email}</div>
      <div>{data.profile.role}</div>

      <div className="grid w-3/4 gap-4 justify-self-start">
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
            <div className="grid gap-4 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="grid h-fit ">
                  <h3 className="text-2xl font-semibold">Education</h3>
                  <span className=" text-sm italic  text-hr-custom">
                    Add information regarding your education
                  </span>
                </div>
                <button
                  className=" rounded-full text-4xl font-semibold text-blue-custom"
                  onClick={() => setModalOpen(true)}
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
            <UploadForm />
          </div>
        )}
        <h3 className=" text-xl font-semibold">Change password</h3>
        <UpdatePasswordForm />
      </div>
      <AnimatePresence initial={false} mode={"wait"}>
        {modalOpen && <Modal handleClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
