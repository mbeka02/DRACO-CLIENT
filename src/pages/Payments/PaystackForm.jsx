//form component for paystack payment
//email and amount are required

import React, { useState } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

const PaystackForm = () => {
  const [values, setValues] = useState({
    email: "",
    amount: "",
  });
  const [error, setError] = useState("");
  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/payments/paystack",
        {
          ...values,
        }
      );
      console.log(response.data.data.data.authorization_url);
      //redirect to paystack payment page
      window.location.href = response.data.data.data.authorization_url;

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
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="enter your email"
          value={values.email}
          onChange={(e) => handleChange({ email: e.target.value })}
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
          className="rounded-md bg-blue-custom px-4 py-2 font-semibold text-white"
        >
          Pay
        </button>
      </div>
    </form>
  );
};
export default PaystackForm;
