const Sort = ({ handleSortChange }) => {
  return (
    <select
      className=" h-8 w-36 rounded-md border-2 border-solid border-grey-custom bg-white  focus:outline-blue-custom"
      onChange={handleSortChange}
    >
      <option value={""}>default</option>
      <option value={-1}>Highest price</option>
      <option value={1}>Lowest price</option>
    </select>
  );
};

export default Sort;
