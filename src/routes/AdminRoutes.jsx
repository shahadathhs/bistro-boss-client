import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({children}) => {
  const [user, loading] = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  
  const location = useLocation();

  if(loading || isAdminLoading){
    return (
    <div className='w-full h-[300px] flex justify-center items-center text-3xl'>
      <span className="loading loading-spinner text-primary"></span>
      <span className="loading loading-spinner text-secondary"></span>
      <span className="loading loading-spinner text-accent"></span>
      <span className="loading loading-spinner text-neutral"></span>
      <span className="loading loading-spinner text-info"></span>
      <span className="loading loading-spinner text-success"></span>
      <span className="loading loading-spinner text-warning"></span>
      <span className="loading loading-spinner text-error"></span>
    </div>)
  }

  if (user && isAdmin) {
    return children;
  } 
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default AdminRoutes;

AdminRoutes.propTypes = {
  children: PropTypes.node,
}