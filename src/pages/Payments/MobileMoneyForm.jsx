import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const MobileMoneyForm = () => {
  // state object for phone number and ammount
  const [values, setValues] = useState({
    phoneNumber: "",
    amount: "",
  });
  const [error, setError] = useState("");

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  //submit function
  const handleSubmit = async (e) => {
    // Prevent the default action, which reloads the page.
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/payments/stk", {
        ...values,
      });
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="w-1/2 rounded-sm bg-red-custom p-2 font-semibold text-white">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="font-semibold">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="phone number"
          value={values.phoneNumber}
          onChange={(e) => handleChange({ phoneNumber: e.target.value })}
          className="w-1/2 rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="font-semibold">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          placeholder="amount"
          value={values.amount}
          onChange={(e) => handleChange({ amount: e.target.value })}
          className="w-1/2 rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      <div className="flex items-center gap-2 ">
        <button
          type="submit"
          className="rounded-sm bg-blue-custom px-4 py-2 font-semibold text-white"
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default MobileMoneyForm;
