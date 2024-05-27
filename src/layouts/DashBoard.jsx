import { ImCart } from "react-icons/im";
import { NavLink, Outlet } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { BsCalendar4Range, BsBookmarkPlus } from "react-icons/bs";
import { GoCodeReview } from "react-icons/go";
import { MdRestaurantMenu, MdWorkHistory } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import useCart from "../hooks/useCart";
import { FaItunes, FaList } from "react-icons/fa";
import { FaBookAtlas, FaUser } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [carts] = useCart()

  const [isAdmin] = useAdmin();
  
  return (
    <div className="flex">
      <div className="w-72 min-h-screen bg-gray-100">
        <ul className="menu space-y-3">
          {/* different for user and admin */}
          {
            isAdmin
            ?
            <>
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/manageBooking"><FaBookAtlas /> Manage Booking</NavLink>
              </li>
              
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"} 
                to="/dashboard/adminHome"><FcHome /> Admin Home</NavLink>
              </li>
              
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/addItems"><FaItunes /> Add Items</NavLink>
              </li>
              
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/manageItems"><FaList /> Manage Items</NavLink>
              </li>

              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/allUsers"><FaUser /> All users</NavLink>
              </li>
            </>
            :
            <>
              {/* <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/payment"><MdOutlinePayments /> Payment</NavLink>
              </li> */}

              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/carts"><ImCart /> My cart ({carts.length})</NavLink>
              </li>

              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/paymentHistory"><MdWorkHistory /> Payment History</NavLink>
              </li>
              
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"} 
                to="/dashboard/userHome"><FcHome /> User Home</NavLink>
              </li>
              
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/reservation"><BsCalendar4Range /> Reservation</NavLink>
              </li>
              
              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/review"><GoCodeReview /> Add review</NavLink>
              </li>

              <li>
                <NavLink 
                className={({ isActive }) => isActive
                ?"btn btn-outline text-yellow-600 btn-sm mr-2"
                :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
                to="/dashboard/booking"><BsBookmarkPlus /> My Booking</NavLink>
              </li>
            </>
          }
          
          <div className="divider">OR</div>

          {/* for all */}
          <li>
            <NavLink to="/" 
            className={({ isActive }) => isActive
            ?"btn btn-outline text-yellow-600 btn-sm mr-2"
            :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
            ><ImCart /> Home</NavLink>
          </li>
          
          <li>
            <NavLink to="/order/salad" 
            className={({ isActive }) => isActive
            ?"btn btn-outline text-yellow-600 btn-sm mr-2"
            :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
            ><IoFastFoodOutline /> Order</NavLink>
          </li>
          
          <li>
            <NavLink to="/menu" 
            className={({ isActive }) => isActive
            ?"btn btn-outline text-yellow-600 btn-sm mr-2"
            :"btn btn-outline text-yellow-600 btn-sm border-0 mr-2"}
            ><MdRestaurantMenu /> Our Menu</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;