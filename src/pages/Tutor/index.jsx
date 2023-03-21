import { useQuery } from "react-query";
import { fetchTutors } from "../../services/requests";
import defaultIcon from "../../assets/default.png";
import { Link } from "react-router-dom";

const Tutor = () => {
  const { data, isLoading, error } = useQuery("Tutors", fetchTutors);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const origin = "http://localhost:3000";

  return (
    <div className="  my-10 mx-6 grid w-full md:mx-20">
      {data?.tutors?.map((tutor) => {
        return (
          <div
            className="flex h-fit w-full flex-col gap-6 rounded-lg border-[1px] border-solid  border-gray-300 bg-white p-3 py-6 md:flex-row md:py-4"
            key={tutor._id}
          >
            <div className="flex items-start justify-between md:flex-col ">
              <img
                alt="avatar"
                src={tutor?.avatarUrl ? origin + tutor.avatarUrl : defaultIcon}
                className="h-20 w-20 rounded-full"
                //onError
              />
              <div className="grid h-min  md:w-max">
                <p className="text-sm font-semibold md:hidden">
                  Ksh {tutor.Rate}
                  <span className=" font-medium text-gray-500">/hr</span>
                </p>
                <span className=" text-sm text-gray-500">
                  {tutor.Experience} yrs of tutoring
                </span>
                <div className="flex gap-1  text-sm">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M19.2516 5.61092V14.1469L20.5359 15.3609L15.5719 22.6078L12.1078 20.6484L11.8547 18.7875L3.49969 13.8937L5.21719 12.5344L2.92828 11.8594L5.2875 8.18435L5.25 5.28748L3.03516 2.42998L4.82344 1.53701L9.46406 1.39404C9.46406 1.39404 14.3953 3.92811 14.5359 3.89482C14.6813 3.85686 18.825 2.18014 18.825 2.18014L21.0703 3.28686L19.2516 5.61092Z"
                      fill="#777777"
                    />
                  </svg>

                  {tutor.City}
                </div>
              </div>
            </div>
            <div className="flex flex-col  md:flex-row">
              <div className="  grid border-gray-300 md:mx-2  md:w-10/12 md:border-r-[1px] md:border-solid md:px-2">
                <div className="text-xl font-semibold">{tutor.name}</div>
                <div className="text-gray-500 ">{tutor.institute}</div>
                <div
                  className="my-1
                  text-sm font-semibold text-blue-custom"
                >
                  {tutor.Headline}
                </div>
                <div className="mt-1 ">{tutor.Description}</div>
              </div>

              <div className="  flex flex-col  justify-between md:w-2/12">
                <p className=" hidden text-sm font-semibold md:flex ">
                  Ksh {tutor.Rate}
                  <span className=" font-medium text-gray-500">/hr</span>
                </p>
                <Link
                  className="m-3 h-fit rounded-md  bg-blue-custom p-2 text-center text-sm font-semibold text-white md:m-0 lg:text-base"
                  to={`/main/tutors/${tutor._id}`}
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tutor;
