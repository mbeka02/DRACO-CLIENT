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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //only accept pdf files
    accept: { "application/pdf": [".pdf"] },
    onDrop,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      //console.log(files);

      for (let i = 0; i < files.length; ++i) {
        formData.append("files", files[i]);
      }
      await axios.post(
        "http://localhost:3000/api/v1/tutors/uploadDocuments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid">
      <form
        {...getRootProps()}
        encType="multipart/form-data"
        className=" grid h-fit items-center justify-center border-2 border-solid border-grey-custom py-4 px-2"
      >
        <input
          {...getInputProps()}
          type="file"
          name="files"
          className=" h-full w-full rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
          multiple
        />
        {isDragActive ? (
          <p className="font-semibold">Drop the files here ...</p>
        ) : (
          <p className={files.length > 0 ? "hidden" : " font-semibold"}>
            Drag 'n' drop some pdf files here, or click here to select files
          </p>
        )}

        <div className=" grid h-full w-64 gap-4 ">
          {
            //preview sildes for the files about to be submitted
            files.map((file, index) => {
              return (
                <div
                  className="grid h-20 w-full  place-items-center overflow-hidden rounded-md border-[1px] border-solid border-gray-400"
                  key={index}
                >
                  <p className=" text-sm font-semibold italic">{file.name}</p>
                  <span className="text-xs uppercase text-blue-custom">
                    {file.size / 100} KB
                  </span>
                </div>
              );
            })
          }
        </div>
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
