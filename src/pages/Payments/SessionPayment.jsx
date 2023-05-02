import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "../../services/requests";
import { useState } from "react";

const SessionPayment = () => {
  const { paymentId } = useParams();
  const { isLoading, data, error } = useQuery(["payment", paymentId], () =>
    getData(`/api/v1/payments/${paymentId}`)
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div className="   mx-6 my-10 grid h-fit  w-full md:mx-20 md:my-0">
      <div>
        <h1>Payment</h1>

        <h1>{data?.payment?.amount}</h1>
        <h1>{data?.payment?.subject}</h1>
      </div>
    </div>
  );
};

export default SessionPayment;
