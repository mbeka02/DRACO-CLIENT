import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchTutor } from "../../services/requests";
import defaultIcon from "../../assets/default.png";

const ViewProfile = () => {
  const { tutorId } = useParams();
  const { data, isLoading, error } = useQuery(["tutorProfile", tutorId], () =>
    fetchTutor(tutorId)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const avatar = "http://localhost:3000" + data.tutor?.avatarUrl;
  const profileImage = data.tutor?.avatarUrl ? avatar : defaultIcon;

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="   my-10 mx-6 grid h-fit w-full  justify-items-center md:mx-20">
      <div className=" grid w-full gap-12 md:w-10/12">
        <div className="flex h-fit w-full flex-col gap-1 rounded-sm bg-white  p-2 py-6 shadow">
          <div className="flex  items-center  gap-5">
            <img
              alt="avatar"
              src={profileImage}
              className="h-20 w-20 rounded-full"
              //onError
            />
            <div>
              <p className="text-2xl font-semibold"> {data.tutor.name}</p>
              <p className="text-base font-semibold ">
                Ksh {data.tutor?.Rate}
                <span className=" font-medium text-gray-500">/hr</span>
              </p>
            </div>
          </div>
          <p className=" text-sm text-gray-500">{data.tutor?.Headline}</p>
        </div>

        <div className="flex w-full flex-col gap-1 rounded-sm bg-white  p-2 py-6 shadow">
          <h3 className="text-2xl font-semibold">Tutor Information</h3>
          <hr className=" my-4" />
          <div className="grid  md:grid-cols-custom">
            <span className="font-semibold">Description:</span>
            <div className=" grid p-2">
              <p className="text-sm text-gray-500">{data.tutor?.Description}</p>
            </div>
          </div>
          <hr className=" my-4" />
          <div className="grid  md:grid-cols-custom">
            <span className="font-semibold">City:</span>
            <div className=" grid p-2">
              <p className="text-sm text-gray-500">{data.tutor?.City}</p>
            </div>
          </div>
          <hr className=" my-4" />
          <div className="grid  md:grid-cols-custom">
            <span className="font-semibold">Experience:</span>
            <div className="grid p-2">
              <p className="text-sm text-gray-500">
                {data.tutor?.Experience} years of work experience
              </p>
            </div>
          </div>
          <hr className=" my-4" />
          <div className="grid  md:grid-cols-custom">
            <span className="font-semibold">Education:</span>
            <div className=" grid p-2">
              <div className="text-sm text-gray-500">
                {data.tutor?.EducationInfo.map((info) => {
                  return (
                    <div key={info._id}>
                      <p className=" flex w-fit items-center gap-2 font-semibold text-black">
                        {info.school}
                        <span className=" text-xs   font-normal">
                          {info.from}-{info.to}
                        </span>
                      </p>
                      <p className=" text-sm opacity-90">{info.degree}.</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-fit w-full flex-col gap-1 rounded-sm bg-white  px-4 py-8 shadow ">
          <h3 className="text-2xl font-semibold">Reviews</h3>
          <hr className=" my-4" />
          {data.tutor.reviews.map((review) => {
            return (
              <div className="grid" key={review._id}>
                <p className="text-base text-gray-500">
                  {review.review}-
                  <span className=" text-xs font-semibold uppercase text-black">
                    {dateFormatter.format(Date.parse(review.createdAt))}
                  </span>
                </p>
                <p className="text-sm font-semibold text-blue-custom">
                  <span className="font-normal  text-gray-500">By:</span>
                  {review.createdBy}
                </p>
                <hr className=" my-4" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
