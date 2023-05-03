import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../services/requests";

const SessionPayment = () => {
  const { paymentId } = useParams();
  const { isLoading, data, error } = useQuery(["payment", paymentId], () =>
    getData(`/api/v1/payments/${paymentId}`)
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div className="   mx-6 my-10 grid h-fit  w-full md:mx-20 md:my-0">
      <div className=" rb grid w-full md:grid-cols-custom_3 ">
        <div>
          <div></div>
        </div>
        <div>
          <div className=" grid h-56  rounded-md border-[1px] border-solid border-gray-400 px-8 py-6 shadow-sm">
            <div className=" grid h-fit">
              <h3 className="text-2xl font-black">Billing info</h3>
              <span className="  text-gray-400">Full payment</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{data?.payment?.subject}</span>
              <p className="flex items-center text-sm font-semibold">
                ksh {data?.payment?.amount}
                <span className="font-medium text-gray-400 ">/hr</span>
              </p>
            </div>
            <div className=" flex items-center justify-between border-b-[1px] border-solid border-gray-300 pb-2 font-semibold">
              {data?.payment?.userIds.map((user) => {
                return (
                  <div className=" text-xs  text-blue-custom" key={user._id}>
                    <span>{user.name}</span>
                  </div>
                );
              })}

              <span className="text-sm ">x {data?.payment?.duration} hrs</span>
            </div>
            <div className="my-2 flex items-center justify-between font-semibold">
              <span className="text-xl">Total</span>
              <span>Ksh {data?.payment?.amount * data?.payment?.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPayment;
