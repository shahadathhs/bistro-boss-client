import { Helmet } from "react-helmet-async";
import useCart from './../hooks/useCart';
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from './../hooks/useAxiosSecure';

const Carts = () => {
  const axiosSecure = useAxiosSecure();
  const [carts, refetch] = useCart();
  const totalPrice = carts.reduce((sum, item) => sum + parseFloat(item.prize) ,0);

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
          .then(res => {
            console.log(res.data)
            if(res.data.deletedCount > 0){
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch()
            }
          })
      }
    });
  }
  
  return (
    <div>
      <Helmet>
        Carts | Bistro Boss
      </Helmet>
      <div className="min-h-screen p-4 m-4 border-2">
        <div className="flex gap-3 items-center justify-center">
          <h2>Items: {carts.length}</h2>
          <h2>Total Prize: {totalPrice}</h2>
          <button className="btn btn-outline">Pay</button>
        </div>
        <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {
                carts.map(item =>
                  <tr key={item._id} className="hover">
                    <th>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </th>
                    
                    <td>
                      <div className="font-bold">{item.name}</div>
                    </td>
                    
                    <th>
                      <button className="btn btn-ghost btn-xs">{item.prize} $</button>
                    </th>

                    <th>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-outline text-red-500">
                        <FaTrashAlt /> Delete
                      </button>
                    </th>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;