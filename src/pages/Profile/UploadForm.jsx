import axios from "axios";
axios.defaults.withCredentials = true;
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    //formData.append("files", acceptedFiles[i]);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(files);
      for (let i = 0; i < files.length; ++i) {
        formData.append("files", files[i]);
      }
      const res = await axios.post(
        "http://localhost:3000/api/v1/tutors/uploadDocuments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid">
      <form
        {...getRootProps()}
        encType="multipart/form-data"
        className=" grid h-56 items-center justify-center border-2 border-solid border-grey-custom"
      >
        <input
          {...getInputProps()}
          type="file"
          name="files"
          className=" h-full w-full rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
          multiple
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className="m-3 h-fit w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
      >
        Upload
      </button>
    </div>
  );
};

const UploadForm = () => {
  /*const handleFormSubmit = async (e) => {
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
  };*/

  return (
    <div>
      <MyDropzone />
    </div>
  );
};

export default UploadForm;
