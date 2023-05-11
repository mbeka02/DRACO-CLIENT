const MobileMoneyForm = () => {
  // state object for phone number and ammount
  const [values, setValues] = useState({
    phoneNumber: "",
    amount: "",
  });

  const handleChange = (value) => {
    return setValues((prev) => {
      return { ...prev, ...value };
    });
  };

  //submit function
  const handleSubmit = (e) => {
    // Prevent the default action, which reloads the page.
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="phone number"
          value={values.phoneNumber}
          onChange={(e) => handleChange({ phoneNumber: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="amount"
          value={values.amount}
          onChange={(e) => handleChange({ amount: e.target.value })}
          className="rounded-sm border-2 border-solid border-grey-custom focus:outline-blue-custom "
        />
      </div>
      <div className="flex items-center gap-2 ">
        <button
          type="submit"
          className="text-white-custom rounded-sm bg-blue-custom px-4 py-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MobileMoneyForm;
