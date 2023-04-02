import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex h-full w-full   items-center justify-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#0077FF"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
