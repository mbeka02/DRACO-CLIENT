import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getData } from "../../services/requests";

const Payments = () => {
  const { isLoading, error, data } = useQuery("payments", () =>
    getData("/api/v1/payments")
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";
  return (
    <div className="   mx-6 my-10 grid h-fit  w-full md:mx-20 md:my-0">
      <div>
        <h1 className="text-2xl font-semibold">Pending Payments</h1>

        {data?.payments?.map((payment) => {
          return (
            <div key={payment.id}>
              <Link to={`/main/payments/${payment._id}`}>
                <div className="flex gap-4">subject :{payment.subject}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Payments;
