import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";

const TutorForm = ({ Headline, Description, Rate, Experience }) => {
  const [values, setValues] = useState({
    //prevents null values for form inputs- otherwise react will give us an error
    Headline: Headline ? Headline : "",
    Description: Description ? Description : "",
    Rate: Rate ? Rate : "",
    Experience: Experience ? Experience : "",
  });

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("http://localhost:3000/api/v1/tutors/updateProfile", {
        ...values,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="grid  w-full gap-8 rounded-sm bg-white p-4  shadow"
      onSubmit={handleSubmit}
    >
      <div className="grid">
        <label className="font-semibold" htmlFor="Headline">
          Headline
        </label>

        <input
          type="text"
          name="Headline"
          placeholder="A brief overview of what you do"
          value={values.Headline}
          onChange={(e) => handleChange({ Headline: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="Description">
          Description
        </label>

        <textarea
          name="Description"
          placeholder="explain your expertise in detail"
          value={values.Description}
          onChange={(e) => handleChange({ Description: e.target.value })}
          className=" h-60 max-h-80 resize-y rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom  "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="rate">
          Rate
        </label>

        <input
          type="number"
          name="Rate"
          placeholder="Amount you charge "
          value={values.Rate}
          onChange={(e) => handleChange({ Rate: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>

      <div className="grid">
        <label className="font-semibold" htmlFor="Experience">
          Tutoring Experience
        </label>

        <input
          type="number"
          name="Experience"
          placeholder="number of years spent tutoring"
          value={values.Experience}
          onChange={(e) => handleChange({ Experience: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      <button
        type="submit"
        className="m-3 h-fit w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
      >
        Save
      </button>
    </form>
  );
};

export default TutorForm;
