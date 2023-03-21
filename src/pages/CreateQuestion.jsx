import axios from "axios";
axios.defaults.withCredentials = true;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateQuestion = () => {
  const [values, setValues] = useState({
    title: "",
    topic: "",
    description: "",
  });

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/v1/test/posts", {
        ...values,
      });

      setValues({ title: "", topic: "", description: "" });
      navigate("/main/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" m-2 grid  gap-8 rounded bg-white p-4 md:m-auto lg:w-3/4 "
    >
      <div className="grid">
        <label className="font-semibold" htmlFor="Title">
          Title
          <span className="text-red-custom">*</span>
        </label>
        <div className=" text-sm italic  text-hr-custom">
          Be specific and imagine you're asking a question to another person.
        </div>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={values.title}
          onChange={(e) => handleChange({ title: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      <div className="grid">
        <label className="font-semibold" htmlFor="Topic">
          Topic <span className="text-red-custom">*</span>
        </label>
        <input
          type="text"
          name="Topic"
          placeholder="e.g Calculus , Geography etc."
          value={values.topic}
          onChange={(e) => handleChange({ topic: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      <div className="grid">
        <label className="font-semibold" htmlFor="Description">
          Description
          <span className="text-red-custom">*</span>
        </label>
        <div className=" text-sm italic  text-hr-custom">
          In less than 200 words give a brief overview of the question that you
          would like to post. Ensure that your description is concise
        </div>
        <textarea
          type="text"
          name="Description"
          placeholder="description"
          value={values.description}
          onChange={(e) => handleChange({ description: e.target.value })}
          className="max-h-96 resize-y  rounded-sm border-2 border-solid   border-grey-custom  focus:outline-blue-custom md:h-40 lg:max-h-64 "
        />
      </div>
      <div className=" text-sm italic  text-hr-custom">
        <span className="text-red-custom">*</span>
        Review your question before submission.
      </div>

      <button
        type="submit"
        className="m-3 w-1/3 justify-self-center rounded-md bg-blue-custom p-2 text-sm font-semibold text-white  md:mt-4  md:w-1/4 lg:w-1/6 lg:text-base"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateQuestion;
