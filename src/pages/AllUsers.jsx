import { useQuery } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
        const res = await axiosSecure.get('/users')
        return res.data
      }
  })

  const handleDelete = user => {
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
        axiosSecure.delete(`/users/${user._id}`)
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

  const handleRole = user => {
    console.log(user)
  }

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>All Users | Bistro Boss</title>
        </Helmet>
        <div className="p-4 m-4 border-2">
          <div className="flex justify-evenly">
            <h2>All users</h2>
            <h2>Total users: {users.length} </h2>
          </div>
          <div className="overflow-x-auto m-2 border-2 mt-7">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>email</th>
                    <th>Role</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    users.map((user, index)=>
                      <tr key={user._id}>
                        <th>{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button onClick={() => handleRole(user)}
                          className="btn btn-outline text-blue-400"><FaUsers /></button>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(user)}
                          className="btn btn-outline text-red-400">X</button>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AllUsers;