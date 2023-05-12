import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../services/requests";
import { Fragment } from "react";

const Payments = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery("payments", () =>
    getData("/api/v1/payments")
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div className="   mx-6 my-10 grid h-fit  w-full md:mx-20 md:my-0">
      <h1 className="text-2xl font-semibold">Pending Payments</h1>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Subject
            </th>
            <th scope="col" className="px-6 py-4">
              Tutor
            </th>
            <th scope="col" className="px-6 py-4">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //map through the payments and display them as table rows
            data?.payments?.map((payment, index) => {
              return (
                <Fragment key={payment._id}>
                  <tr
                    onClick={() => navigate(`/main/payments/${payment._id}`)}
                    className=" cursor-pointer   border-b transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-sm"
                  >
                    <td className=" whitespace-nowrap px-6 py-4 font-semibold ">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 ">
                      {payment.subject}
                    </td>
                    {payment.userIds.map((user, index) => {
                      return (
                        <td
                          key={index}
                          className=" whitespace-nowrap px-6 py-4 "
                        >
                          {user.name}
                        </td>
                      );
                    })}
                    <td className="whitespace-nowrap px-6 py-4 ">
                      {payment.amount * payment.duration}
                    </td>
                  </tr>
                </Fragment>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
