import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";

const UploadForm = () => {
  const handleFormSubmit = async (e) => {
    // prevent the page from reloading
    e.preventDefault();

    try {
      // construct form data
      const formData = new FormData(e.currentTarget);
      const files = e.currentTarget.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      // make a POST request with Axios
      const res = await axios.post(
        "http://localhost:3000/api/v1/tutors/uploadDocuments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <input
        type="file"
        name="files"
        className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        multiple
      />
      <button
        type="submit"
        className="m-3 h-fit w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
      >
        upload
      </button>
    </form>
  );
};

export default UploadForm;
