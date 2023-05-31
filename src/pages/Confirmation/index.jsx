import Lottie from "lottie-react";
import Tick from "../../assets/136825-done-icon-blue.json";
import { useNavigate } from "react-router-dom";

const Confiramtion = () => {
  const navigate = useNavigate();
  return (
    <div className="  grid  justify-center md:h-1/2">
      <Lottie animationData={Tick} className=" h-3/4  self-center" on />
      <p className="p-2 md:p-1">
        Your account has been activated , you can now login
      </p>
      <button
        onClick={() => navigate("/")}
        className=" m-3 w-3/5 justify-self-center rounded-md bg-indigo-custom p-2 text-sm font-semibold text-white md:h-fit lg:text-base"
      >
        Go to home page
      </button>
    </div>
  );
};

export default Confiramtion;
