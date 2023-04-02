import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { useState } from "react";

const PageLayout = () => {
  console.log("rendered");
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div className="relative flex h-full">
      <button
        className="absolute left-4 top-4 z-50 h-4 w-4 md:fixed "
        onClick={() => setSidebarToggle((prev) => !prev)}
      >
        {sidebarToggle ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            aria-labelledby="title"
            aria-describedby="desc"
            role="img"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              data-name="layer2"
              fill="none"
              stroke="#202020" //change stroke for the color
              strokeMiterlimit="10"
              strokeWidth="4"
              d="M2 14h60M2 32h36"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              data-name="layer1"
              fill="none"
              stroke="#202020"
              strokeMiterlimit="10"
              strokeWidth="4"
              d="M2 50h60"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        )}
      </button>
      <Sidebar sidebarToggle={sidebarToggle} />
      <Outlet />
    </div>
  );
};

export default PageLayout;
