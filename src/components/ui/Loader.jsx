import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex h-full w-full   items-center justify-center">
      <Oval
        height={100}
        width={100}
        color="#0077FF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#0077FF"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
