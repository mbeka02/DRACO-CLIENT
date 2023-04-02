const SearchBar = ({ handleChange }) => {
  //console.log(encodeURIComponent("C++"));
  return (
    <form>
      <input onChange={handleChange} />
    </form>
  );
};

export default SearchBar;
