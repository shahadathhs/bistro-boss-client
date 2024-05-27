import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
//import { FaTrashAlt } from "react-icons/fa";

const PaymentHistory = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure()

  const {data: payments = []} = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async() => {
      const res =  await axiosSecure.get(`/payments?email=${user.email}`)
      return res.data
    }
  })

  console.log(payments)

  return (
    <div>
      <Helmet>
        <title>Payment History | Bistro Boss</title>
      </Helmet>
      <div>
        {/* banner */}
        <div className="text-center p-4 space-y-3">
          <p className="text-yellow-400 text-xl">---All Payments---</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <p className="text-2xl">See Yours Payments Details</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <h2 className="text-3xl">Total Payment: {payments.length}</h2>
        </div>
        {/* payment table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>TransactionId</th>
                <th>Name</th>
                <th>Payment amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {
                payments.map(item =>
                  <tr key={item._id} className="hover">
                    <th>
                      {item.transactionId}
                    </th>
                    
                    <td>
                      {item.data}
                    </td>
                    
                    <th>
                      {item.price}
                    </th>

                    <td>
                      {item.status}
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;