import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const UpdatePasswordForm = () => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    newPassword: "",
    oldPassword: "",
  });

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/v1/user/updatePassword", {
        ...values,
      });
      setValues({ oldPassword: "", newPassword: "" });
      setError("");
    } catch (error) {
      setError(error.response.data.msg);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid  w-full gap-8 rounded-sm bg-white p-4  "
    >
      <div className="grid">
        <label className="font-semibold" htmlFor="OldPassword">
          Old password
          <span className="text-red-custom">*</span>
        </label>

        <input
          type="password"
          name="OldPassword"
          placeholder=""
          value={values.oldPassword}
          onChange={(e) => handleChange({ oldPassword: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="NewPassword">
          New password
          <span className="text-red-custom">*</span>
        </label>

        <input
          type="password"
          name="NewPassword"
          placeholder=""
          value={values.newPassword}
          onChange={(e) => handleChange({ newPassword: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
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
