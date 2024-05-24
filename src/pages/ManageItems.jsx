import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import useMenu from './../hooks/useMenu';
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleManage = item => {
    console.log(item)
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${item.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete ${item.name}!`
    }).then( async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        console.log(res.data)
        if (res.data.deletedCount > 0) {
          refetch()
          Swal.fire({
            title: "Deleted!",
            text: `${item.name} has been deleted.`,
            icon: "success"
          });
        }
      }
    });
  }

  return (
    <div>
      <Helmet>
        <title>Manage Items | Bistro Boss</title>
      </Helmet>
      <div className="p-2 m-2 border-2 min-h-screen">
        {/* banner */}
        <div className="text-center p-4 space-y-3">
          <p className="text-yellow-400 text-xl">---Hurry Up---</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <p className="text-2xl">Manage your items</p>
          <hr className="w-[300px] mx-auto border-t-2" />
        </div>
        {/* items table */}
        <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row */}
              {
                menu.map(item =>
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
                      <button onClick={() => handleManage(item)} className="btn btn-outline text-blue-500">
                        <GrUpdate /> Update
                      </button>
                    </th>

                    <th>
                      <button onClick={() => handleDelete(item)} className="btn btn-outline text-red-500">
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

export default ManageItems;