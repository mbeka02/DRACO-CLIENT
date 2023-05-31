import { useState } from "react";
import axios from "axios";
import ProgressBar from "../../components/ui/ProgressBar";
axios.defaults.withCredentials = true;

const UpdatePasswordForm = () => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    newPassword: "",
    oldPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false); //add loading bar that displays when form is being submitted
  const [message, setMessage] = useState(false);

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/v1/user/updatePassword", {
        ...values,
      });
      setValues({ oldPassword: "", newPassword: "" });
      setError("");
      setMessage(true);

      //display message for 1 seconds
      setTimeout(() => {
        setMessage(false);
      }, 1500);
    } catch (error) {
      setError(error.response.data.msg);
    }
    setIsLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative  grid w-full gap-8 rounded-sm bg-white  p-4 shadow "
    >
      {
        //add loading bar that displays when form is being submitted
        isLoading && <ProgressBar />
      }
      <div className="grid">
        <label className="font-semibold" htmlFor="oldpassword-field">
          Old password
          <span className="text-red-custom">*</span>
        </label>

        <input
          type="password"
          name="OldPassword"
          id="newpassword-field"
          placeholder=""
          value={values.oldPassword}
          onChange={(e) => handleChange({ oldPassword: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="newpassword-field">
          New password
          <span className="text-red-custom">*</span>
        </label>

        <input
          type="password"
          id="newpassword-field"
          name="NewPassword"
          placeholder=""
          value={values.newPassword}
          onChange={(e) => handleChange({ newPassword: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      {error && (
        <p className="absolute bottom-20 left-4 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
      {message && (
        <p className="absolute bottom-20 left-4 text-sm font-semibold text-blue-custom">
          password changed successfully!
        </p>
      )}
      <button
        type="submit"
        className="m-3 h-fit w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
      >
        Save
      </button>
    </form>
  );
};

export default UpdatePasswordForm;
