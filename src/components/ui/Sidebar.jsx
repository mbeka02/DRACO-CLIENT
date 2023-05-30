import { getData } from "../../services/requests";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useQuery } from "react-query";

import { useNavigate, NavLink } from "react-router-dom";
import { deleteData } from "../../services/requests";

const Sidebar = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const { data, error } = useQuery("Avatar", () =>
    getData("/api/v1/user/avatar")
  );

  //if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error?.message;

  const logout = () => {
    deleteData("/api/v1/auth/logout");
    navigate("/");
  };

  const avatar = "http://localhost:3000" + data?.avatar?.avatarUrl;

  return (
    <div
      className={` ${
        sidebarToggle
          ? " left-0   transition-all  duration-200  ease-in-out  md:pr-16 "
          : "md:  -left-full  transition-all  duration-200 ease-in-out"
      } fixed  z-20 flex h-screen  w-1/2 flex-col justify-start gap-9 bg-white p-3  shadow-xl md:left-0 md:w-fit`}
    >
      <div className="mt-14 grid justify-items-start gap-10 font-semibold">
       
        <NavLink
          className={`${
            data?.avatar?.role === "Tutor"
              ? "hidden"
              : "flex cursor-pointer items-center gap-3 hover:text-blue-custom"
          }`}
          to="/main/tutors"
          style={({ isActive }) => {
            return {
              color: isActive ? "#0077FF" : "",
            };
          }}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 12C10.4 12 9.45833 11.6083 8.675 10.825C7.89167 10.0417 7.5 9.1 7.5 8C7.5 6.9 7.89167 5.95833 8.675 5.175C9.45833 4.39167 10.4 4 11.5 4C12.6 4 13.5417 4.39167 14.325 5.175C15.1083 5.95833 15.5 6.9 15.5 8C15.5 9.1 15.1083 10.0417 14.325 10.825C13.5417 11.6083 12.6 12 11.5 12ZM11.5 10C12.05 10 12.521 9.804 12.913 9.412C13.3043 9.02067 13.5 8.55 13.5 8C13.5 7.45 13.3043 6.97933 12.913 6.588C12.521 6.196 12.05 6 11.5 6C10.95 6 10.4793 6.196 10.088 6.588C9.696 6.97933 9.5 7.45 9.5 8C9.5 8.55 9.696 9.02067 10.088 9.412C10.4793 9.804 10.95 10 11.5 10ZM22.6 23.5L19.4 20.3C19.05 20.5 18.675 20.6667 18.275 20.8C17.875 20.9333 17.45 21 17 21C15.75 21 14.6873 20.5627 13.812 19.688C12.9373 18.8127 12.5 17.75 12.5 16.5C12.5 15.25 12.9373 14.1873 13.812 13.312C14.6873 12.4373 15.75 12 17 12C18.25 12 19.3127 12.4373 20.188 13.312C21.0627 14.1873 21.5 15.25 21.5 16.5C21.5 16.95 21.4333 17.375 21.3 17.775C21.1667 18.175 21 18.55 20.8 18.9L24 22.1L22.6 23.5ZM17 19C17.7 19 18.2917 18.7583 18.775 18.275C19.2583 17.7917 19.5 17.2 19.5 16.5C19.5 15.8 19.2583 15.2083 18.775 14.725C18.2917 14.2417 17.7 14 17 14C16.3 14 15.7083 14.2417 15.225 14.725C14.7417 15.2083 14.5 15.8 14.5 16.5C14.5 17.2 14.7417 17.7917 15.225 18.275C15.7083 18.7583 16.3 19 17 19ZM3.5 20V17.225C3.5 16.6583 3.64167 16.1333 3.925 15.65C4.20833 15.1667 4.6 14.8 5.1 14.55C5.95 14.1167 6.90833 13.75 7.975 13.45C9.04167 13.15 10.225 13 11.525 13C11.325 13.3 11.1543 13.6207 11.013 13.962C10.871 14.304 10.7583 14.6583 10.675 15.025C9.675 15.1083 8.78333 15.279 8 15.537C7.21667 15.7957 6.55833 16.0667 6.025 16.35C5.85833 16.4333 5.72933 16.554 5.638 16.712C5.546 16.8707 5.5 17.0417 5.5 17.225V18H10.675C10.7583 18.3667 10.871 18.7167 11.013 19.05C11.1543 19.3833 11.325 19.7 11.525 20H3.5Z"
              fill="currentColor"
            />
          </svg>
          <span style={{ display: sidebarToggle ? "" : "none" }}>
            Find a tutor
          </span>
        </NavLink>

        <NavLink
          className="flex cursor-pointer items-center gap-3 hover:text-blue-custom"
          to="/main/messages"
          style={({ isActive }) => {
            return {
              color: isActive ? "#0077FF" : "",
            };
          }}
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.65 1.75H3.85C2.695 1.75 1.7605 2.695 1.7605 3.85L1.75 22.75L5.95 18.55H20.65C21.805 18.55 22.75 17.605 22.75 16.45V3.85C22.75 2.695 21.805 1.75 20.65 1.75ZM7 9.1H17.5C18.0775 9.1 18.55 9.5725 18.55 10.15C18.55 10.7275 18.0775 11.2 17.5 11.2H7C6.4225 11.2 5.95 10.7275 5.95 10.15C5.95 9.5725 6.4225 9.1 7 9.1ZM13.3 14.35H7C6.4225 14.35 5.95 13.8775 5.95 13.3C5.95 12.7225 6.4225 12.25 7 12.25H13.3C13.8775 12.25 14.35 12.7225 14.35 13.3C14.35 13.8775 13.8775 14.35 13.3 14.35ZM17.5 8.05H7C6.4225 8.05 5.95 7.5775 5.95 7C5.95 6.4225 6.4225 5.95 7 5.95H17.5C18.0775 5.95 18.55 6.4225 18.55 7C18.55 7.5775 18.0775 8.05 17.5 8.05Z"
              fill="currentColor"
            />
          </svg>

          <span style={{ display: sidebarToggle ? "" : "none" }}>Messages</span>
        </NavLink>
        <NavLink
          className="flex cursor-pointer items-center gap-3 hover:text-blue-custom"
          to="/main/payments"
          style={({ isActive }) => {
            return {
              color: isActive ? "#0077FF" : "",
            };
          }}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 13.5C16.9333 13.5 17.2917 13.3583 17.575 13.075C17.8583 12.7917 18 12.4333 18 12C18 11.5667 17.8583 11.2083 17.575 10.925C17.2917 10.6417 16.9333 10.5 16.5 10.5C16.0667 10.5 15.7083 10.6417 15.425 10.925C15.1417 11.2083 15 11.5667 15 12C15 12.4333 15.1417 12.7917 15.425 13.075C15.7083 13.3583 16.0667 13.5 16.5 13.5ZM5.5 21C4.95 21 4.479 20.804 4.087 20.412C3.695 20.02 3.49934 19.5493 3.5 19V5C3.5 4.45 3.696 3.979 4.088 3.587C4.48 3.195 4.95067 2.99934 5.5 3H19.5C20.05 3 20.521 3.196 20.913 3.588C21.305 3.98 21.5007 4.45067 21.5 5V7.5H19.5V5H5.5V19H19.5V16.5H21.5V19C21.5 19.55 21.304 20.021 20.912 20.413C20.52 20.805 20.0493 21.0007 19.5 21H5.5ZM13.5 17C12.95 17 12.479 16.804 12.087 16.412C11.695 16.02 11.4993 15.5493 11.5 15V9C11.5 8.45 11.696 7.979 12.088 7.587C12.48 7.195 12.9507 6.99934 13.5 7H20.5C21.05 7 21.521 7.196 21.913 7.588C22.305 7.98 22.5007 8.45067 22.5 9V15C22.5 15.55 22.304 16.021 21.912 16.413C21.52 16.805 21.0493 17.0007 20.5 17H13.5ZM20.5 15V9H13.5V15H20.5Z"
              fill="currentColor"
            />
          </svg>

          <span style={{ display: sidebarToggle ? "" : "none" }}>Payments</span>
        </NavLink>
        <NavLink
          className="flex cursor-pointer items-center gap-3 hover:text-blue-custom"
          to="/main/sessions"
          style={({ isActive }) => {
            return {
              color: isActive ? "#0077FF" : "",
            };
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.84615 5.53845C2.30769 5.53845 0 6.28891 0 6.89445V17.0769C0 17.6686 2.30769 18.4615 7.84615 18.4615C13.3846 18.4615 15.6923 17.7111 15.6923 17.1055V6.92307C15.6923 6.33138 13.3846 5.53845 7.84615 5.53845ZM23.4231 5.56707C23.2679 5.57325 23.1178 5.62352 22.9902 5.71199L16.9902 9.57691C16.7594 9.75045 16.6154 10.0366 16.6154 10.3274V13.6726C16.6154 13.9634 16.7594 14.2486 16.9902 14.4231L22.9902 18.2889C23.1526 18.4117 23.9428 18.7966 23.9428 17.5385V6.46153C23.9428 5.73507 23.6926 5.55599 23.4231 5.56707Z"
              fill="currentColor"
            />
          </svg>

          <span style={{ display: sidebarToggle ? "" : "none" }}>Sessions</span>
        </NavLink>
        <NavLink
          className="flex cursor-pointer items-center gap-3 hover:text-blue-custom"
          to="/main/settings"
          style={({ isActive }) => {
            return {
              color: isActive ? "#0077FF" : "",
            };
          }}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.74995 22L9.34995 18.8C9.13329 18.7167 8.92895 18.6167 8.73695 18.5C8.54495 18.3833 8.35762 18.2583 8.17495 18.125L5.19995 19.375L2.44995 14.625L5.02495 12.675C5.00828 12.5583 4.99995 12.4457 4.99995 12.337V11.663C4.99995 11.5543 5.00828 11.4417 5.02495 11.325L2.44995 9.375L5.19995 4.625L8.17495 5.875C8.35828 5.74167 8.54995 5.61667 8.74995 5.5C8.94995 5.38333 9.14995 5.28333 9.34995 5.2L9.74995 2H15.25L15.65 5.2C15.8666 5.28333 16.071 5.38333 16.263 5.5C16.455 5.61667 16.6423 5.74167 16.825 5.875L19.7999 4.625L22.5499 9.375L19.975 11.325C19.9916 11.4417 20 11.5543 20 11.663V12.337C20 12.4457 19.9833 12.5583 19.95 12.675L22.525 14.625L19.775 19.375L16.825 18.125C16.6416 18.2583 16.45 18.3833 16.25 18.5C16.05 18.6167 15.85 18.7167 15.65 18.8L15.25 22H9.74995ZM12.55 15.5C13.5166 15.5 14.3416 15.1583 15.025 14.475C15.7083 13.7917 16.05 12.9667 16.05 12C16.05 11.0333 15.7083 10.2083 15.025 9.525C14.3416 8.84167 13.5166 8.5 12.55 8.5C11.5666 8.5 10.7373 8.84167 10.062 9.525C9.38662 10.2083 9.04928 11.0333 9.04995 12C9.04995 12.9667 9.38729 13.7917 10.062 14.475C10.7366 15.1583 11.566 15.5 12.55 15.5Z"
              fill="currentColor"
            />
          </svg>
          <span style={{ display: sidebarToggle ? "" : "none" }}>Settings</span>
        </NavLink>
        <div
          onClick={logout}
          className="flex cursor-pointer items-center gap-3  hover:text-blue-custom"
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 21C4.95 21 4.479 20.804 4.087 20.412C3.695 20.02 3.49934 19.5493 3.5 19V5C3.5 4.45 3.696 3.979 4.088 3.587C4.48 3.195 4.95067 2.99934 5.5 3H12.5V5H5.5V19H12.5V21H5.5ZM16.5 17L15.125 15.55L17.675 13H9.5V11H17.675L15.125 8.45L16.5 7L21.5 12L16.5 17Z"
              fill="currentColor"
            />
          </svg>
          <span style={{ display: sidebarToggle ? "" : "none" }}> Logout</span>
        </div>
      </div>
      <NavLink
        className=" flex items-center gap-3 font-semibold"
        to="/main/profile"
      >
        <img
          alt="avatar"
          src={avatar}
          className="h-8 w-8 cursor-pointer rounded-full"
          //onError
        />
        <span style={{ display: sidebarToggle ? "" : "none" }}>
          {data?.avatar?.name}
        </span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
