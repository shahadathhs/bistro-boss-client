import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loader from "../assets/lottie/loader.json";
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if(loading){
    return (
    <div className='w-full h-[300px] flex justify-center items-center text-3xl'>
      <Lottie className='h-[200px]' animationData={loader} loop={true} />
    </div>)
  }

  if (user) {
    return children;
  } 
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node,
}