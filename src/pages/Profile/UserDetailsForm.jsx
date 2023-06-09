import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";
import ProgressBar from "../../components/ui/ProgressBar";

const UserDetailsForm = ({ name, email, phoneNumber, City }) => {
  const [values, setValues] = useState({
    name: name,
    email: email,
    //yes I know this isn't good code but I'm trying to prevent an error since input value can't be null (they're both optional) so I need to use an empty string
    phoneNumber: phoneNumber ? phoneNumber : "",
    City: City ? City : "",
  });
  const [isLoading, setIsLoading] = useState(false); //add loading bar that displays when form is being submitted
  const [message, setMessage]=useState(false)
  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
    await axios.patch("http://localhost:3000/api/v1/user/updateProfile", {
        ...values,
      });
    } catch (error) {
      console.log(error);
    }
    setMessage(true)
    setIsLoading(false);
    //display message for 1 seconds
    setTimeout(() => {
      setMessage(false)
    }, 1500);

  };
  return (
    <form
      className="grid  w-full gap-8  rounded-sm bg-white p-4 shadow  relative"
      onSubmit={handleSubmit}
    >
      {
        //add loading bar that displays when form is being submitted
        isLoading && <ProgressBar />
      }
      <div className="grid">
        <label className="font-semibold" htmlFor="Name">
          Full name
        </label>

        <input
          type="text"
          name="Name"
          placeholder=""
          value={values.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="Email">
          Email
        </label>

        <input
          type="email"
          name="Email"
          placeholder=""
          value={values.email}
          onChange={(e) => handleChange({ email: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="Phone">
          Phone Number
        </label>

        <input
          type="tel"
          name="Phone"
          placeholder=""
          value={values.phoneNumber}
          onChange={(e) => handleChange({ phoneNumber: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid relative">
        <label className="font-semibold" htmlFor="City">
          City
        </label>

        <input
          type="text"
          name="City"
          placeholder="e.g Nairobi, Eldoret etc."
          value={values.City}
          onChange={(e) => handleChange({ City: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      {message && <p className="text-blue-custom font-semibold text-sm absolute bottom-20 left-4">Profile updated successfully</p>}
      <button
        type="submit"
        className="m-3 h-fit w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
      >
        Save
      </button>
    </form>
  );
};

export default UserDetailsForm;
