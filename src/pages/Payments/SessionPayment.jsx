import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../services/requests";
import Loader from "../../components/ui/Loader";

//form for mobile payments
import MobileMoneyForm from "./MobileMoneyForm";

//for debit card payments
import PaystackForm from "./PaystackForm";
import { useState } from "react";

const SessionPayment = () => {
  //set the payment method
  const [paymentMehtod, setPaymentMethod] = useState("paystack");
  const { paymentId } = useParams();
  const { isLoading, data, error } = useQuery(["payment", paymentId], () =>
    getData(`/api/v1/payments/${paymentId}`)
  );
  if (isLoading) return <Loader />;
  if (error) return "An error has occurred ";

  return (
    <div className="   mx-6 my-10 grid h-fit  w-full md:mx-20 md:my-0">
      <div className="my-6 grid w-full md:grid-cols-custom_3">
        <div>
          <div>
            <div className="mb-4 grid items-center justify-between">
              <h3 className="mb-2 text-2xl font-black">Payment method</h3>
              <div className="my-3 flex items-center">
                <button
                  className={`${
                    paymentMehtod === "paystack"
                      ? "bg-blue-custom text-white"
                      : "bg-gray-200 text-gray-400"
                  }  mr-2 rounded-md px-4 py-2`}
                  onClick={() => setPaymentMethod("paystack")}
                >
                  Debit card
                </button>
                <button
                  className={`${
                    paymentMehtod === "mobile"
                      ? "bg-blue-custom text-white"
                      : "bg-gray-200 text-gray-400"
                  }  rounded-md px-4 py-2`}
                  onClick={() => setPaymentMethod("mobile")}
                >
                  Mobile money
                </button>
              </div>
            </div>

            {paymentMehtod === "paystack" ? (
              <PaystackForm />
            ) : (
              <MobileMoneyForm />
            )}
          </div>
        </div>
        <div>
          <div className=" my-4 grid  h-56 rounded-md border-[1px] border-solid border-gray-400 px-8 py-6 shadow-sm">
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
